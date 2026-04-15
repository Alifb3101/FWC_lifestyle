import { Heart } from "lucide-react";
import { Link } from "react-router";

export function Wishlist() {
  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <div className="container-shell section-block">
        <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4">Wishlist</h1>
        <div className="text-center py-[clamp(3rem,8vw,6rem)] border border-border rounded-lg bg-card">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
          <Link to="/brands" className="text-primary font-semibold hover:underline">Browse partner brands</Link>
        </div>
      </div>
    </div>
  );
}
