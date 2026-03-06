import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/services/user";
// import { QUERY_KEYS } from "@/constants/queryKeys";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};
