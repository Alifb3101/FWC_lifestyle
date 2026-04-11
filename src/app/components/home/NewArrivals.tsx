import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const aedFormatter = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 0,
});

const newProducts = [
  {
    id: 1,
    name: "Prospex Solar Diver",
    brand: "SEIKO",
    price: 1399,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 124,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1509048191080-d2ea3a5d3d2f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Eco-Drive Chronograph",
    brand: "CITIZEN",
    price: 1249,
    originalPrice: null,
    rating: 5.0,
    reviews: 89,
    badge: "JUST DROPPED",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Master of G Metal Series",
    brand: "G-SHOCK",
    price: 1899,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 156,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1617714656659-47f3338a7b37?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Classic Analog Steel",
    brand: "CASIO",
    price: 499,
    originalPrice: null,
    rating: 4.7,
    reviews: 98,
    badge: "JUST DROPPED",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=900&q=80",
  },
];

export function NewArrivals() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">New Arrivals</h2>
            <p className="text-muted-foreground max-w-2xl">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product, index) => (
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
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                    {product.badge}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Eye className="w-4 h-4" />
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
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
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
                    <span className="text-sm text-muted-foreground line-through">
                      {aedFormatter.format(product.originalPrice)}
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
