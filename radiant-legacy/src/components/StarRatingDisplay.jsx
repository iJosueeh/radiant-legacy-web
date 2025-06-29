import React from "react";

const StarRatingDisplay = ({ value }) => {
  return (
    <div className="star-display" style={{ fontSize: "1.2rem", color: "#ffc107" }}>
      {"★".repeat(value).padEnd(5, "☆")}
    </div>
  );
};

export default StarRatingDisplay;