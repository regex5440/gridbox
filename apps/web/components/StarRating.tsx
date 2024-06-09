import { Star, StarHalf } from "lucide-react";

const StarRatings = ({
  rating,
  starSize = 16,
}: {
  rating: number;
  starSize?: number;
}) => {
  const ratingStarCount = Math.ceil(rating);

  return (
    <div className="inline-flex gap-1 items-center w-fit">
      {new Array(ratingStarCount).fill(0).map((_, i) => {
        if (i === ratingStarCount - 1 && (rating * 10) % 10 > 0) {
          return (
            <span key={`starTop${i}`}>
              <StarHalf
                size={starSize}
                className="fill-star-color stroke-star-color"
              />
            </span>
          );
        }
        return (
          <span key={`starTop${i}`}>
            <Star
              size={starSize}
              className="fill-star-color stroke-star-color"
            />
          </span>
        );
      })}
    </div>
  );
};

export default StarRatings;
