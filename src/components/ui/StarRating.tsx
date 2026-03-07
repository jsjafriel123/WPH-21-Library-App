import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex h-6 gap-0.5">
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
