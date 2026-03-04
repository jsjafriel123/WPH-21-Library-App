import { useQuery } from "@tanstack/react-query";
import { getBookDetail } from "./booksApi";

export const useBookDetail = (id: number) => {
  return useQuery({
    queryKey: ["detail-book", id],
    queryFn: () => getBookDetail(id),
    enabled: !!id,
  });
};
