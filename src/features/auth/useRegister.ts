import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./authApi";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
