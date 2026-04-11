import { motion } from "motion/react";

const brands = [
  { name: "SEIKO", image: "https://images.unsplash.com/photo-1523170335258-f5c6c6bd8d1f?auto=format&fit=crop&w=800&q=80" },
  { name: "CITIZEN", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80" },
  { name: "G-SHOCK", image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=800&q=80" },
  { name: "CASIO", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80" },
  { name: "FOSSIL", image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=800&q=80" },
  { name: "ALFAJR", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80" },
  { name: "AL-HARAMEEN", image: "https://images.unsplash.com/photo-1518131678677-a8b7f9b6f7f5?auto=format&fit=crop&w=800&q=80" },
];

export function BrandShowcase() {
  return (
    <section className="py-24 border-b border-border">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Brands</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Officially selected labels that define FWC Lifestyle's daily luxury and value-first catalog.
          </p>
        </motion.div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden p-8 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group cursor-pointer min-h-40"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/90 to-card/70" />
                <span className="relative text-lg font-bold tracking-[0.2em] text-foreground group-hover:text-primary transition-colors text-center">
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
