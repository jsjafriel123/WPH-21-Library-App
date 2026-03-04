import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { RegisterPayload, RegisterResponse } from "@/types/auth";
import type { LoginPayload, LoginResponse } from "@/types/auth";
import type { MeResponse } from "@/types/auth";
export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "/api/auth/login",
    payload,
  );

  return response.data.data;
};

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const response = await api.post<ApiResponse<RegisterResponse>>(
    "/api/auth/register",
    payload,
  );

  return response.data.data;
};

export const getMe = async (): Promise<MeResponse> => {
  const response = await api.get<ApiResponse<MeResponse>>("/api/me");
  return response.data.data;
};
