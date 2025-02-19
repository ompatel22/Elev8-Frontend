import React from "react";

const ShimmerEffect = ({ className }) => {
  return (
    <div
      className={`animate-shimmer bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 bg-[length:400%_100%] ${className}`}
    />
  );
};

export default ShimmerEffect;