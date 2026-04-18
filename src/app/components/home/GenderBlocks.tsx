import { Link } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { HomepageCollectionsPreview } from "../../lib/homepage";

type GenderBlocksProps = {
  collectionsPreview: HomepageCollectionsPreview | null;
  loading?: boolean;
};

type CollectionKey = "men" | "women" | "kids";

const COLLECTION_ORDER: CollectionKey[] = ["men", "women", "kids"];

function titleFromKey(key: CollectionKey): string {
  return `For ${key.charAt(0).toUpperCase()}${key.slice(1)}`;
}

function routeFromKey(key: CollectionKey): string {
  if (key === "men") return "/men";
  if (key === "women") return "/women";
  return "/kids";
}

export function GenderBlocks({ collectionsPreview, loading = false }: GenderBlocksProps) {
  if (loading && !collectionsPreview) {
    return (
      <section className="section-block border-y border-border bg-card">
        <div className="container-shell">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="aspect-[4/5] min-h-[20rem] animate-pulse rounded-2xl bg-muted md:min-h-[23rem] lg:min-h-[26rem]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!collectionsPreview) {
    return null;
  }

  const posters = COLLECTION_ORDER.map((key) => ({
    id: key,
    title: titleFromKey(key),
    image: collectionsPreview[key].posterUrl,
    to: routeFromKey(key),
  }));

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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {posters.map((poster, index) => (
            <motion.div
              key={poster.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="h-full"
            >
              <Link
                to={poster.to}
                className="group block h-full overflow-hidden rounded-2xl border border-border/70 bg-background"
              >
                <div className="relative aspect-[4/5] min-h-[20rem] md:min-h-[23rem] lg:min-h-[26rem]">
                  <ImageWithFallback
                    src={poster.image}
                    alt={poster.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
