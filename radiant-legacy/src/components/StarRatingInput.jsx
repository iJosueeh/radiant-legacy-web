import React from "react";

const StarRatingInput = ({ value, onChange }) => {
  return (
    <div className="star-rating d-flex justify-content-center gap-2 my-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "1.8rem",
            cursor: "pointer",
            color: star <= value ? "#ffc107" : "#e4e5e9",
            transition: "transform 0.2s ease"
          }}
          onClick={() => onChange(star)}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.3)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRatingInput;