import FeaturesSection from "@/components/home/features-section";
import GallerySection from "@/components/home/gallery-section";
import HeroBanner from "@/components/home/hero-banner";
import NewsletterSection from "@/components/home/newsletter-section";
import RecentEvents from "@/components/home/recent-events";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturesSection />
      <RecentEvents />
      <GallerySection />
      <NewsletterSection />
    </>
  );
}