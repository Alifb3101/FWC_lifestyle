import { Heart, ShieldCheck, Truck, RotateCcw } from "lucide-react";

const gallery = [
  "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509048191080-d2ea3a5d3d2f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1200&q=80",
];

const specs = [
  ["Movement", "Automatic / 42-hour power reserve"],
  ["Case Material", "Stainless steel"],
  ["Water Resistance", "10 ATM"],
  ["Warranty", "2 years international"],
];

export function ProductDetail() {
  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <div className="container-shell section-block">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] gap-[clamp(1.5rem,4vw,3.5rem)]">
          <div className="space-y-4">
            <div className="rounded-xl border border-border overflow-hidden bg-card aspect-square">
              <img src={gallery[0]} alt="Product primary image" className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((src, index) => (
                <button
                  type="button"
                  key={src}
                  className="rounded-lg border border-border overflow-hidden aspect-square bg-card"
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={src} alt={`Product thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Seiko</p>
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight">Prospex Solar Diver 200m</h1>
            <p className="text-muted-foreground text-[clamp(0.95rem,2vw,1.1rem)]">
              Professional-grade diver silhouette with brushed steel finishing and balanced wrist profile.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-primary text-[clamp(1.4rem,3vw,2rem)] font-bold">AED 1,399</span>
              <span className="text-muted-foreground line-through">AED 1,599</span>
              <span className="px-2.5 py-1 rounded bg-primary/10 text-primary text-xs font-semibold">SAVE 13%</span>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Dial Color</p>
              <div className="flex gap-2 flex-wrap">
                {['Black', 'Blue', 'Silver'].map((variant) => (
                  <button key={variant} type="button" className="px-3 py-2 rounded border border-border text-sm hover:border-primary">
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="qty" className="text-sm font-semibold">Quantity</label>
              <input id="qty" type="number" min={1} defaultValue={1} className="w-24 rounded border border-border bg-input-background px-3 py-2" />
            </div>

            <div className="flex gap-3 flex-wrap">
              <button className="px-6 py-3 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
                Add to Cart
              </button>
              <button className="px-6 py-3 rounded border border-border font-semibold inline-flex items-center gap-2 hover:border-primary">
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </button>
            </div>

            <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(13rem,1fr))]">
              <div className="rounded-lg border border-border p-3 text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Authenticity guaranteed</div>
              <div className="rounded-lg border border-border p-3 text-sm flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> UAE delivery in 1-3 days</div>
              <div className="rounded-lg border border-border p-3 text-sm flex items-center gap-2"><RotateCcw className="w-4 h-4 text-primary" /> Easy exchange policy</div>
            </div>
          </div>
        </div>

        <section className="mt-[clamp(2rem,6vw,4rem)] rounded-xl border border-border bg-card p-[clamp(1rem,2.4vw,1.75rem)]">
          <h2 className="text-[clamp(1.3rem,2.8vw,1.9rem)] font-bold mb-4">Specifications</h2>
          <dl className="grid gap-3">
            {specs.map(([label, value]) => (
              <div key={label} className="grid grid-cols-1 sm:grid-cols-[12rem,1fr] gap-2 border-b border-border/70 pb-3">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
