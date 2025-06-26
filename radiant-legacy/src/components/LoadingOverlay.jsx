import React from "react";

const LoadingOverlay = ({ show }) => {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <h2>Cargando...</h2>
    </div>
  );
};

export default LoadingOverlay;