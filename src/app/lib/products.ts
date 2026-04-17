export type ProductBrand = {
  name: string;
  slug: string;
};

export type ProductCategory = {
  name: string;
  slug: string;
};

export type ProductVariant = {
  name?: string;
  color?: string;
};

export type Product = {
  id: string | number;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number | null;
  discountPercent: number | null;
  currency: string;
  stock: number;
  availability: string;
  thumbnail: string;
  images: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  brand: ProductBrand;
  category: ProductCategory;
  seoTitle: string | null;
  seoDescription: string | null;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
};

type ProductsApiResponse = {
  items: Product[];
};

const PRODUCTS_API_URL =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_PRODUCTS_API_URL ??
  "http://localhost:3000/api/products";

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load products (${response.status}).`);
  }

  const data = (await response.json()) as ProductsApiResponse;

  if (!data?.items || !Array.isArray(data.items)) {
    throw new Error("Invalid products response format.");
  }

  return data.items;
}

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function isInStock(product: Product): boolean {
  return product.availability === "in_stock" && product.stock > 0;
}
