import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { HomepageHeroBanner } from "../../lib/homepage";

type HeroProps = {
  banners?: HomepageHeroBanner[];
  loading?: boolean;
};

export function Hero({ banners = [], loading = false }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = banners;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

  if (loading && slides.length === 0) {
    return (
      <section className="relative h-[76vh] min-h-[500px] w-full overflow-hidden bg-[#0c1321] sm:h-[80vh] lg:h-[84vh]">
        <div className="h-full w-full animate-pulse bg-gradient-to-br from-[#0e1627] via-[#162338] to-[#0a1324]" />
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative h-[76vh] min-h-[500px] w-full overflow-hidden bg-[#060b15] sm:h-[80vh] lg:h-[84vh]">
      <AnimatePresence mode="wait">
        <motion.a
          key={activeSlide.id}
          href={activeSlide.targetUrl || "/"}
          aria-label={activeSlide.title || `Featured watch ${activeIndex + 1}`}
          className="absolute inset-0 block"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        >
          <img
            src={activeSlide.imageUrl}
            alt={activeSlide.title || `Featured watch ${activeIndex + 1}`}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </motion.a>
      </AnimatePresence>
    </section>
  );
}
