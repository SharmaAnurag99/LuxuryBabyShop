import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DarkShowcase from "@/components/DarkShowcase";
import StorySection from "@/components/StorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import LovedByFamilies from "@/components/LovedByFamilies";
import TrendingFinds from "@/components/TrendingFinds";
import RealNurseries from "@/components/RealNurseries";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TINYNEST — Soft, Snug & Stylish Baby Apparels" },
      {
        name: "description",
        content:
          "Premium baby apparels crafted from organic cotton. Tops, bottoms, outerwear and more for your little star.",
      },
      { property: "og:title", content: "TINYNEST — Soft, Snug & Stylish Baby Apparels" },
      {
        property: "og:description",
        content:
          "Premium baby apparels crafted from organic cotton.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="w-full relative">
      <Header />
      <Hero />
      <DarkShowcase />
      <StorySection />
      <FeaturedProducts />
      <LovedByFamilies />
      <TrendingFinds />
      <RealNurseries />
      <Footer />
    </div>
  );
}
