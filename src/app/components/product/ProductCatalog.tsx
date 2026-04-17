import { useMemo, useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { formatPrice, isInStock, type Product } from "../../lib/products";
import { ProductCard } from "./ProductCard";

type ProductCatalogProps = {
  title: string;
  description: string;
  products: Product[];
  loading: boolean;
  error: string | null;
  activeTag: string;
};

const promoBanner = {
  image:
    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?auto=format&fit=crop&w=1100&q=80",
  title: "Khaki Field King",
  subtitle: "Heritage meets adventure in a modern field watch built for life beyond routine.",
};

function extractCaseSize(name: string) {
  const match = name.match(/(\d{2})\s?mm/i);
  return match ? `${match[1]}mm` : "40mm";
}

export function ProductCatalog({
  title,
  description,
  products,
  loading,
  error,
  activeTag,
}: ProductCatalogProps) {
  const [showFilters, setShowFilters] = useState(false);

  const sortedProducts = useMemo(() => [...products].sort((a, b) => a.name.localeCompare(b.name)), [products]);

  const caseSizeCounts = useMemo(() => {
    const buckets = {
      "< 35": 0,
      "36 - 38": 0,
      "39 - 41": 0,
      "42 - 44": 0,
      "> 45": 0,
    };

    products.forEach((item) => {
      const size = Number.parseInt(extractCaseSize(item.name), 10);
      if (Number.isNaN(size)) {
        return;
      }

      if (size < 35) buckets["< 35"] += 1;
      else if (size <= 38) buckets["36 - 38"] += 1;
      else if (size <= 41) buckets["39 - 41"] += 1;
      else if (size <= 44) buckets["42 - 44"] += 1;
      else buckets["> 45"] += 1;
    });

    return buckets;
  }, [products]);

  const movementCounts = useMemo(() => {
    const counts = {
      Automatic: 0,
      Mechanical: 0,
      Quartz: 0,
    };

    products.forEach((item) => {
      const text = `${item.name} ${item.description} ${item.shortDescription} ${item.tags.join(" ")}`.toLowerCase();

      if (text.includes("automatic")) counts.Automatic += 1;
      if (text.includes("mechanical")) counts.Mechanical += 1;
      if (text.includes("quartz")) counts.Quartz += 1;
    });

    return counts;
  }, [products]);

  const priceCounts = useMemo(() => {
    const ranges = [
      { label: "0 - 500", min: 0, max: 500 },
      { label: "500 - 1,000", min: 500, max: 1000 },
      { label: "1,000 - 1,500", min: 1000, max: 1500 },
      { label: "1,500 - 2,000", min: 1500, max: 2000 },
      { label: "2,000 - 3,000", min: 2000, max: 3000 },
      { label: "3,000+", min: 3000, max: Number.POSITIVE_INFINITY },
    ];

    return ranges.map((range) => ({
      ...range,
      count: products.filter((item) => item.price >= range.min && item.price < range.max).length,
    }));
  }, [products]);

  const inStockCount = useMemo(() => products.filter((item) => isInStock(item)).length, [products]);
  const currency = products[0]?.currency ?? "AED";
  const productsToShow = sortedProducts;

  return (
    <div className="min-h-screen pt-28 md:pt-2 bg-[#f4f4f4]">
      <div className="container-shell section-block">
        <header className="bg-[#ededed] py-10 text-center">
          <h1 className="text-[clamp(2rem,3vw,2.9rem)] font-semibold uppercase tracking-[0.015em]">{title}</h1>
          <p className="mx-auto mt-1.5 max-w-3xl text-sm text-muted-foreground">{description}</p>
        </header>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span>Home</span>
          <span>/</span>
          <span className="font-medium text-foreground">{activeTag}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-foreground/30 bg-white px-5 text-sm font-medium hover:border-foreground/45"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm uppercase tracking-[0.12em] text-foreground"
          >
            Position
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <div
          className="mt-4 grid items-start gap-5 transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:[grid-template-columns:var(--filter-col)_minmax(0,1fr)_17rem]"
          style={{ ["--filter-col" as string]: showFilters ? "15.5rem" : "0rem" }}
        >
          <aside className="hidden overflow-hidden lg:block">
            <div
              className={`sticky top-28 w-[15.5rem] bg-transparent p-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                showFilters ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0 pointer-events-none"
              }`}
            >
              <div>
                <button type="button" className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                  <ChevronUp className="h-4 w-4" />
                  Filters
                </button>
              </div>

              <div className="space-y-7 text-sm">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Case Size (mm)</p>
                  <div className="space-y-2.5">
                    {Object.entries(caseSizeCounts).map(([label, count]) => (
                      <label key={label} className="flex items-center gap-2.5 text-[13px]">
                        <input type="checkbox" className="h-3.5 w-3.5" />
                        <span>{label}</span>
                        <span className="text-muted-foreground">({count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Movement</p>
                  <div className="space-y-2.5">
                    {Object.entries(movementCounts).map(([label, count]) => (
                      <label key={label} className="flex items-center gap-2.5 text-[13px]">
                        <input type="checkbox" className="h-3.5 w-3.5" />
                        <span>{label}</span>
                        <span className="text-muted-foreground">({count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Price</p>
                  <div className="space-y-2.5">
                    {priceCounts.map((range) => (
                      <label key={range.label} className="flex items-center gap-2.5 text-[13px]">
                        <input type="checkbox" className="h-3.5 w-3.5" />
                        <span>
                          {currency} {range.label}
                        </span>
                        <span className="text-muted-foreground">({range.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="rounded border border-border bg-[#f7f7f7] px-3 py-2.5 text-[13px] text-muted-foreground">
                  In Stock ({inStockCount})
                </div>
              </div>
            </div>
          </aside>

          <section>

            {error && (
              <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-destructive">
                {error}
              </div>
            )}

            <div className="grid gap-5 lg:grid-cols-3">
              {loading &&
                Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="h-[25rem] rounded-md border border-border bg-white animate-pulse" />
                ))}

              {!loading &&
                productsToShow.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
            </div>

            {!loading && sortedProducts.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-9 text-center text-muted-foreground">
                No products found in this category right now.
              </div>
            )}
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-28 relative overflow-hidden rounded-md border border-border bg-white">
              <img
                src={promoBanner.image}
                alt={promoBanner.title}
                className="h-[35rem] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 px-5 pb-6 pt-16 text-white">
                <p className="text-[2rem] font-semibold uppercase leading-none">{promoBanner.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{promoBanner.subtitle}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
