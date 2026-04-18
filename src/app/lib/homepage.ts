export type HomepageSeo = {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
};

export type HomepageHeroBanner = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  targetUrl: string;
};

export type HomepageBrand = {
  id: number;
  name: string;
  slug: string;
  logo: string;
};

export type HomepageProductBrand = {
  name: string;
  slug: string;
};

export type HomepageListProduct = {
  id: number;
  name: string;
  slug: string;
  thumbnail: string | null;
  price: number;
  comparePrice: number | null;
  discountPercent: number | null;
  rating: number;
  reviewCount: number;
  currency: string;
  inStock: boolean;
  badge: string | null;
  brand: HomepageProductBrand;
};

export type HomepageCelebrityProduct = {
  id: number;
  slug: string;
  thumbnail: string | null;
  price: number;
  currency: string;
};

export type HomepageCelebrityLook = {
  id: number;
  slug: string;
  image: string;
  brand: HomepageProductBrand;
  products: HomepageCelebrityProduct[];
};

export type HomepageCollectionPreviewItem = {
  categoryId: number;
  posterUrl: string;
};

export type HomepageCollectionsPreview = {
  men: HomepageCollectionPreviewItem;
  women: HomepageCollectionPreviewItem;
  kids: HomepageCollectionPreviewItem;
};

export type HomepageData = {
  heroBanners: HomepageHeroBanner[];
  brands: HomepageBrand[];
  bestSellers: HomepageListProduct[];
  newArrivals: HomepageListProduct[];
  celebrityLooks: HomepageCelebrityLook[];
  collectionsPreview: HomepageCollectionsPreview;
  seo: HomepageSeo;
};

type HomepageResponse = {
  success: boolean;
  message: string;
  data: HomepageData;
};

export const HOMEPAGE_API_URL =
  import.meta.env.VITE_HOMEPAGE_API_URL ?? "http://localhost:3000/api/homepage";

export async function fetchHomepage(signal?: AbortSignal): Promise<HomepageData> {
  const response = await fetch(HOMEPAGE_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load homepage data (${response.status}).`);
  }

  const payload = (await response.json()) as HomepageResponse;

  if (!payload?.data || !Array.isArray(payload.data.heroBanners)) {
    throw new Error("Invalid homepage response format.");
  }

  return payload.data;
}
