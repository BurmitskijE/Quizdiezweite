import React from "react";
import "./LoadingAnimation.css"; // CSS-Datei einbinden

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default LoadingAnimation;
