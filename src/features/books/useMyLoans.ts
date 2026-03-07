import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyLoans } from "@/services/loans";
export const useMyLoans = (q?: string, options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ["me", "loans", { q }],
    queryFn: getMyLoans,
    initialPageParam: 1,
    enabled: options?.enabled,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;

      return page < totalPages ? page + 1 : undefined;
    },
  });
};
