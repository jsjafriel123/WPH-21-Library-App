import { DatePicker } from "@/components/ui/DatePicker";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import UserInfo from "@/components/layout/UserInfo";
import CheckoutList from "@/components/layout/CheckoutList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { borrowFromCart } from "@/services/cart";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
export default function Checkout() {
  const [searchParams] = useSearchParams();
  const itemIds = searchParams.get("items")?.split(",").map(Number) ?? [];
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [duration, setDuration] = useState(3);
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const dueDate = useMemo(() => {
    return dayjs(selectedDate).add(duration, "day");
  }, [selectedDate, duration]);

  const ErrorList = ({ failed }: { failed: any[] }) => {
    console.log("failed:", failed);
    const { cartItems } = useCart();
    console.log("cartItems:", cartItems);

    const failedMap = new Map(failed.map((f: any) => [f.cartItemId, f]));
    console.log("failedMap:", failedMap);

    return (
      <>
        <p>Please delete the following book(s) from your Cart</p>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          {cartItems
            .filter((item: any) => failedMap.has(item.id))
            .map((item: any) => {
              const failedItem = failedMap.get(item.id);
              console.log("failedItem:", failedItem);
              return (
                <li key={item.id} className="text-muted-foreground text-xs">
                  {item.book.title} - {failedItem.reason}
                </li>
              );
            })}
        </ul>
      </>
    );
  };

  const borrowMutation = useMutation({
    mutationFn: borrowFromCart,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART],
      });
      console.log("data:", data);
      console.log("data.data:", data.data);
      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });
      if (data.data.failed.length === 0) {
        // navigate(`/checkout/success?dueDate=${dueDate}`, { replace: true, });
        const dateToSend = dueDate.toISOString(); // "2026-03-13T..."
        navigate("/checkout/success", {
          replace: true,
          state: { dateToSend },
        });
        toast.success("Checkout completed", {
          description: data.data.message,
        });
      } else {
        const failedItems = data.data.failed;
        // console.log("failedItems", failedItems);
        toast.info(data.message, {
          duration: Infinity,
          description: <ErrorList failed={failedItems} />,
          action: { label: "X", onClick: () => close() },
        });
        navigate("/cart", { replace: true });
      }
    },

    onError: (error: any) => {
      toast.error("Borrow failed", {
        description: error?.response?.data?.message || "Something went wrong",
      });
    },
  });

  const handleCheckout = async () => {
    try {
      borrowMutation.mutate({
        itemIds: itemIds,
        days: duration,
        borrowDate: dayjs(selectedDate).format("YYYY-MM-DD"),
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="mt-[80px] flex max-h-[1153px] w-[361px] flex-col gap-6 lg:mt-[128px] lg:h-[716px] lg:w-[1002px] lg:gap-8">
      <p className="flex w-full text-display-xs font-bold text-neutral-950 lg:text-display-lg">
        Checkout
      </p>
      <div className="flex max-h-[1101px] w-full flex-col gap-4 lg:h-[640px] lg:flex-row lg:gap-[58px]">
        {/* User info & Book list */}
        <div className="flex max-h-[454px] w-full flex-col gap-4 lg:h-[640px] lg:max-h-none">
          <UserInfo />
          <div className="h-px w-full border bg-neutral-300" />
          {/* Book List */}
          <CheckoutList itemIds={itemIds} />
        </div>
        {/* Checkout Function */}
        <div className="flex h-[623px] w-full flex-col gap-4 rounded-3xl bg-white p-4 shadow-[0px_0px_20px_0px_#CBCACA40]">
          <p className="h-[34px] w-full text-xl font-bold tracking-[-2%] text-neutral-950">
            Complete Your Borrow Request
          </p>
          {/* Borrow date (current) */}
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-bold tracking-[-2%] text-neutral-950">
              Borrow Date
            </p>
            <DatePicker value={selectedDate} onChange={setSelectedDate} />
          </div>
          {/* Borrow Duration */}
          <div className="flex h-[148px] w-full flex-col gap-3">
            <p className="text-sm font-bold tracking-[-2%] text-neutral-950">
              Borrow Duration
            </p>
            {[3, 5, 10].map((option: number) => (
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  id={`duration-${option}`}
                  name="duration"
                  checked={duration === option}
                  value={option}
                  onChange={() => setDuration(option)}
                  className="size-6"
                />
                <Label
                  htmlFor={`duration-${option}`}
                  className="text-sm font-semibold tracking-[-2%] text-neutral-950"
                >
                  {option} Days
                </Label>
              </div>
            ))}
          </div>
          {/* Return Date */}
          <div className="h-[111px] w-full rounded-xl bg-[#F6F9FE] p-3">
            <p className="text-sm font-bold tracking-[-2%] text-neutral-950">
              Return Date
            </p>
            <p className="text-sm font-medium tracking-[-3%] text-neutral-950">
              Please return the book no later than{" "}
              <span className="whitespace-nowrap text-sm font-bold tracking-[-2%] text-[#EE1D52]">
                {dueDate?.format("DD MMMM YYYY")}
              </span>
            </p>
          </div>
          {/* Checkout Agreement */}
          <div className="flex h-[92px] w-full flex-col gap-2">
            <div className="flex items-center gap-4">
              <Checkbox
                id="terms-1"
                name="Term-1"
                checked={term1}
                onCheckedChange={(checked: boolean) => setTerm1(checked)}
                className="size-5 text-neutral-25"
              />
              <Label
                htmlFor="term-1"
                className="text-md font-semibold tracking-[-2%] text-neutral-950"
              >
                I agree to return the book(s) before the due date.
              </Label>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox
                id="terms-2"
                name="Term-2"
                checked={term2}
                onCheckedChange={(checked: boolean) => setTerm2(checked)}
                className="size-5 text-neutral-25"
              />
              <Label
                htmlFor="term-2"
                className="text-md font-semibold tracking-[-2%] text-neutral-950"
              >
                I accept the library borrowing policy.
              </Label>
            </div>
          </div>
          <Button
            disabled={!term1 || !term2}
            onClick={() => handleCheckout()}
            className="h-12 w-full rounded-[100px] bg-primary-300 text-md font-bold tracking-[-2%] text-neutral-25"
          >
            Confirm & Borrow
          </Button>
        </div>
      </div>
    </section>
  );
}
