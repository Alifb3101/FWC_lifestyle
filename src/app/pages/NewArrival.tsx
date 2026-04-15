import { Link } from "react-router";
import { motion } from "motion/react";

const arrivals = [
  {
    id: 101,
    name: "Seiko Prospex Night Tide",
    tag: "New",
    price: "AED 1,450",
    image: "https://images.unsplash.com/photo-1509048191080-d2ea3a5d3d2f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 102,
    name: "Citizen Eco-Drive Carbon",
    tag: "Just Dropped",
    price: "AED 1,120",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 103,
    name: "Casio Edifice Chronograph",
    tag: "New",
    price: "AED 920",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 104,
    name: "G-Shock Steel Core",
    tag: "Trending",
    price: "AED 1,680",
    image: "https://images.unsplash.com/photo-1617714656659-47f3338a7b37?auto=format&fit=crop&w=900&q=80",
  },
];

export function NewArrival() {
  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <div className="container-shell section-block">
        <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4">New Arrivals</h1>
        <p className="text-muted-foreground mb-[clamp(2rem,5vw,3.5rem)] text-[clamp(0.95rem,2vw,1.1rem)] max-w-3xl">
          The latest drops from our partner brands with dynamic inventory-ready layout.
        </p>

        <div className="grid gap-[clamp(1rem,2.5vw,1.75rem)] [grid-template-columns:repeat(auto-fit,minmax(14.5rem,1fr))]">
          {arrivals.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-xl border border-border bg-card overflow-hidden h-full"
            >
              <div className="aspect-square overflow-hidden relative">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-primary text-primary-foreground text-xs font-semibold">
                  {item.tag}
                </span>
              </div>
              <div className="p-[clamp(1rem,2.4vw,1.5rem)] flex flex-col gap-3">
                <h2 className="text-[clamp(1.1rem,2vw,1.35rem)] font-semibold line-clamp-2">{item.name}</h2>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-primary">{item.price}</span>
                  <Link to={`/product/${item.id}`} className="text-sm font-semibold text-primary hover:underline">
                    Details
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
