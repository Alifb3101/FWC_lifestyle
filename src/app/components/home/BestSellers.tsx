import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, ShoppingCart, Star, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const aedFormatter = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 0,
});

const bestSellers = [
  {
    id: 5,
    name: "Townsman Chronograph",
    brand: "FOSSIL",
    price: 899,
    originalPrice: null,
    rating: 5.0,
    reviews: 234,
    badge: "BESTSELLER",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Prayer Time Smart Watch",
    brand: "ALFAJR",
    price: 729,
    originalPrice: 849,
    rating: 4.9,
    reviews: 187,
    badge: "TRENDING",
    stock: "Limited Stock",
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Azan Digital Series",
    brand: "AL-HARAMEEN",
    price: 549,
    originalPrice: null,
    rating: 5.0,
    reviews: 321,
    badge: "BESTSELLER",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Edifice Racing Quartz",
    brand: "CASIO",
    price: 1199,
    originalPrice: 1399,
    rating: 4.8,
    reviews: 143,
    badge: "TRENDING",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    name: "Promaster Marine",
    brand: "CITIZEN",
    price: 1699,
    originalPrice: null,
    rating: 4.7,
    reviews: 209,
    badge: "BESTSELLER",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=900&q=80",
  },
];

export function BestSellers() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm tracking-widest text-primary">TOP PERFORMERS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Best Sellers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Most requested models from our core brand portfolio, selected for reliability, design, and long-term value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg bg-card border border-border mb-4">
                <Link to={`/product/${product.id}`} className="block aspect-square relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={`${product.brand} ${product.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-background/15 to-transparent" />

                  {/* Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded ${
                    product.badge === "BESTSELLER"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {product.badge}
                  </div>

                  {/* Stock Status */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm text-xs font-semibold rounded">
                    {product.stock}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      ADD TO CART
                    </button>
                  </div>
                </Link>
              </div>

              {/* Product Info */}
              <div>
                <p className="text-xs text-muted-foreground mb-1 tracking-wider">{product.brand}</p>
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">{aedFormatter.format(product.price)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        {aedFormatter.format(product.originalPrice)}
                      </span>
                      <span className="text-xs text-green-500 font-semibold">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
