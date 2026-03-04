import { Button } from "../ui/button";
import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addToCart } from "@/services/cart";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export default function LoanButtons({ book }: { book: any }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const { isBookInCart } = useCart();
  const alreadyInCart = isBookInCart(book.id);
  const navigate = useNavigate();

  const addMutation = useMutation({
    mutationFn: addToCart,

    onMutate: async (bookId: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.CART] });

      const previousCart = queryClient.getQueryData([QUERY_KEYS.CART]);

      queryClient.setQueryData([QUERY_KEYS.CART], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            items: [
              ...old.data.items,
              {
                id: Date.now(), // temp id
                bookId,
                book: book,
              },
            ],
          },
        };
      });

      return { previousCart };
    },

    onError: (error: any, variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.CART], context?.previousCart);
      const message =
        error?.response?.data?.message || "Failed to add to basket";

      toast.error(message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART],
      });
    },
  });

  const handleBorrowNow = async () => {
    try {
      // If not in cart, add first
      if (!alreadyInCart) {
        await addMutation.mutateAsync(book.id);
      }
      navigate(`/cart?selectBookId=${book.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full justify-center lg:justify-start">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild disabled={isAuthenticated}>
            <div className="flex h-[72px] w-full items-center justify-between px-1 lg:h-[48px] lg:w-[412px] lg:gap-3">
              <Button
                variant="outline"
                onClick={() => addMutation.mutate(book.id)}
                disabled={
                  !isAuthenticated ||
                  addMutation.isPending ||
                  alreadyInCart ||
                  book.availableCopies === 0
                }
                title="Put this title into your cart"
                className="h-[40px] w-[174.5px] rounded-[100px] text-md font-bold shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[48px] lg:w-[200px]"
              >
                {alreadyInCart
                  ? "Already in Cart"
                  : addMutation.isPending
                    ? "Adding..."
                    : book.availableCopies === 0
                      ? "No available copy"
                      : "Add to Cart"}
              </Button>

              <Button
                disabled={!isAuthenticated || book.availableCopies === 0}
                title="Checkout to borrow this title"
                onClick={() => handleBorrowNow()}
                className="h-[40px] w-[174.5px] rounded-[100px] bg-primary-300 text-md font-bold text-neutral-25 shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[48px] lg:w-[200px]"
              >
                {book.availableCopies === 0 ? "No available copy" : "Borrow Book"}
              </Button>
            </div>
          </TooltipTrigger>
          {!isAuthenticated && (
            <TooltipContent className="border border-primary-200 bg-neutral-200">
              <p className="font-bold">Please Login to borrow this book</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
