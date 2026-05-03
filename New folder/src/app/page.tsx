import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { FeaturedSection } from "@/components/featured-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedSection
        title="Trending Products"
        subtitle="Most popular items this week based on user engagement"
        type="trending"
      />
      <FeaturedSection
        title="Biggest Discounts"
        subtitle="Save big with these incredible deals"
        type="deals"
      />
    </>
  );
}