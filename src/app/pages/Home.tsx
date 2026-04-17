import { Hero } from "../components/home/Hero";
import { BrandShowcase } from "../components/home/BrandShowcase";
import { FeaturedCollections } from "../components/home/FeaturedCollections";
import { CoupleWatchHighlight } from "../components/home/CoupleWatchHighlight";
import { GenderBlocks } from "../components/home/GenderBlocks";
import { BestSellers } from "../components/home/BestSellers";
import { TrustProof } from "../components/home/TrustProof";
import { InstagramFeed } from "../components/home/InstagramFeed";

export function Home() {
  return (
    <div>
      <Hero />
      <BrandShowcase />
      <BestSellers />
      <CoupleWatchHighlight />
      <GenderBlocks />
      <InstagramFeed />
      <TrustProof />
    </div>
  );
}
