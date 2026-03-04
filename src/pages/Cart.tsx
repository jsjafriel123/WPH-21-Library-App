import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef, Fragment } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getCart } from "@/services/cart";
import CartItem from "@/components/ui/CartItem";
import DeleteItemButton from "@/components/ui/DeleteItemButton";
import { Button } from "@/components/ui/button";
import { borrowFromCart } from "@/services/cart";
import { toast } from "sonner";
export default function MyCart() {
  const [selectedBooks, setSelectedBooks] = useState<Set<number>>(new Set());
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const hasHandledRef = useRef(false);
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCart,
  });
  if (isLoading) return <p>Loading...</p>;
  const cart = data.data;
  const items = data?.data?.items ?? [];
  const selectBookId = searchParams.get("selectBookId");
  const checkedCount = selectedBooks.size;

  useEffect(() => {
    if (!selectBookId) return;
    if (!items.length) return;
    if (hasHandledRef.current) return;

    const bookIdNumber = Number(selectBookId);
    const foundItem = items.find((item: any) => item.bookId === bookIdNumber);

    if (!foundItem) return;
    setSelectedBooks((prev) => {
      const newSet = new Set(prev);
      newSet.add(foundItem.bookId);
      return newSet;
    });
    hasHandledRef.current = true;
    navigate("/cart", { replace: true });
  }, [selectBookId, items]);

  const selectedItemIds = items
    .filter((item: any) => selectedBooks.has(item.bookId))
    .map((item: any) => item.id);

  const borrowMutation = useMutation({
    mutationFn: borrowFromCart,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART],
      });

      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });

      setSelectedBooks(new Set());

      toast.success("Borrow process completed", {
        description: data.data.message,
      });
    },

    onError: (error: any) => {
      toast.error("Borrow failed", {
        description: error?.response?.data?.message || "Something went wrong",
      });
    },
  });

  const toggleItem = (bookId: number) => {
    setSelectedBooks((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }

      return newSet;
    });
  };

  const toggleAll = () => {
    if (selectedBooks.size === items.length) {
      setSelectedBooks(new Set());
    } else {
      setSelectedBooks(new Set(items.map((item: any) => item.bookId)));
    }
  };

  const handleItemRemoved = (itemId: number) => {
    setSelectedBooks((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleBorrowFromCart = async () => {
    try {
      borrowMutation.mutate({
        itemIds: selectedItemIds,
        days: 3,
        borrowDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error(error);
    }
  };
  // console.log("size:", selectedBooks.size, "legth:", items.length);
  // console.log("selectedBooks:", selectedBooks);
  return (
    <section className="mt-[80px] flex max-h-[882px] w-[361px] flex-col gap-4 lg:mt-[128px] lg:max-h-[826px] lg:w-[1000px] lg:gap-8">
      <p className="text-display-xs lg:text-display-lg">
        My Cart ({cart.itemCount})
      </p>
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
        <div className="flex max-h-[566px] w-full flex-col gap-4 lg:max-h-[750px] lg:w-[642px] lg:gap-6">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedBooks.size === items.length}
              disabled={items.length === 0}
              onChange={toggleAll}
              name="Item"
              value="all"
              className="size-5"
            />
            <p className="text-md font-semibold tracking-[-2%] text-neutral-950">
              Select All
            </p>
          </div>
          <div className="flex max-h-[520px] w-full flex-col gap-4 overflow-y-auto overflow-x-hidden lg:max-h-[696px]">
            {items.map((item: any, index: number) => (
              <Fragment key={item.id}>
                {index !== 0 && (
                  <div className="w-full border border-neutral-300" />
                )}
                <div className="flex h-[106px] w-full gap-4 pr-2 lg:h-[138px] lg:w-[642px] lg:pr-6">
                  <input
                    type="checkbox"
                    name="item.id"
                    value={item.id}
                    checked={selectedBooks.has(item.bookId)}
                    onChange={() => toggleItem(item.bookId)}
                    className="size-5"
                  />

                  <CartItem item={item} />
                  <DeleteItemButton
                    itemId={item.id}
                    onRemoved={handleItemRemoved}
                  />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="flex h-[72px] w-full flex-row items-center justify-between gap-4 px-4 py-2 shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[200px] lg:w-[318px] lg:flex-col lg:items-start lg:justify-normal lg:gap-6 lg:rounded-2xl lg:p-5">
          <p className="hidden text-lg font-bold tracking-[-2%] text-neutral-950 lg:flex lg:text-xl">
            Loan Summary
          </p>
          <div className="flex h-[56px] w-[151px] flex-col lg:w-[235px] lg:flex-row lg:justify-between">
            <p className="text-sm font-medium tracking-[-3%] text-neutral-950 lg:text-md">
              Total Book
            </p>
            <p className="text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-xl">
              {checkedCount} Items
            </p>
          </div>
          <Button
            disabled={checkedCount === 0}
            onClick={() => handleBorrowFromCart()}
            // onClick={() => {
            //   navigate("/checkout");
            // }}
            title="Checkout to borrow this title(s)"
            className="h-[40px] w-[150px] rounded-[100px] bg-primary-300 text-md font-bold text-neutral-25 shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[48px] lg:w-[278px]"
          >
            Borrow Book
          </Button>
        </div>
      </div>
    </section>
  );
}
