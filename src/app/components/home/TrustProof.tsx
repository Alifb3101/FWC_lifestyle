import { motion } from "motion/react";
import { Shield, Package, CreditCard, Award, Star, Quote } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Authenticity Guarantee",
    description: "100% genuine watches sourced from authorized and verified channels",
  },
  {
    icon: Award,
    title: "Warranty Protection",
    description: "Extended warranty coverage on all timepieces",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Encrypted transactions and buyer protection",
  },
  {
    icon: Package,
    title: "Fast Shipping",
    description: "Insured UAE-wide delivery with secure premium packaging",
  },
];

const reviews = [
  {
    id: 1,
    name: "Omar Al Nuaimi",
    rating: 5,
    text: "Excellent guidance from the FWC team. My Seiko Prospex arrived fully documented and beautifully packed.",
    date: "March 2026",
  },
  {
    id: 2,
    name: "Aisha Rahman",
    rating: 5,
    text: "I purchased an Al-Harameen watch for my father. Great communication, fast delivery, and exactly as described.",
    date: "February 2026",
  },
  {
    id: 3,
    name: "Yousef Al Kaabi",
    rating: 5,
    text: "The G-Shock model was authentic and competitively priced in AED. This is now my first stop for watches.",
    date: "January 2026",
  },
];

export function TrustProof() {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Customer Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Watch Buyers Across UAE</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-lg font-bold">4.9</span>
          </div>
          <p className="text-muted-foreground">Based on 1,247 verified customer reviews</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background border border-border rounded-lg p-6"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{review.text}</p>
              <div>
                <p className="font-semibold text-sm">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
