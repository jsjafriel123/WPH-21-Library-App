import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
}

export function StarRating({ value, onChange, size = 20 }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(
            "cursor-pointer transition-colors",
            star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
          )}
          onClick={() => onChange?.(star)}
        />
      ))}
    </div>
  );
}
