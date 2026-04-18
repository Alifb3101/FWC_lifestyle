import { useEffect, useState } from "react";
import { fetchBrands, type Brand } from "../lib/brands";

type UseBrandsResult = {
  brands: Brand[];
  loading: boolean;
  error: string | null;
};

export function useBrands(): UseBrandsResult {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBrands() {
      try {
        setLoading(true);
        const result = await fetchBrands(controller.signal);
        setBrands(result);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError("We could not load brands right now.");
      } finally {
        setLoading(false);
      }
    }

    void loadBrands();

    return () => controller.abort();
  }, []);

  return { brands, loading, error };
}
