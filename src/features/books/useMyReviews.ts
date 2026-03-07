import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyReviews } from "@/services/review";
import { QUERY_KEYS } from "@/constants/queryKeys";
export const useMyReviews = (q?: string, options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.MY_REVIEWS, { q }],
    queryFn: getMyReviews,
    initialPageParam: 1,
    enabled: options?.enabled,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
