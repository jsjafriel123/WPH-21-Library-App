import { api } from "@/lib/axios";
import type { QueryFunctionContext } from "@tanstack/react-query";

export const getMeLoans = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const res = await api.get("/api/me/loans", {
    params: {
      page: pageParam,
      limit: 20,
    },
  });

  return res.data.data;
};

export const getMyLoans = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext) => {
  const [, , params] = queryKey as [
    string,
    string,
    { status?: string; q?: string },
  ];

  const { status = "all", q } = params ?? {};

  const res = await api.get("/api/loans/my", {
    params: {
      status,
      q,
      page: pageParam,
      limit: 20,
    },
  });

  return res.data.data;
};
