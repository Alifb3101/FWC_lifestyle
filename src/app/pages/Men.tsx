import { Link } from "react-router";

const products = [
  { id: 301, name: "Seiko Sport Diver", price: "AED 1,299", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80" },
  { id: 302, name: "Citizen Aero Chronograph", price: "AED 1,099", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80" },
  { id: 303, name: "Casio Steel Classic", price: "AED 649", image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=900&q=80" },
  { id: 304, name: "G-Shock Utility Black", price: "AED 899", image: "https://images.unsplash.com/photo-1617714656659-47f3338a7b37?auto=format&fit=crop&w=900&q=80" },
];

export function Men() {
  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <div className="container-shell section-block">
        <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4">Men's Watches</h1>
        <p className="text-muted-foreground mb-[clamp(2rem,5vw,3.5rem)] text-[clamp(0.95rem,2vw,1.1rem)] max-w-3xl">
          Bold, practical, and premium designs with flexible catalog layout for dynamic inventory.
        </p>

        <div className="grid gap-[clamp(1rem,2.5vw,1.75rem)] [grid-template-columns:repeat(auto-fit,minmax(14.5rem,1fr))]">
          {products.map((item) => (
            <article key={item.id} className="rounded-xl border border-border bg-card overflow-hidden h-full">
              <div className="aspect-square overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-[clamp(1rem,2.4vw,1.5rem)] flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold line-clamp-2">{item.name}</h2>
                  <p className="text-primary font-bold mt-1">{item.price}</p>
                </div>
                <Link to={`/product/${item.id}`} className="text-sm font-semibold text-primary hover:underline whitespace-nowrap">
                  View
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
