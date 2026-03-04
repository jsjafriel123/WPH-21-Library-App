import { api } from "@/lib/axios";

export const getMyLoans = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const res = await api.get("/api/me/loans", {
    params: {
      page: pageParam,
      limit: 20,
    },
  });

  return res.data.data;
};
