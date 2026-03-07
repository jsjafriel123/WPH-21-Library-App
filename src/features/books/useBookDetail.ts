import { useQuery } from "@tanstack/react-query";
import { getBookDetail } from "./booksApi";
import { QUERY_KEYS } from "@/constants/queryKeys";
export const useBookDetail = (id: number) => {
  return useQuery({
    // queryKey: ["detail-book", id],
    queryKey: QUERY_KEYS.BOOK_DETAIL(id),
    queryFn: () => getBookDetail(id),
    enabled: !!id,
  });
};
