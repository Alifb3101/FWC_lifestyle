import { motion } from "motion/react";

const brands = [
  {
    name: "Seiko",
    tagline: "Japanese precision and durable everyday engineering.",
    image: "https://images.unsplash.com/photo-1523170335258-f5c6c6bd8d1f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Citizen",
    tagline: "Eco-Drive innovation with clean modern design.",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "G-Shock",
    tagline: "Shock-resistant performance for active lifestyles.",
    image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Casio",
    tagline: "Reliable classics and digital icons at strong value.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Fossil",
    tagline: "Contemporary style built for daily wear.",
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Alfajr",
    tagline: "Prayer-time focused watches with practical features.",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Al-Harameen",
    tagline: "Faith-driven digital timepieces with elegant design.",
    image: "https://images.unsplash.com/photo-1518131678677-a8b7f9b6f7f5?auto=format&fit=crop&w=1000&q=80",
  },
];

export function BrandListing() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <h1 className="text-5xl font-bold mb-4">FWC Partner Brands</h1>
        <p className="text-muted-foreground mb-12 max-w-3xl">
          We currently focus on seven trusted labels to keep inventory quality high and pricing transparent in AED.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <motion.article
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="relative overflow-hidden rounded-xl border border-border bg-card min-h-72"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="absolute inset-0 h-full w-full object-cover opacity-30"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/95 to-card/70" />
              <div className="relative p-6 flex h-full flex-col justify-end">
                <h2 className="text-2xl font-bold tracking-wide mb-2">{brand.name}</h2>
                <p className="text-sm text-muted-foreground">{brand.tagline}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
