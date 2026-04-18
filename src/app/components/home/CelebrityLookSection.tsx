import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { HomepageBrand, HomepageCelebrityLook } from "../../lib/homepage";

type CelebrityProduct = {
  src: string;
  alt: string;
  link: string;
};

type CelebrityItem = {
  id: number;
  heroSrc: string;
  heroAlt: string;
  brandLogoSrc: string;
  brandLogoAlt: string;
  brandFallback: string;
  link: string;
  products: CelebrityProduct[];
};

type CelebrityLookSectionProps = {
  looks?: HomepageCelebrityLook[];
  brands?: HomepageBrand[];
  loading?: boolean;
};

function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ProductThumb({ src, alt, link }: CelebrityProduct) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <a
      href={link}
      className="block flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      style={{ width: 76, height: 76 }}
    >
      <img
        src={imgSrc}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => setImgSrc("https://placehold.co/76x76/f5f5f5/aaaaaa?text=Watch")}
        loading="lazy"
        draggable={false}
      />
    </a>
  );
}

type CelebrityCardProps = {
  card: CelebrityItem;
};

function CelebrityCard({ card }: CelebrityCardProps) {
  const [heroSrc, setHeroSrc] = useState(card.heroSrc);
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="flex flex-shrink-0 flex-col" style={{ width: "clamp(240px, 32vw, 380px)" }}>
      <a href={card.link} className="group relative block overflow-hidden bg-gray-100" style={{ aspectRatio: "3 / 4" }}>
        <img
          src={heroSrc}
          alt={card.heroAlt}
          className="h-full w-full select-none object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={() =>
            setHeroSrc(
              `https://placehold.co/380x507/e8e8e8/999999?text=${encodeURIComponent(card.heroAlt)}`,
            )
          }
          loading="lazy"
          draggable={false}
        />
      </a>

      <div className="pb-2 pt-3">
        <div className="mb-3" style={{ height: 28 }}>
          {!logoError && card.brandLogoSrc ? (
            <img
              src={card.brandLogoSrc}
              alt={card.brandLogoAlt}
              className="h-full w-auto object-contain object-left"
              onError={() => setLogoError(true)}
              loading="lazy"
              draggable={false}
            />
          ) : (
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] text-gray-800"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {card.brandFallback}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {card.products.map((product) => (
            <ProductThumb key={product.alt} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CelebrityLookSection({ looks = [], brands = [], loading = false }: CelebrityLookSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const drag = useRef<{ active: boolean; startX: number; scrollLeft: number; moved: boolean }>({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const suppressClickRef = useRef(false);

  const cards = useMemo<CelebrityItem[]>(() => {
    if (!looks.length) return [];

    const brandBySlug = new Map(brands.map((brand) => [brand.slug, brand]));

    return looks.map((look) => {
      const foundBrand = brandBySlug.get(look.brand.slug);

      return {
        id: look.id,
        heroSrc: look.image,
        heroAlt: humanizeSlug(look.slug),
        brandLogoSrc: foundBrand?.logo ?? "",
        brandLogoAlt: `${look.brand.name} logo`,
        brandFallback: look.brand.name,
        link: `/brands/${look.brand.slug}`,
        products: look.products.slice(0, 3).map((product) => ({
          src:
            product.thumbnail ??
            `https://placehold.co/76x76/f5f5f5/aaaaaa?text=${encodeURIComponent(humanizeSlug(product.slug))}`,
          alt: humanizeSlug(product.slug),
          link: `/product/${product.slug}`,
        })),
      };
    });
  }, [brands, looks]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSectionVisible(true);
      }
    }, { threshold: 0.08 });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const syncArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", syncArrows, { passive: true });
    syncArrows();

    return () => {
      el.removeEventListener("scroll", syncArrows);
    };
  }, [syncArrows, cards.length, loading]);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.72), behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };
    setIsDragging(true);
  };

  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (!drag.current.active) return;

      const el = scrollRef.current;
      if (!el) return;

      const deltaX = e.clientX - drag.current.startX;

      if (Math.abs(deltaX) > 4) {
        drag.current.moved = true;
      }

      e.preventDefault();
      el.scrollLeft = drag.current.scrollLeft - deltaX;
    };

    const onWindowMouseUp = () => {
      if (!drag.current.active) return;

      drag.current.active = false;
      setIsDragging(false);

      if (drag.current.moved) {
        suppressClickRef.current = true;
      }
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };
  }, []);

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    suppressClickRef.current = false;
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@400;500;600;700&display=swap');
        .no-scroll::-webkit-scrollbar { display: none; }
        .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
        ref={sectionRef}
        className="w-full overflow-hidden bg-white"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          paddingTop: "clamp(32px, 5vw, 72px)",
          paddingBottom: "clamp(40px, 5vw, 80px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? "translateY(0)" : "translateY(32px)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            maxWidth: 1600,
            margin: "0 auto",
            paddingLeft: "clamp(16px, 4vw, 64px)",
            paddingRight: "clamp(16px, 4vw, 64px)",
            marginBottom: "clamp(20px, 3vw, 36px)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 3vw, 38px)",
              fontWeight: 600,
              color: "#111",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Shop The Celebrity Look
          </h2>

          <div className="hidden items-center gap-2 md:flex">
            {[
              { dir: -1 as const, label: "Previous", path: "M15 19l-7-7 7-7" },
              { dir: 1 as const, label: "Next", path: "M9 5l7 7-7 7" },
            ].map(({ dir, label, path }) => {
              const enabled = dir === -1 ? canLeft : canRight;

              return (
                <button
                  key={dir}
                  onClick={() => scrollBy(dir)}
                  disabled={!enabled}
                  aria-label={label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `1px solid ${enabled ? "#111" : "#ddd"}`,
                    background: "transparent",
                    color: enabled ? "#111" : "#ccc",
                    cursor: enabled ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    padding: 0,
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative" style={{ maxWidth: 1600, margin: "0 auto" }}>
          <div
            style={{
              pointerEvents: "none",
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 48,
              background: "linear-gradient(to right, white, transparent)",
              zIndex: 10,
              transition: "opacity 0.3s",
              opacity: canLeft ? 1 : 0,
            }}
          />

          <div
            style={{
              pointerEvents: "none",
              position: "absolute",
              right: -20,
              top: 0,
              bottom: 0,
              width: 72,
              background: "linear-gradient(to left, white, transparent)",
              zIndex: 10,
              transition: "opacity 0.3s",
              opacity: canRight ? 1 : 0,
            }}
          />

          <div
            ref={scrollRef}
            className="no-scroll"
            style={{
              display: "flex",
              gap: "clamp(12px, 1.5vw, 20px)",
              overflowX: "auto",
              paddingLeft: "clamp(16px, 4vw, 64px)",
              paddingRight: "clamp(16px, 4vw, 64px)",
              paddingBottom: 8,
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
            }}
            onMouseDown={onMouseDown}
            onClickCapture={onClickCapture}
            onDragStart={onDragStart}
          >
            {loading &&
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="h-[420px] w-[clamp(240px,32vw,380px)] shrink-0 animate-pulse rounded bg-[#f3f3f3]"
                />
              ))}

            {!loading && cards.map((card, idx) => (
              <div
                key={card.id}
                style={{
                  transition: `opacity 0.6s ease ${idx * 100}ms, transform 0.6s ease ${idx * 100}ms`,
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <CelebrityCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
