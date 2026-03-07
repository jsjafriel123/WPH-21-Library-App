// import { useInfiniteQuery } from "@tanstack/react-query";
// import { getMyReviews } from "@/services/review";
import { useAppSelector } from "@/app/hooks";
import { useMyReviews } from "@/features/books/useMyReviews";
// import StarRating from "../ui/StarRating";
import CardReview from "../ui/CardReview";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
export default function ReviewsTab() {
  const { isHydrated } = useAppSelector((state) => state.auth);
  const [input, setInput] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.info(
      `Seandainya waktuku cukup, pasti kucarikan kata kunci "${input}" ini untukmu...`,
    );
  };

  return (
    <div className="mt-6 flex max-h-[1221px] w-full flex-col items-center gap-[15px] pb-2 lg:w-[1000px] lg:gap-6">
      <p className="flex h-8 w-full text-display-xs font-bold text-neutral-950 lg:h-[38px] lg:text-display-sm lg:tracking-[-3%]">
        Reviews ({reviews.length})
      </p>
      <form onSubmit={handleSubmit} className="relative h-11 w-full">
        <Input
          id="search"
          type="search"
          placeholder="Search review"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-11 w-full gap-1.5 rounded-full border border-neutral-300 bg-white py-2 pl-10 pr-4 lg:w-[544px]"
        />
        <button
          type="submit"
          className="absolute left-3 top-2.5 size-5 hover:scale-105 lg:left-3 lg:top-2.5 lg:size-6"
        >
          <img
            src="/assets/icon-Search.svg"
            alt="Search"
            className="object-cover"
          />
        </button>
      </form>
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
          className="w-fit px-6"
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )}
    </div>
  );
}
