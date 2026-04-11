import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function GenderBlocks() {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Essentials Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/collections?filter=daily" className="group block relative overflow-hidden rounded-lg">
              <div className="aspect-[4/5] bg-gradient-to-br from-blue-900/20 via-background to-background border border-border flex flex-col justify-end p-12 relative">
                {/* Decorative Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-primary/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-primary/20 rounded-full group-hover:scale-110 transition-transform duration-700 delay-75" />

                <div className="relative z-10">
                  <h3 className="text-5xl font-bold mb-4 group-hover:text-primary transition-colors">
                    Daily Essentials
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Reliable everyday watches from Casio, Fossil, Seiko, and Citizen built for practical style.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                    <span className="tracking-wide">EXPLORE DAILY PICKS</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Prayer & Heritage Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/collections?filter=heritage" className="group block relative overflow-hidden rounded-lg">
              <div className="aspect-[4/5] bg-gradient-to-br from-rose-900/20 via-background to-background border border-border flex flex-col justify-end p-12 relative">
                {/* Decorative Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-secondary/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-secondary/20 rounded-full group-hover:scale-110 transition-transform duration-700 delay-75" />

                <div className="relative z-10">
                  <h3 className="text-5xl font-bold mb-4 group-hover:text-secondary transition-colors">
                    Prayer & Heritage
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Purpose-built prayer time watches from Alfajr and Al-Harameen with elegant regional design language.
                  </p>
                  <div className="inline-flex items-center gap-2 text-secondary font-semibold group-hover:gap-4 transition-all">
                    <span className="tracking-wide">EXPLORE HERITAGE PICKS</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
