import { useQuery } from "@tanstack/react-query";
import { getBookCategories } from "./booksApi";

export const useBookCategories = () => {
  return useQuery({
    queryKey: ["book-categories"],
    queryFn: () => getBookCategories(),
    // enabled: !!limit,
  });
};
