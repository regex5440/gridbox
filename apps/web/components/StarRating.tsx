import { Star, StarHalf } from "lucide-react";

function StarRatings({
  rating,
  starSize = 16,
}: {
  rating: number;
  starSize?: number;
}) {
  const ratingStarCount = Math.ceil(rating);

  return (
    <div className="inline-flex gap-1 items-center w-fit">
      {new Array(ratingStarCount).fill(0).map((_, i) => {
        if (i === ratingStarCount - 1 && (rating * 10) % 10 > 0) {
          return (
            <span key={`starTop${i}`}>
              <StarHalf
                className="fill-star-color stroke-star-color"
                size={starSize}
              />
            </span>
          );
        }
        return (
          <span key={`starTop${i}`}>
            <Star
              className="fill-star-color stroke-star-color"
              size={starSize}
            />
          </span>
        );
      })}
    </div>
  );
}

export default StarRatings;
