// import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "./booksApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSearchBooks = (
  q: string | null,
  categoryId: string | null,
  minRating: string | null,
  // page: number,
) => {
  // return useQuery({
  //   queryKey: ["books", { q, categoryId, minRating, page }],
  //   queryFn: () => searchBooks(q, categoryId, minRating, page),
  //   placeholderData: (previousData) => previousData,
  //   staleTime: 1000 * 30,
  // });
  return useInfiniteQuery({
    queryKey: ["books", { q, categoryId, minRating }],

    queryFn: ({ pageParam = 1 }) =>
      searchBooks(q, categoryId, minRating, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
