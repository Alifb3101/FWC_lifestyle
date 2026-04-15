import { motion } from "motion/react";

const brands = ["SEIKO", "G-SHOCK", "CASIO", "CURREN", "NaviForce", "FOSSIL", "ALFAJR", "AL-HARAMEEN"];

// Update these values when you upload each real logo.
const brandLogoByName: Record<string, string> = {
  SEIKO: "https://i.postimg.cc/7PFt7QdW/SEIKO.png",
  "G-SHOCK": "https://i.postimg.cc/m2qLQRBT/pngwing-com.png",
  CASIO: "https://i.postimg.cc/8zXfxxh2/casio.jpg",
  CURREN: "https://i.postimg.cc/pd17hVK6/curren.webp",
  NaviForce: "https://i.postimg.cc/Xvcq4hFs/naviforce.avif",
  FOSSIL: "https://i.postimg.cc/2j4DJvQm/fossile.jpg",
  ALFAJR: "https://i.postimg.cc/qv6QbcKD/al-fajr.png",
  "AL-HARAMEEN": "https://i.postimg.cc/765ghwNM/al-harameen.png",
};

function getBrandLogo(brand: string) {
  if (brandLogoByName[brand]) {
    return brandLogoByName[brand];
  }

  return `https://dummyimage.com/420x140/f7f7f5/111827&text=${encodeURIComponent(brand)}`;
}

export function BrandShowcase() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[#f5f5f3] py-20 md:py-5">
      <div className="container-shell relative px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-5 max-w-3xl text-center"
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.42em] text-[#82775a]">Icons Of Time</span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#111] sm:text-5xl">Our Brand Partners</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Elegant names curated for reliability, style, and premium daily wear.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-md border border-[#dad8d2] bg-[#FFFFFF] shadow-[0_6px_16px_rgba(0,0,0,0.03)] min-h-[112px]"
              >
                <div className="relative h-full w-full min-h-[112px]">
                  <img
                    src={getBrandLogo(brand)}
                    alt={`${brand} logo`}
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandShowcase;
