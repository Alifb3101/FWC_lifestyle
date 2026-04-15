import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const aedFormatter = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 0,
});

type ProductCard = {
  id: number;
  name: string;
  size: string;
  price: number;
  image: string;
};

const bestSellers: ProductCard[] = [
  {
    id: 1,
    name: "Khaki Field King Day-Date",
    size: "40 mm",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Jazzmaster Quartz",
    size: "40 mm",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Classic Automatic",
    size: "41 mm",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Heritage Steel",
    size: "39 mm",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Prestige Chronograph",
    size: "42 mm",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1617714656659-47f3338a7b37?auto=format&fit=crop&w=1200&q=80",
  },
];

const newArrivals: ProductCard[] = [
  {
    id: 101,
    name: "Royal Diver Automatic",
    size: "42 mm",
    price: 1399,
    image:
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 102,
    name: "Steel Heritage",
    size: "40 mm",
    price: 1249,
    image:
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 103,
    name: "Modern Racer",
    size: "41 mm",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1617714656659-47f3338a7b37?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 104,
    name: "Ocean Master",
    size: "43 mm",
    price: 1749,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
  },
];

export function BestSellers() {
  const [activeTab, setActiveTab] = useState<"best" | "new">("best");
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const railRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const products =
    activeTab === "best" ? bestSellers : newArrivals;

  const updateArrows = () => {
    const rail = railRef.current;
    if (!rail) return;

    const max = rail.scrollWidth - rail.clientWidth;

    setCanLeft(rail.scrollLeft > 5);
    setCanRight(rail.scrollLeft < max - 5);
  };

  const scrollRail = (dir: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;

    const card =
      rail.querySelector<HTMLElement>("[data-card]");
    const amount = card
      ? card.offsetWidth + 24
      : rail.clientWidth * 0.9;

    rail.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const onPointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (e.pointerType !== "mouse" || e.button !== 0)
      return;

    const rail = railRef.current;
    if (!rail) return;

    dragging.current = true;
    moved.current = false;
    startX.current = e.clientX;
    startScroll.current = rail.scrollLeft;

    rail.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragging.current) return;

    const rail = railRef.current;
    if (!rail) return;

    const delta = e.clientX - startX.current;

    if (Math.abs(delta) > 4) moved.current = true;

    rail.scrollLeft = startScroll.current - delta;
    updateArrows();
  };

  const onPointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const rail = railRef.current;

    if (rail?.hasPointerCapture(e.pointerId)) {
      rail.releasePointerCapture(e.pointerId);
    }

    dragging.current = false;
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollTo({ left: 0, behavior: "auto" });
    updateArrows();

    const resize = new ResizeObserver(updateArrows);
    resize.observe(rail);

    return () => resize.disconnect();
  }, [activeTab]);

  return (
    <section className="section-block bg-background py-14 sm:py-16 lg:py-20">
      <style>{`
        .luxury-rail{
          scrollbar-width:none;
          -ms-overflow-style:none;
          scroll-behavior:smooth;
        }
        .luxury-rail::-webkit-scrollbar{
          display:none;
        }
      `}</style>

      <div className="container-shell">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.45em] text-accent">
              Premium Selection
            </p>

            <h2
              className="text-[clamp(30px,4.5vw,58px)] font-semibold leading-[0.95] tracking-[-0.03em] text-foreground"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Best Sellers & New Arrivals
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Crafted for the discerning. Explore refined
              timepieces with timeless elegance and premium
              craftsmanship.
            </p>
          </div>

          {/* Tabs */}
          <div className="inline-flex w-fit items-center gap-8 border-b border-border px-1">
            {(["best", "new"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 pt-1 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors sm:text-[13px] ${
                  activeTab === tab
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "var(--font-family-body)" }}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute -bottom-px left-0 h-[2px] w-full bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                  />
                )}

                <span className="relative z-10">
                  {tab === "best" ? "Best Seller" : "New Arrival"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Arrows */}
          <button
            type="button"
            onClick={() => scrollRail("left")}
            disabled={!canLeft}
            className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e6dece] bg-white text-[#111111] shadow-md transition hover:bg-[#111111] hover:text-white disabled:opacity-30 xl:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollRail("right")}
            disabled={!canRight}
            className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e6dece] bg-white text-[#111111] shadow-md transition hover:bg-[#111111] hover:text-white disabled:opacity-30 xl:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
            >
              <div
                ref={railRef}
                onScroll={updateArrows}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                onPointerCancel={onPointerUp}
                className="luxury-rail flex gap-4 overflow-x-auto pb-2 sm:gap-5 lg:gap-6"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    data-card
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="w-[82vw] shrink-0 sm:w-[46vw] lg:w-[31vw] xl:w-[23.4%]"
                  >
                    {/* Whole Card Clickable */}
                    <Link
                      to={`/product/${product.id}`}
                      draggable={false}
                      onClick={(e) => {
                        if (moved.current) {
                          e.preventDefault();
                        }
                      }}
                      className="group block overflow-hidden rounded-[26px] border border-[#ebe3d6] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]"
                    >
                      {/* Image Box */}
                      <div className="p-4">
                        <div className="relative aspect-square overflow-hidden rounded-[22px] bg-gradient-to-br from-[#faf8f4] via-white to-[#f0eadf]">
                          <button
                            type="button"
                            onClick={(e) =>
                              e.preventDefault()
                            }
                            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-sm transition hover:bg-[#111111] hover:text-white"
                          >
                            <Heart className="h-4 w-4" />
                          </button>

                          <div className="absolute inset-0 p-2 sm:p-2.5 lg:p-3">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              draggable={false}
                              className="h-full w-full object-contain object-center drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)] transition duration-700 group-hover:scale-[1.03]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-5 pb-5 pt-1">
                        <h3 className="line-clamp-1 text-[18px] font-semibold tracking-[-0.02em] text-[#141414]">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-[#7a7368]">
                          Case Size · {product.size}
                        </p>

                        <div className="mt-5 flex items-end justify-between gap-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.28em] text-[#b49a66]">
                              Price
                            </p>

                            <p className="mt-1 text-[26px] font-semibold leading-none text-[#111111]">
                              {aedFormatter.format(
                                product.price
                              )}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={(e) =>
                                e.preventDefault()
                              }
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5dccd] text-[#111111] transition hover:bg-[#111111] hover:text-white"
                            >
                              <ShoppingBag className="h-4 w-4" />
                            </button>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white">
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}