import { ShoppingCart } from "lucide-react";

export function Cart() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <h1 className="text-5xl font-bold mb-4">Shopping Cart</h1>
        <div className="text-center py-24 border border-border rounded-lg">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      </div>
    </div>
  );
}
