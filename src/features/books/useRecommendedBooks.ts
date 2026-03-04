// import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecommendedBooks } from "./booksApi";

export const useRecommendedBooks = (
  by = "rating",
  categoryId?: number,
  limit = 8,
) => {
  //   return useQuery({
  //     queryKey: ["recommended-books", by, page, limit],
  //     queryFn: () => getRecommendedBooks(by, page, limit),
  //   });
  return useInfiniteQuery({
    queryKey: ["recommended-books", by, categoryId],
    queryFn: ({ pageParam = 1 }) =>
      getRecommendedBooks(by, categoryId, pageParam, limit),

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
