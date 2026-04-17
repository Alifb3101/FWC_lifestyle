import { useMemo } from "react";
import { ProductCatalog } from "../components/product/ProductCatalog";
import { useProducts } from "../hooks/useProducts";

export function NewArrival() {
  const { products, loading, error } = useProducts();

  const arrivals = useMemo(
    () => [...products].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
    [products],
  );

  return (
    <ProductCatalog
      title="New Arrivals"
      description="Fresh drops from curated brands, updated continuously with the latest releases and trending references."
      products={arrivals}
      loading={loading}
      error={error}
      activeTag="Latest"
    />
  );
}
