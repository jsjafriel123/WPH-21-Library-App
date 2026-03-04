import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "./authApi";
import { setCredentials, logout } from "./authSlice";
import type { MeResponse } from "@/types/auth";
import { AxiosError } from "axios";
import { useEffect } from "react";
export const useAuthRestore = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");

  const { data, isLoading, isError } = useQuery<MeResponse, AxiosError>({
    queryKey: ["restore-auth"],
    queryFn: getMe,
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (data && token) {
      dispatch(
        setCredentials({
          profile: data.profile,
          loanStats: data.loanStats,
          reviewsCount: data.reviewsCount,
          token,
        }),
      );
    }
  }, [data, token, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (!token) {
      dispatch(logout());
    }
  }, [token, dispatch]);

  return { isRestoring: !!token && isLoading };
};
