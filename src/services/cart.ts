import { api } from "@/lib/axios";

export const addToCart = async (bookId: number) => {
  const res = await api.post("/api/cart/items", { bookId });
  return res.data;
};

export const getCart = async () => {
  const res = await api.get("/api/cart");
  return res.data;
};

export const removeCartItem = async (itemId: number) => {
  const res = await api.delete(`/api/cart/items/${itemId}`);
  return res.data;
};

export const borrowFromCart = async (payload: {
  itemIds: number[];
  days: number;
  borrowDate: string;
}) => {
  const res = await api.post("/api/loans/from-cart", payload);
  return res.data;
};
