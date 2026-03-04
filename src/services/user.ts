import { api } from "@/lib/axios";

export const getMe = async () => {
  const res = await api.get("/me");
  return res.data;
};
