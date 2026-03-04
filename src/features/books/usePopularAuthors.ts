import { useQuery } from "@tanstack/react-query";
import { getPopularAuthors } from "./booksApi";

export const usePopularAuthors = (limit: number) => {
  return useQuery({
    queryKey: ["popular-author", limit],
    queryFn: () => getPopularAuthors(limit),
    // enabled: !!limit,
  });
};
