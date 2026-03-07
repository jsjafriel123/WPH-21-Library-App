import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useMemo } from "react";
import { getMyLoans } from "@/services/loans";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import ReviewDialog from "./ReviewDialog";
export default function BorrowedTab() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("All");
  // const { isHydrated } = useAppSelector((state) => state.auth);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["me", "loans"],
      queryFn: getMyLoans,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.pagination;

        return page < totalPages ? page + 1 : undefined;
      },
    });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage]);

  const filteredData = useMemo(() => {
    const allLoans = data?.pages.flatMap((page) => page.loans) || [];

    if (status === "All") {
      return allLoans;
    } else {
      return (
        allLoans.filter((loan: any) => loan.displayStatus === status) ||
        allLoans
      );
    }
  }, [data, status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.info(
      `Seandainya waktuku cukup, pasti kucarikan kata kunci "${input}" ini untukmu...`,
    );
  };

  return (
    <section className="mt-6 flex max-h-[1089px] w-full flex-col gap-[15px] lg:max-h-[1040px] lg:w-[1000px] lg:gap-6">
      <p className="flex h-8 w-full text-display-xs font-bold text-neutral-950 lg:h-[38px] lg:text-display-sm lg:tracking-[-3%]">
        Borrowed List
      </p>
      <form onSubmit={handleSubmit} className="relative size-auto">
        <Input
          id="search"
          type="search"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-11 w-full gap-1.5 rounded-full border border-neutral-300 bg-white py-2 pl-10 pr-4 lg:w-[544px]"
        />
        <button
          type="submit"
          className="absolute left-3 top-2.5 size-5 hover:scale-105 lg:left-3 lg:top-2.5 lg:size-6"
        >
          <img
            src="/assets/icon-Search.svg"
            alt="Search"
            className="object-cover"
          />
        </button>
      </form>
      <div className="flex h-10 w-full gap-2">
        <Button
          variant="outline"
          onClick={() => setStatus("All")}
          className={`h-10 w-fit gap-2 rounded-[100px] px-4 ${status === "All" ? "border-primary-300 bg-primary-200 text-primary-300" : ""}`}
        >
          All
        </Button>
        <Button
          variant="outline"
          onClick={() => setStatus("Active")}
          className={`h-10 w-fit gap-2 rounded-[100px] px-4 ${status === "Active" ? "border-primary-300 bg-primary-200 text-primary-300" : ""}`}
        >
          Active
        </Button>
        <Button
          variant="outline"
          onClick={() => setStatus("Returned")}
          className={`h-10 w-fit gap-2 rounded-[100px] px-4 ${status === "Returned" ? "border-primary-300 bg-primary-200 text-primary-300" : ""}`}
        >
          Returned
        </Button>
        <Button
          variant="outline"
          onClick={() => setStatus("Overdue")}
          className={`h-10 w-fit gap-2 rounded-[100px] px-4 ${status === "Overdue" ? "border-primary-300 bg-primary-200 text-primary-300" : ""}`}
        >
          Overdue
        </Button>
      </div>
      <div className="flex max-h-[913px] w-full flex-col gap-[15px] overflow-y-auto p-3 lg:max-h-[782px] lg:w-[1000px] lg:gap-4 lg:p-3">
        {filteredData?.map((loan: any) => (
          <div
            key={loan.id}
            className="flex h-[298px] w-full flex-col gap-4 rounded-2xl border p-4 shadow-[0px_0px_20px_0px_#CBCACA] lg:h-[250px] lg:w-full lg:gap-5 lg:p-5"
          >
            <div className="flex h-8 w-full justify-between">
              <div className="flex w-fit gap-1 lg:gap-3">
                <p className="gap-1 text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-md">
                  Status
                </p>
                <span className="w-fit rounded-xs bg-[#24A500]/5 px-2 text-sm font-bold tracking-[-2%] text-[#24A500]">
                  {loan.displayStatus}
                </span>
              </div>
              <div className="flex w-fit gap-1 lg:gap-3">
                <p className="gap-1 text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-md">
                  Due Date
                </p>
                <span className="w-fit rounded-xs bg-[#EE1D52]/10 px-2 text-sm font-bold tracking-[-2%] text-[#EE1D52]">
                  {dayjs(loan.dueAt).format("DD-MMMM-YYYY")}
                </span>
              </div>
            </div>
            <div className="h-px w-full border bg-neutral-300" />
            <div className="flex h-[202px] w-full flex-col gap-6 lg:h-[138px] lg:flex-row lg:items-center lg:justify-between">
              <div className="flex h-[138px] w-full gap-4">
                <img
                  src={loan.book.coverImage}
                  alt={loan.book.title}
                  className="h-[138px] w-[92px]"
                />
                <div className="flex h-[126px] w-full flex-col gap-1">
                  <p className="h-7 w-fit rounded-sm border border-neutral-300">
                    {loan.book.category.name}
                  </p>
                  <p className="line-clamp-1 overflow-hidden overflow-ellipsis text-md font-bold tracking-[-2%] lg:text-xl">
                    {loan.book.title}
                  </p>
                  <p className="text-sm font-medium tracking-[-3%] text-neutral-700 lg:text-md">
                    {loan.book.author.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="flex text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-md">
                      {dayjs(loan.borrowedAt).format("DD-MMM-YYYY")}
                    </p>
                    <div className="flex size-0.5 rounded-full bg-neutral-950 lg:size-1" />
                    <p className="flex text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-md">
                      Duration {loan.durationDays} Days
                    </p>
                  </div>
                </div>
              </div>
              {/* <Button
                onClick={() => toast.info("Maaf belum sempat dibuat coach...")}
                className="h-10 w-full gap-2 rounded-[100px] bg-primary-300 p-2 text-md font-bold tracking-[-2%] text-neutral-25 lg:w-[182px]"
              >
                Give Review
              </Button> */}
              <ReviewDialog bookId={loan.book.id} />
            </div>
          </div>
        ))}

        <div ref={loadMoreRef} />

        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </section>
  );
}
