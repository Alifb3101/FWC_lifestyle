export type ProductBrand = {
  name: string;
  slug?: string;
};

export type ProductCategory = {
  name: string;
  slug?: string;
};

export type ProductDetailData = {
  id: number | string;
  name: string;
  slug: string;
  sku: string;
  modelNumber?: string;
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
  watchDescription?: string | null;
  brand: ProductBrand;
  category: ProductCategory;
  specifications?: Record<string, string | number | boolean | null>;
  strap?: Record<string, string | number | boolean | null>;
  variants?: unknown[];
};
