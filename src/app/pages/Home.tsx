import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { Hero } from "../components/home/Hero";
import { BrandShowcase } from "../components/home/BrandShowcase";
import CelebrityLookSection from "../components/home/CelebrityLookSection";
import { CoupleWatchHighlight } from "../components/home/CoupleWatchHighlight";
import { GenderBlocks } from "../components/home/GenderBlocks";
import { BestSellers } from "../components/home/BestSellers";
import { TrustProof } from "../components/home/TrustProof";
import { InstagramFeed } from "../components/home/InstagramFeed";
import { useHomepage } from "../hooks/useHomepage";

const DEFAULT_SEO = {
  title: "Premium Watches | Curated Collections",
  description: "Shop premium watches with best sellers, new arrivals, and curated collections for men, women, and kids.",
  keywords: ["watches", "premium watches", "best sellers", "new arrivals"],
  canonicalUrl: "/",
  ogImage: "https://static.helioswatchstore.com/media/easyslide/1RagaGlimmers_1.jpg",
};

export function Home() {
  const { homepage, loading } = useHomepage();
  const location = useLocation();

  const seo = homepage?.seo ?? DEFAULT_SEO;
  const canonicalPath = seo.canonicalUrl || location.pathname || "/";
  const siteOrigin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "";
  const canonicalUrl = canonicalPath.startsWith("http")
    ? canonicalPath
    : `${siteOrigin}${canonicalPath}`;

  return (
    <article aria-label="Homepage content">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(", ")} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={seo.ogImage || DEFAULT_SEO.ogImage} />
      </Helmet>

      <Hero banners={homepage?.heroBanners ?? []} loading={loading} />
      <BrandShowcase brands={homepage?.brands ?? []} loading={loading} />
      <CelebrityLookSection
        looks={homepage?.celebrityLooks ?? []}
        brands={homepage?.brands ?? []}
        loading={loading}
      />
      <BestSellers
        bestSellerItems={homepage?.bestSellers ?? []}
        newArrivalItems={homepage?.newArrivals ?? []}
        loading={loading}
      />
      <CoupleWatchHighlight />
      <GenderBlocks collectionsPreview={homepage?.collectionsPreview ?? null} loading={loading} />
      <InstagramFeed />
      <TrustProof />
    </article>
  );
}
