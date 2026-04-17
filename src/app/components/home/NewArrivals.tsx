import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import { formatPrice } from "../../lib/products";

export function NewArrivals() {
  const { products, loading } = useProducts();

  const newProducts = useMemo(
    () => [...products].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 4),
    [products],
  );

  return (
    <section className="section-block bg-background">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-[clamp(2.5rem,6vw,4rem)]"
        >
          <div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold mb-4">New Arrivals</h2>
            <p className="text-muted-foreground max-w-2xl text-[clamp(0.95rem,2vw,1.1rem)]">
              The latest additions to our exclusive collection. Be the first to own these exceptional timepieces.
            </p>
          </div>
          <Link
            to="/new-arrivals"
            className="hidden md:inline-block text-primary hover:underline font-semibold"
          >
            View All
          </Link>
        </motion.div>

        <div className="grid gap-[clamp(1rem,2.5vw,1.75rem)] [grid-template-columns:repeat(auto-fit,minmax(14.5rem,1fr))]">
          {loading &&
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-[24rem] rounded-lg border border-border bg-card animate-pulse" />
            ))}

          {newProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="relative overflow-hidden rounded-lg bg-card border border-border mb-4">
                <Link to={`/product/${product.slug}`} className="block aspect-square relative overflow-hidden">
                  <ImageWithFallback
                    src={product.thumbnail}
                    alt={`${product.brand.name} ${product.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                    {index < 2 ? "NEW" : "JUST DROPPED"}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-background/90 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-background/90 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      ADD TO CART
                    </button>
                  </div>
                </Link>
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground tracking-wider">{product.brand.name}</p>
                <Link to={`/product/${product.slug}`} className="block">
                  <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold">{product.rating > 0 ? product.rating.toFixed(1) : "-"}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">{formatPrice(product.price, product.currency)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice, product.currency)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:hidden"
        >
          <Link
            to="/new-arrivals"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded font-semibold tracking-wide hover:bg-primary/90 transition-all"
          >
            VIEW ALL NEW ARRIVALS
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
