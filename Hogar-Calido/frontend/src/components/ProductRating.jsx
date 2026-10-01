
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ProductRating = ({ averageRating, totalReviews, onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div className="rating-container my-4 flex items-center gap-4">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input 
                type="radio" 
                name="rating" 
                value={ratingValue} 
                onClick={() => { setRating(ratingValue); onRate(ratingValue); }}
                className="hidden"
              />
              <FaStar 
                className="cursor-pointer transition-colors" 
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                size={24}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <span className="text-gray-600 text-sm font-medium">
        {averageRating ? `${averageRating} / 5` : "Sin calificar"} ({totalReviews || 0} reseñas)
      </span>
    </div>
  );
};

export default ProductRating;