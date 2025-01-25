import React from "react";
import GradientBackground from "../components/background/GradientBackground";
import LandingHeader from "../components/header/LandingHeader";
import FeatureSection from "../components/features/FeatureSection";
import Footer from "../components/footer/Footer";

const LandingPage = () => {
  return (
      <GradientBackground className="py-12 flex flex-col">
        <LandingHeader />
        <FeatureSection text="Why join us?" />
        <Footer />
      </GradientBackground>
  );
};

export default LandingPage;
