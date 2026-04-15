import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const slides = [
  {
    id: "lunar-noir",
    image: "https://www.fossil.com/on/demandware.static/-/Library-Sites-FossilSharedLibrary/default/dwe241ef64/2022/FA22/set_0905_global/heritage_lp/0905_LP_hero1_Videostill_Desktop.jpg",
  },
  {
    id: "royal-blue",
    image: "https://i.postimg.cc/153pqDXL/naviposter.png",
  },
  {
    id: "gold-atelier",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/1eb4e2207356687.66dc0e0c2d11d.jpg",
  },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5600);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative h-[76vh] min-h-[500px] w-full overflow-hidden bg-[#060b15] sm:h-[80vh] lg:h-[84vh]">
      <AnimatePresence mode="wait">
        <motion.img
          key={activeSlide.image}
          src={activeSlide.image}
          alt={`Featured watch ${activeIndex + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </section>
  );
}
