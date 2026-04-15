import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "classic",
    name: "Classic",
    description: "Timeless designs for every occasion",
    color: "from-amber-900/20 to-background",
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Ultimate refinement and craftsmanship",
    color: "from-purple-900/20 to-background",
  },
  {
    id: "couple",
    name: "Couple",
    description: "Matching timepieces for partners",
    color: "from-rose-900/20 to-background",
  },
];

export function FeaturedCollections() {
  return (
    <section className="section-block bg-background">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[clamp(2.5rem,6vw,4rem)]"
        >
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold mb-4">Explore Collections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-[clamp(0.95rem,2vw,1.1rem)]">
            Discover our carefully curated collections designed for every lifestyle and preference.
          </p>
        </motion.div>

        <div className="grid gap-[clamp(1rem,2.5vw,1.75rem)] [grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))]">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/collections?filter=${collection.id}`}
                className="group block relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-all h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-50`} />
                <div className="relative p-[clamp(1.25rem,2.5vw,2rem)] min-h-[clamp(14rem,28vw,18rem)] flex flex-col justify-between gap-6">
                  <div>
                    <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold mb-3 group-hover:text-primary transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-muted-foreground text-[clamp(0.9rem,1.8vw,1.05rem)]">
                      {collection.description}
                    </p>
                  </div>
                  <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-semibold tracking-wide mr-2">EXPLORE</span>
                    <ArrowRight className="w-5 h-5" />
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
