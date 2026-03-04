import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getCart } from "@/services/cart";
import { Link } from "react-router-dom";
export default function CartBadge() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCart,
  });
  const count = data?.data?.items?.length ?? 0;
  return (
    <button className="relative flex size-7 items-center lg:size-8">
      <Link to="/cart">
        <img
          src="/assets/icon-Basket.svg"
          alt="Basket"
          className="size-7 lg:size-8"
        />
      </Link>
      <div
        className={`${count === 0 ? "hidden" : "flex"} absolute -top-1.5 left-3 size-5 items-center justify-center rounded-full bg-[#EE1D52] lg:left-5`}
      >
        <p className="text-[12px]/[23.33px] font-bold tracking-[-2%] text-white">
          {count}
        </p>
      </div>
    </button>
  );
}
