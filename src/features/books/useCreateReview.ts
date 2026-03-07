import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/services/review";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: (_data, variables) => {
      // refresh book detail
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BOOK_DETAIL(variables.bookId),
      });

      // refresh review list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.REVIEWS(variables.bookId),
      });
    },
  });
};
