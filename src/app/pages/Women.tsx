import { useMemo } from "react";
import { ProductCatalog } from "../components/product/ProductCatalog";
import { useProducts } from "../hooks/useProducts";

export function Women() {
  const { products, loading, error } = useProducts();

  const womenProducts = useMemo(
    () => products.filter((item) => item.category.slug === "women" || item.category.name.toLowerCase() === "women"),
    [products],
  );

  return (
    <ProductCatalog
      title="Women's Watches"
      description="Refined profiles with elegant dials, polished materials, and modern versatility for every occasion."
      products={womenProducts}
      loading={loading}
      error={error}
      activeTag="Women"
    />
  );
}
