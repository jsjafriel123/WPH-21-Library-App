import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyReviews } from "@/services/review";
import { useAppSelector } from "@/app/hooks";

export default function ReviewsTab() {
  const { isHydrated } = useAppSelector((state) => state.auth);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["my-reviews"],
    queryFn: getMyReviews,
    initialPageParam: 1,
    enabled: isHydrated,
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasNextPage) return undefined;
      return lastPage.meta.page + 1;
    },
  });

  return (
    <div className="mt-6 space-y-4">
      <h2 className="mb-4 text-xl font-semibold">Reviews (0)</h2>

      {data?.pages.map((page) =>
        page.data.map((review: any) => (
          <div key={review.id} className="rounded-xl border p-4">
            <p className="font-semibold">{review.book.title}</p>
            <p className="text-muted-foreground text-sm">{review.comment}</p>
          </div>
        )),
      )}
    </div>
  );
}
