import { useState } from "react";
import FilterRating from "@/components/layout/FilterRating";
import FilterCategory from "@/components/layout/FilterCategory";
import SearchResult from "@/components/layout/SearchResult";
export default function BookList() {
  const [open, setOpen] = useState(false);

  const FilterSection = () => {
    return (
      <div
        className={`${open ? "translate-y-0" : "-translate-y-[1200px] lg:translate-y-0"} absolute right-0 top-[60px] z-10 flex min-h-[664px] w-[361px] flex-col rounded-xl bg-white px-0 py-4 shadow-[0px_0px_20px_0px_#CBCACA40] lg:static lg:top-0 lg:w-[266px]`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-[10px]">
            <p className="px-4 text-md font-bold text-neutral-950">Filter</p>
            <FilterCategory />
          </div>
          <div className="h-px w-full border bg-neutral-300" />
          <FilterRating />
        </div>
      </div>
    );
  };

  return (
    <section className="mt-20 flex max-h-[1728px] w-[361px] flex-col items-center gap-4 lg:mt-[128px] lg:max-h-[974.25px] lg:w-[1200px] lg:gap-8">
      <div className="h-9 w-full lg:h-11">
        <p className="text-display-xs font-bold text-neutral-950 lg:text-display-lg">
          Book List
        </p>
      </div>
      <div className="relative flex w-full flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div className="flex h-[52px] w-full rounded-xl bg-white px-3 py-3 shadow-[0px_0px_20px_0px_#CBCACA40] lg:hidden">
          <div className="flex w-full items-center justify-between lg:hidden">
            <p className="text-sm font-extrabold text-neutral-950">Filter</p>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex size-5"
            >
              <img
                src="/assets/icon-Filter.svg"
                alt="Filter"
                className="size-5"
              />
            </button>
          </div>
        </div>
        <FilterSection />
        <div className="flex flex-col">
          <SearchResult />
        </div>
      </div>
    </section>
  );
}
