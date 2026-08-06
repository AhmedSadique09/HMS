import { Star } from "lucide-react";

const TOTAL_STARS = 5;

interface StarRatingProps {
  /** 0–5, halves allowed (4.5 renders four full stars and one half). */
  rating: number;
}

/** Read-only star rating. Half stars are drawn by clipping a filled star. */
export function StarRating({ rating }: StarRatingProps) {
  return (
    <div
      className="flex shrink-0 items-center gap-0.5"
      role="img"
      aria-label={`Rated ${rating} out of ${TOTAL_STARS}`}
    >
      {Array.from({ length: TOTAL_STARS }, (_, index) => {
        const fill = Math.min(Math.max(rating - index, 0), 1);

        return (
          <span key={index} className="relative block size-4">
            <Star className="absolute inset-0 size-4 text-brand/30" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="size-4 fill-brand text-brand" />
            </span>
          </span>
        );
      })}
    </div>
  );
}
