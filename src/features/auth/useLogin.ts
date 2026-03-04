import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { LoginPayload, LoginResponse } from "@/types/auth";
import { AxiosError } from "axios";
import { getMe } from "./authApi";
import { logout } from "./authSlice";
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: loginUser,

    onSuccess: async (data) => {
      try {
        localStorage.setItem("access_token", data.token);
        const me = await getMe();
        dispatch(
          setCredentials({
            profile: me.profile,
            loanStats: me.loanStats,
            reviewsCount: me.reviewsCount,
            token: data.token,
          }),
        );
        toast.success("Login successful 🎉");
        navigate("/");
      } catch {
        dispatch(logout());
        toast.error("Failed to fetch user profile");
      }
    },
  });
};
