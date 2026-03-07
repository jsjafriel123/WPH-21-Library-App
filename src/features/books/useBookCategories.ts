import { useQuery } from "@tanstack/react-query";
import { getBookCategories } from "./booksApi";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useBookCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORY,
    queryFn: () => getBookCategories(),
    // enabled: !!limit,
  });
};
