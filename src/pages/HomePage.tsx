
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StepsSection from "@/components/home/StepsSection";
import CTASection from "@/components/home/CTASection";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <StepsSection />
      <CTASection />
    </Layout>
  );
};

export default HomePage;
