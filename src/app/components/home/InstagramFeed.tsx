import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const instagramPosts = [
  { id: 1, hashtag: "#FWCLifestyle", image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=700&q=80" },
  { id: 2, hashtag: "#LuxuryTime", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80" },
  { id: 3, hashtag: "#WatchCollection", image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=700&q=80" },
  { id: 4, hashtag: "#Timepiece", image: "https://images.unsplash.com/photo-1523170335258-f5c6c6bd8d1f?auto=format&fit=crop&w=700&q=80" },
  { id: 5, hashtag: "#FWCStyle", image: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=700&q=80" },
  { id: 6, hashtag: "#WatchLife", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80" },
];

export function InstagramFeed() {
  return (
    <section className="section-block bg-background">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[clamp(2rem,5vw,3.5rem)]"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Instagram className="w-6 h-6 text-primary" />
            <span className="text-sm tracking-widest text-primary">@FWCLIFESTYLE</span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-[clamp(0.95rem,2vw,1.1rem)]">
            Share your FWC moments and get featured on our feed. Tag us for a chance to be showcased.
          </p>
        </motion.div>

        <div className="grid gap-[clamp(0.75rem,2vw,1.25rem)] [grid-template-columns:repeat(auto-fit,minmax(8rem,1fr))]">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border cursor-pointer"
            >
              <ImageWithFallback
                src={post.image}
                alt={post.hashtag}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-background/85 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center">
                  <Instagram className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">{post.hashtag}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-[clamp(2rem,5vw,3.5rem)]"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded font-semibold tracking-wide hover:bg-primary/90 transition-all"
          >
            <Instagram className="w-5 h-5" />
            FOLLOW US ON INSTAGRAM
          </a>
        </motion.div>
      </div>
    </section>
  );
}
