import React, { useState, useEffect } from 'react';
import FeatureCard from '../Features/FeatureCard';
import Footer from '../Footer/Footer';
import FeatureSection from '../Features/FeatureSection';
import LandingHeader from '../Header/LandingHeader';

const LandingComponent = () => {
  
  return (
    <>

      {/* {LandingPage Header } */}
      <LandingHeader />

      {/* Features Section */}
      <FeatureSection />

      {/* {Footer} */}
      <Footer />
    </>
  );
};

export default LandingComponent;
