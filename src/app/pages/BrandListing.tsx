import { motion } from "motion/react";
import { useBrands } from "../hooks/useBrands";

function defaultTagline(name: string) {
  return `${name} watches curated for reliable craftsmanship and everyday luxury wear.`;
}

export function BrandListing() {
  const { brands, loading, error } = useBrands();

  return (
    <div className="min-h-screen bg-white ">
      <div className="container-shell section-block">
        <div className="rounded-2xl border border-border bg-white px-6 py-10 text-center shadow-[0_8px_22px_rgba(0,0,0,0.03)]">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#8b7355]">Curated Labels</p>
          <h1 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight">FWC Partner Brands</h1>
          <p className="mx-auto mt-4 max-w-3xl text-[clamp(0.95rem,2vw,1.08rem)] leading-relaxed text-muted-foreground">
            Discover trusted watchmakers across classic, sport, and modern collections with verified authenticity.
          </p>
        </div>

        {error && <p className="mb-4 rounded border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

        <div className="mt-8 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))]">
          {loading &&
            Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="animate-pulse rounded-2xl border border-border bg-white">
                <div className="h-40 border-b border-border bg-white" />
                <div className="space-y-2 p-5">
                  <div className="h-6 w-1/2 rounded bg-muted" />
                  <div className="h-4 w-4/5 rounded bg-muted" />
                </div>
              </div>
            ))}

          {!loading &&
            brands.map((brand, index) => (
              <motion.article
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-400/50"
              >
                <div className="h-40 border-b border-border bg-white p-6">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-[1.85rem] font-semibold tracking-tight text-neutral-900">{brand.name}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{defaultTagline(brand.name)}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-neutral-500">Explore Brand</p>
                </div>
              </motion.article>
          ))}

          {!loading && !error && brands.length === 0 && (
            <div className="col-span-full rounded-2xl border border-border bg-white px-6 py-10 text-center text-muted-foreground">
              No partner brands found right now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
