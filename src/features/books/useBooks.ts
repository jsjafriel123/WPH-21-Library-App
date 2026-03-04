// import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBooks } from "./booksApi";

export const useBooks = (categoryId?: number, limit = 8) => {
  return useInfiniteQuery({
    queryKey: ["books", categoryId],
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
