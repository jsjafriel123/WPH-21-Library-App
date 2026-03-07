// import { useInfiniteQuery } from "@tanstack/react-query";
// import { getMyReviews } from "@/services/review";
import { useAppSelector } from "@/app/hooks";
import { useMyReviews } from "@/features/books/useMyReviews";
// import StarRating from "../ui/StarRating";
import CardReview from "../ui/CardReview";
import { Button } from "../ui/button";
export default function ReviewsTab() {
  const { isHydrated } = useAppSelector((state) => state.auth);

  // const { data } = useInfiniteQuery({
  //   queryKey: ["my-reviews"],
  //   queryFn: getMyReviews,
  //   initialPageParam: 1,
  //   enabled: isHydrated,
  //   getNextPageParam: (lastPage) => {
  //     if (!lastPage.meta.hasNextPage) return undefined;
  //     return lastPage.meta.page + 1;
  //   },
  // });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyReviews(
    undefined,
    { enabled: isHydrated },
  );

  const reviews = data?.pages.flatMap((page) => page.reviews) ?? [];

  return (
    <div className="flex max-h-[1251px] w-full flex-col gap-[15px] lg:w-[1000px] lg:gap-6">
      <p className="text-display-xs font-bold text-neutral-950 lg:text-display-sm">
        Reviews ({reviews.length})
      </p>
      <div className="flex max-h-[1000px] w-full flex-col items-center gap-4 overflow-y-auto p-3 lg:max-h-[1322px] lg:gap-6">
        {reviews.map((review) => (
          <CardReview key={review.id} review={review} />
        ))}
      </div>
      {hasNextPage && (
        <Button
          variant="outline"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )}
    </div>
  );
}
