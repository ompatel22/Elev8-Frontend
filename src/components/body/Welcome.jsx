import React from 'react';
import FeatureSection from '../features/FeatureSection';

const Welcome = () => {
  const text="Welcome "+localStorage.getItem("username")+"!";
  return (
        <FeatureSection text={text} />
  );
};

export default Welcome;
