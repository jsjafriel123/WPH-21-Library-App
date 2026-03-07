import { api } from "@/lib/axios";

export interface CreateReviewPayload {
  bookId: number;
  star: number;
  comment: string;
}

// export const getMyReviews = async ({ pageParam = 1 }) => {
//   const res = await api.get(`/me/reviews?page=${pageParam}&limit=10`);
//   return res.data;
// };
export const getMyReviews = async ({ pageParam = 1, queryKey }: any) => {
  const [, params] = queryKey;

  const { q } = params ?? {};

  const res = await api.get("/api/me/reviews", {
    params: {
      q,
      page: pageParam,
      limit: 20,
    },
  });

  return res.data.data;
};
export const createReview = async (payload: CreateReviewPayload) => {
  const res = await api.post("/api/reviews", payload);
  return res.data.data;
};
