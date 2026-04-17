import { useMemo } from "react";
import { ProductCatalog } from "../components/product/ProductCatalog";
import { useProducts } from "../hooks/useProducts";

export function CoupleWatch() {
  const { products, loading, error } = useProducts();

  const pairs = useMemo(
    () => products.filter((item) => item.category.slug === "couple" || item.category.name.toLowerCase() === "couple"),
    [products],
  );

  return (
    <ProductCatalog
      title="Couple Watches"
      description="Perfectly paired designs crafted for shared moments, gifting milestones, and signature matching styles."
      products={pairs}
      loading={loading}
      error={error}
      activeTag="Couple"
    />
  );
}
