import { useMemo, useRef, useState } from "react";
import { Heart, ZoomIn } from "lucide-react";

type ProductGalleryProps = {
  name: string;
  thumbnail: string;
  images: string[];
  discountPercent: number | null;
};

export function ProductGallery({ name, thumbnail, images, discountPercent }: ProductGalleryProps) {
  const gallery = useMemo(() => {
    const all = [thumbnail, ...images];
    return Array.from(new Set(all.filter(Boolean)));
  }, [thumbnail, images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const activeImage = gallery[activeIndex] ?? thumbnail;

  return (
    <div className="lg:sticky lg:top-28">

      {/* ── Desktop layout ── */}
      <div className="hidden md:grid md:grid-cols-[72px_1fr] md:gap-3">

        {/* Thumbnail rail */}
        <div className="flex max-h-[44rem] flex-col gap-2 overflow-auto">
          {gallery.map((img, index) => (
            <button
              type="button"
              key={`${img}-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`group relative shrink-0 overflow-hidden rounded-xl border bg-neutral-50 p-1.5 transition-all duration-200 ${
                index === activeIndex
                  ? "border-neutral-900 shadow-sm"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <img
                src={img}
                alt={`${name} view ${index + 1}`}
                className="h-14 w-14 object-contain"
              />
              {/* Active indicator strip */}
              <span
                className={`absolute left-0 top-0 h-full w-[2px] rounded-full bg-neutral-900 transition-all duration-200 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Main image stage */}
        <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-[#f7f7f5]">

          {/* Discount badge */}
          {(discountPercent ?? 0) > 0 && (
            <span
              className="absolute left-5 top-5 z-10 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
              style={{ background: "#111" }}
            >
              −{discountPercent}%
            </span>
          )}

          {/* Wishlist button */}
          <button
            type="button"
            onClick={() => setIsWishlisted((v) => !v)}
            className={`absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border transition-all duration-200 ${
              isWishlisted
                ? "border-rose-300 bg-rose-50 text-rose-500"
                : "border-neutral-200 bg-white/90 text-neutral-500 hover:border-neutral-300 hover:text-rose-400"
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`h-4 w-4 transition-all ${isWishlisted ? "fill-rose-400" : ""}`} />
          </button>

          {/* Zoom hint */}
          <button
            type="button"
            onClick={() => setIsZoomed((v) => !v)}
            className="absolute bottom-5 right-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-neutral-200 bg-white/90 text-neutral-500 opacity-0 transition-all duration-200 hover:border-neutral-300 group-hover:opacity-100"
            aria-label="Zoom image"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>

          {/* Image */}
          <div className="overflow-hidden">
            <img
              key={activeImage}
              src={activeImage}
              alt={name}
              className={`h-[42rem] w-full object-fit transition-all duration-500 ease-out ${
                isZoomed ? "scale-125" : "scale-100"
              }`}
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-5 left-5 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-[11px] tracking-[0.1em] text-neutral-500 backdrop-blur-sm">
            {activeIndex + 1} / {gallery.length}
          </div>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-[#f7f7f5]">
          {(discountPercent ?? 0) > 0 && (
            <span className="absolute left-4 top-4 z-10 rounded-sm bg-neutral-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
              −{discountPercent}%
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsWishlisted((v) => !v)}
            className={`absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border transition-all ${
              isWishlisted
                ? "border-rose-300 bg-rose-50 text-rose-500"
                : "border-neutral-200 bg-white/90 text-neutral-400"
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-rose-400" : ""}`} />
          </button>

          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
            onScroll={(e) => {
              const el = e.currentTarget;
              const next = Math.round(el.scrollLeft / el.clientWidth);
              if (next !== activeIndex && next >= 0 && next < gallery.length) {
                setActiveIndex(next);
              }
            }}
          >
            {gallery.map((img, index) => (
              <div key={`${img}-${index}`} className="w-full shrink-0 snap-center">
                <img
                  src={img}
                  alt={`${name} image ${index + 1}`}
                  className="h-[22rem] w-full object-contain p-6"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dot navigation */}
        {gallery.length > 1 && (
          <div className="mt-4 flex justify-center gap-1.5">
            {gallery.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => {
                  const slider = sliderRef.current;
                  if (!slider) return;
                  slider.scrollTo({ left: index * slider.clientWidth, behavior: "smooth" });
                  setActiveIndex(index);
                }}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-7 bg-neutral-900" : "w-2.5 bg-neutral-300"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}