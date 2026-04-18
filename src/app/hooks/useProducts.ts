import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "../lib/products";

type UseProductsResult = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

export function useProducts(enabled = true): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        const result = await fetchProducts(controller.signal);
        setProducts(result);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError("We could not load products right now. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();

    return () => {
      controller.abort();
    };
  }, [enabled]);

  return { products, loading, error };
}
