import { api } from "@/lib/axios";

export const getMyReviews = async ({ pageParam = 1 }) => {
  const res = await api.get(`/me/reviews?page=${pageParam}&limit=10`);
  return res.data;
};
