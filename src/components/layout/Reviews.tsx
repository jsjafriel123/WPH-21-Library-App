import type { Review } from "@/features/books/booksApi";
import { useState } from "react";
import dayjs from "dayjs";
import StarRating from "../ui/StarRating";
import { Button } from "../ui/button";
export default function ReviewSection({ reviews }: { reviews: Review[] }) {
  const [visibleCount, setVisibleCount] = useState(4);

  if (!reviews) return null;
  const avgStar =
    reviews.length === 0
      ? 0
      : Number(
          (
            reviews.reduce((sum, r) => sum + r.star, 0) / reviews.length
          ).toFixed(2),
        );

  return (
    <section className="flex max-h-[1100px] w-[361px] flex-col items-center gap-[18px] lg:max-h-[822px] lg:w-[1200px]">
      <div className="flex h-[70px] w-full flex-col gap-1 lg:h-[90px] lg:gap-3 lg:text-display-lg">
        <h1 className="text-display-xs font-bold text-neutral-950 lg:text-display-lg">
          Review
        </h1>
        <p className="text-md font-bold text-neutral-950 lg:text-xl">
          ⭐ {avgStar} ({reviews.length} Ulasan)
        </p>
      </div>
      <div className="grid max-h-[942px] w-full grid-cols-1 items-start gap-[18px] lg:max-h-[648px] lg:grid-cols-2">
        {/* Card */}
        {reviews.slice(0, visibleCount).map((review) => (
          <div
            key={review.id}
            className="flex h-[222px] w-[361px] flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[204px] lg:w-[590px]"
          >
            <div className="flex h-[58px] w-full gap-3 lg:h-[64px]">
              <img
                src="/assets/image-Author.svg"
                alt="Reviewer"
                className="size-[58px] lg:size-[64px]"
              />
              <div className="flex h-[52px] w-full flex-col lg:h-[62px]">
                <p className="text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-lg">
                  {review.user.name}
                </p>
                <p className="text-sm font-medium tracking-[-3%] text-neutral-950 lg:text-md">
                  {dayjs(review.createdAt).format("D MMMM YYYY, HH:mm")}
                </p>
              </div>
            </div>
            <div className="flex h-[116px] w-[329px] flex-col gap-2 lg:h-[92px]">
              <div className="h-[24px] w-[120px] lg:w-[128px]">
                <StarRating rating={review.star} />
              </div>
              <div className="line-clamp-3 max-h-[84px] w-full overflow-ellipsis lg:max-h-[60px]">
                <p className="text-sm font-semibold tracking-[-2%] text-neutral-950">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        disabled={visibleCount >= reviews.length}
        onClick={() => setVisibleCount((prev) => prev + 4)}
        className="flex h-10 w-[150px] rounded-[100px] text-sm font-bold tracking-[-2%] lg:h-[48px] lg:w-[200px] lg:text-md"
      >
        Load More
      </Button>
    </section>
  );
}
