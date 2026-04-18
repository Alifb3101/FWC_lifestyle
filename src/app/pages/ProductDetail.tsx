import { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router";
import { PRODUCTS_API_URL } from "../lib/products";
import { ProductAccordion } from "../components/product-detail/ProductAccordion";
import { ProductGallery } from "../components/product-detail/ProductGallery";
import { ProductInfo } from "../components/product-detail/ProductInfo";
import type { ProductDetailData } from "../components/product-detail/types";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid product id.");
      setLoading(false);
      return;
    }

    const productId = id;
    const controller = new AbortController();

    async function loadProduct() {
      try {
        setLoading(true);

        const response = await fetch(`${PRODUCTS_API_URL}/${encodeURIComponent(productId)}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to load product (${response.status}).`);
        }

        const data = (await response.json()) as ProductDetailData;
        setProduct(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError("Failed to load product details from API.");
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();

    return () => controller.abort();
  }, [id]);

  const featureImages = useMemo(() => {
    if (!product) return [] as string[];
    const images = product.images.filter((image) => image !== product.thumbnail);
    return images.slice(0, 6);
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7f5]">
        <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-8 lg:px-10">
          <div className="h-[44rem] animate-pulse rounded-3xl border border-neutral-200 bg-white" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f7f7f5]">
        <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-8 lg:px-10">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            {error ?? "Product not found."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-neutral-900">
      <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10">
        <div className="mb-7 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
          <span>Home</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>{product.category.name}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-neutral-900">{product.name}</span>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <ProductGallery
            name={product.name}
            thumbnail={product.thumbnail}
            images={product.images}
            discountPercent={product.discountPercent}
          />

          <ProductInfo product={product} />
        </section>

        <section className="mt-16 grid gap-10 border-t border-border pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="pr-0 lg:pr-6">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/90">Product Story</p>
            <div className="max-w-[700px] text-[clamp(1.06rem,1.35vw,1.34rem)] leading-[1.82] tracking-[0em] text-foreground/90">
              {product.watchDescription || product.description}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card px-5 py-4 sm:px-7 sm:py-5">
            <ProductAccordion specifications={product.specifications} strap={product.strap} />
          </div>
        </section>

        {featureImages.length > 0 && (
          <section className="mt-16 border-t border-neutral-200 pt-10">
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-neutral-500">Feature Gallery</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featureImages.map((image, index) => (
                <div key={`${image}-${index}`} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  <img
                    src={image}
                    alt={`${product.name} feature ${index + 1}`}
                    className="h-64 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
