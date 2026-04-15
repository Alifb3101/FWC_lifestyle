import { Link, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "classic",
    name: "Classic Essentials",
    description: "Understated designs for daily office and formal wear.",
    image: "https://images.unsplash.com/photo-1509048191080-d2ea3a5d3d2f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "luxury",
    name: "Luxury Signatures",
    description: "Premium finishing and statement timepieces for collectors.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "couple",
    name: "Couple Pairs",
    description: "Perfectly paired watches designed to complement each other.",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sport",
    name: "Sport Performance",
    description: "Shock-resistant and water-ready watches for active routines.",
    image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=1200&q=80",
  },
];

export function CollectionListing() {
  const [params] = useSearchParams();
  const active = params.get("filter")?.toLowerCase();
  const visibleCollections = active
    ? collections.filter((item) => item.id.toLowerCase().includes(active) || item.name.toLowerCase().includes(active))
    : collections;

  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <div className="container-shell section-block">
        <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4">Collections</h1>
        <p className="text-muted-foreground mb-[clamp(2rem,5vw,3.5rem)] text-[clamp(0.95rem,2vw,1.1rem)] max-w-3xl">
          Browse curated watch collections with layouts built to handle changing inventory and long titles.
        </p>

        {visibleCollections.length === 0 ? (
          <div className="text-center py-[clamp(3rem,8vw,6rem)] border border-border rounded-xl bg-card">
            <p className="text-muted-foreground">No collection found for this filter yet.</p>
          </div>
        ) : (
          <div className="grid gap-[clamp(1rem,2.5vw,1.75rem)] [grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))]">
            {visibleCollections.map((collection, index) => (
              <motion.article
                key={collection.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group rounded-xl border border-border bg-card overflow-hidden h-full"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-[clamp(1rem,2.4vw,1.5rem)] flex flex-col gap-3">
                  <h2 className="text-[clamp(1.25rem,2.4vw,1.6rem)] font-bold">{collection.name}</h2>
                  <p className="text-muted-foreground text-sm line-clamp-2">{collection.description}</p>
                  <Link
                    to={`/collections?filter=${collection.id}`}
                    className="inline-flex items-center gap-2 text-primary text-sm font-semibold"
                  >
                    View Collection
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
