import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

export function Cart() {
  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <div className="container-shell section-block">
        <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4">Shopping Cart</h1>
        <div className="text-center py-[clamp(3rem,8vw,6rem)] border border-border rounded-lg bg-card">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Link to="/new-arrivals" className="text-primary font-semibold hover:underline">Continue shopping</Link>
        </div>
      </div>
    </div>
  );
}
