import { Link } from "react-router";
import { motion } from "motion/react";

const pairs = [
  {
    id: 201,
    title: "Midnight Gold Pair Set",
    description: "Matching black-gold dials with elegant slim profile.",
    price: "AED 1,799",
    image: "https://i.postimg.cc/qBQqwTqZ/Chat-GPT-Image-Apr-13-2026-10-43-12-AM.png",
  },
  {
    id: 202,
    title: "Classic Silver Duo",
    description: "Minimal silver case pair with versatile bracelet finish.",
    price: "AED 1,299",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 203,
    title: "Rose & Steel Couple Edition",
    description: "Rose accents and steel body built for daily luxury.",
    price: "AED 1,499",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80",
  },
];

export function CoupleWatch() {
  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <div className="container-shell section-block">
        <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4">Couple Watches</h1>
        <p className="text-muted-foreground mb-[clamp(2rem,5vw,3.5rem)] text-[clamp(0.95rem,2vw,1.1rem)] max-w-3xl">
          Explore curated paired timepieces designed for gifting, anniversaries, and shared daily style.
        </p>

        <div className="grid gap-[clamp(1rem,2.5vw,1.75rem)] [grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))]">
          {pairs.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-xl border border-border bg-card overflow-hidden h-full"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-[clamp(1rem,2.4vw,1.5rem)] flex flex-col gap-3">
                <h2 className="text-[clamp(1.1rem,2vw,1.35rem)] font-semibold line-clamp-2">{item.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-primary font-bold">{item.price}</span>
                  <Link to={`/product/${item.id}`} className="text-sm font-semibold text-primary hover:underline">
                    View
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
