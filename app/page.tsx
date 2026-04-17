"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DarkShowcase from "@/components/DarkShowcase";
import StorySection from "@/components/StorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import LovedByFamilies from "@/components/LovedByFamilies";
import TrendingFinds from "@/components/TrendingFinds";
import RealNurseries from "@/components/RealNurseries";
import Footer from "@/components/Footer";

export default function Home() {
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
