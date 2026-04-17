import { useMemo } from "react";
import { ProductCatalog } from "../components/product/ProductCatalog";
import { useProducts } from "../hooks/useProducts";

export function Men() {
  const { products, loading, error } = useProducts();

  const menProducts = useMemo(
    () => products.filter((item) => item.category.slug === "men" || item.category.name.toLowerCase() === "men"),
    [products],
  );

  return (
    <ProductCatalog
      title="Men's Watches"
      description="Designed for precision, stature, and daily confidence. Explore durable statements in sport, dress, and business silhouettes."
      products={menProducts}
      loading={loading}
      error={error}
      activeTag="Men"
    />
  );
}
