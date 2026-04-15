import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function CoupleWatchHighlight() {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm tracking-widest text-primary">COUPLE COLLECTION</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Time Together,
              <br />
              <span className="text-primary">Forever Connected</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Celebrate your bond with our exclusive couple watch collection. Perfectly paired timepieces that
              complement each other, just like you.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <p className="text-muted-foreground">Matching designs with subtle variations</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <p className="text-muted-foreground">Premium materials and Swiss movements</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <p className="text-muted-foreground">Special bundle pricing for pairs</p>
              </div>
            </div>

            <Link
              to="/couple-watch"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded font-semibold tracking-wide hover:bg-primary/90 transition-all"
            >
              VIEW COUPLE COLLECTION
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-square rounded-lg border border-border overflow-hidden relative">
              <ImageWithFallback
                src="https://i.postimg.cc/qBQqwTqZ/Chat-GPT-Image-Apr-13-2026-10-43-12-AM.png"
                alt="Couple collection watches poster"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
