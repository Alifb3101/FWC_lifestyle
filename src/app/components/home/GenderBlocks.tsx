import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const genderPosters = [
  {
    id: "men",
    title: "For Men",
    subtitle: "Bold dials, steel confidence, everyday precision.",
    cta: "SHOP MEN",
    image: "https://i.postimg.cc/s2WTrmby/Gemini-Generated-Image-lxfurplxfurplxfu.png",
    to: "/men",
  },
  {
    id: "women",
    title: "For Women",
    subtitle: "Refined silhouettes with elegant finishing touches.",
    cta: "SHOP WOMEN",
    image: "https://i.postimg.cc/g0hgWs1c/Gemini-Generated-Image-psm59vpsm59vpsm5.png",
    to: "/women",
  },
];

export function GenderBlocks() {
  return (
    <section className="section-block bg-card border-y border-border">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[clamp(2rem,5vw,3.5rem)]"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-muted-foreground mb-3">Curated Posters</p>
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight">Shop By Collection</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(1rem,2.6vw,2rem)]">
          {genderPosters.map((poster, index) => (
            <motion.div
              key={poster.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
            >
              <Link
                to={poster.to}
                className="group block relative overflow-hidden rounded-2xl border border-border/70"
              >
                <div className="relative aspect-[4/5] min-h-[clamp(22rem,48vw,35rem)]">
                  <ImageWithFallback
                    src={poster.image}
                    alt={poster.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />

                  <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10">
                    <h3 className="text-[clamp(1.8rem,4vw,3.1rem)] font-bold text-foreground mb-3 tracking-tight">
                      {poster.title}
                    </h3>
                    <p className="text-[clamp(0.95rem,2vw,1.1rem)] text-foreground/85 max-w-md mb-6">
                      {poster.subtitle}
                    </p>
                    <div className="inline-flex w-fit items-center gap-2 px-5 py-3 rounded-full border border-foreground/30 bg-background/85 text-xs md:text-sm font-semibold tracking-wide group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300">
                      <span>{poster.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
