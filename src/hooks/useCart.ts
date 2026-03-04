import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/cart";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useCart = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCart,
  });

  const items = data?.data?.items ?? [];
  const bookIdSet = new Set(items.map((item: any) => item.bookId));
  const isBookInCart = (bookId: number) => {
    // return items.some((item: any) => item.bookId === bookId);
    return bookIdSet.has(bookId);
  };

  return {
    cartItems: items,
    isBookInCart,
    isLoading,
  };
};
