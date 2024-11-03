import React from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

interface CCRatingStarsProps {
  rating: number; // Rating between 0 and 5, including half values
  className?: string; // Optional className for styling
  starSize?: number; // Size of the star icon
}

const CCRatingStars: React.FC<CCRatingStarsProps> = ({
  rating,
  className,
  starSize = 20,
}) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < Math.floor(rating)) {
      // Full star
      return (
        <TiStarFullOutline
          key={index}
          className={`text-brand-yellow ${className || ""}`}
          size={starSize}
        />
      );
    } else if (index < rating) {
      // Half star
      return (
        <TiStarHalfOutline
          key={index}
          className={`text-brand-yellow ${className || ""}`}
          size={starSize}
        />
      );
    } else {
      // Empty star
      return (
        <TiStarOutline
          key={index}
          className={`text-gray-300 ${className || ""}`}
          size={starSize}
        />
      );
    }
  });

  return <div className="flex space-x-1">{stars}</div>;
};

export default CCRatingStars;
