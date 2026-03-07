// import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBooks } from "./booksApi";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useBooks = (categoryId?: number, limit = 8) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.BOOKS(categoryId),
    queryFn: ({ pageParam = 1 }) => getBooks(categoryId, pageParam, limit),

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      if (page < totalPages) {
        return page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
