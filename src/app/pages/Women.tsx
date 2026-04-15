import { Link } from "react-router";

const products = [
  { id: 401, name: "Citizen Rose Elegance", price: "AED 1,250", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80" },
  { id: 402, name: "Fossil Petite Gold Mesh", price: "AED 799", image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=900&q=80" },
  { id: 403, name: "Seiko Pearl Silver", price: "AED 1,040", image: "https://images.unsplash.com/photo-1523170335258-f5c6c6bd8d1f?auto=format&fit=crop&w=900&q=80" },
  { id: 404, name: "Casio Classic Mini", price: "AED 520", image: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=900&q=80" },
];

export function Women() {
  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <div className="container-shell section-block">
        <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4">Women's Watches</h1>
        <p className="text-muted-foreground mb-[clamp(2rem,5vw,3.5rem)] text-[clamp(0.95rem,2vw,1.1rem)] max-w-3xl">
          Elegant silhouettes and refined detailing curated for modern everyday luxury.
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
