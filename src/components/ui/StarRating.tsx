import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={
            index < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : "text-neutral-300"
          }
        />
      ))}
    </div>
  );
}
