import React from "react";

const GradientBackground = ({ children, className = "" }) => (
  <div
    className={`relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);

export default GradientBackground;
