import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
export default function PostCheckout() {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const dueDate = searchParams.get("dueDate");
  const location = useLocation();
  const dueDate = dayjs(location.state?.dueDate).format("DD MMMM YYYY");

  return (
    <section className="mt-[254px] flex h-[345px] w-[345px] flex-col items-center gap-6">
      <img
        src="/assets/image-Check.svg"
        alt="Success"
        className="size-[142px]"
      />
      <div className="gap-2">
        <p className="text-center text-xl font-bold tracking-[-2%] text-neutral-950">
          Borrowing Successful!
        </p>
        <p className="text-center text-md font-semibold tracking-[-2%] text-neutral-950">
          Your book has been successfully borrowed. Please return it by{" "}
          <span className="text-[#EE1D52]">
            {dueDate ? dueDate : "agreed due date"}
          </span>
        </p>
      </div>
      <Button
        onClick={() => navigate("/user?tab=loans")}
        className="h-12 w-[286px] rounded-[100px] bg-primary-300 text-md font-bold tracking-[-2%] text-neutral-25"
      >
        See Borrowed List
      </Button>
    </section>
  );
}
