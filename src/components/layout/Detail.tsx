import type { Book } from "@/features/books/booksApi";
import LoanButtons from "../ui/LoanButtons";

export default function DetailSection({ book }: { book: Book }) {
  console.log(book);
  return (
    <section className="flex max-h-[940px] w-[361px] flex-col items-center gap-4 lg:h-[550px] lg:w-[1200px] lg:gap-6">
      <div className="h-7 w-full text-sm font-semibold tracking-[-2%]">
        {" "}
        {`Home > Category > ${book.title}`}
      </div>
      <div className="flex max-h-[896px] w-full flex-col items-center gap-9 lg:h-[498px] lg:flex-row">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-[328.83px] w-[222.75px] bg-amber-300 object-fill lg:h-[498px] lg:w-[337px]"
        />
        <div className="flex max-h-[567px] w-[364px] flex-col items-center gap-4 lg:h-[462px] lg:w-[827px] lg:gap-5">
          <div className="flex h-[128px] w-full flex-col gap-0.5 lg:h-[138px] lg:gap-1">
            <p className="flex h-[28px] w-fit items-center justify-center rounded-sm border border-neutral-300 px-2 text-sm font-bold tracking-[-2%] text-neutral-950">
              {book.category.name}
            </p>
            <p className="line-clamp-1 overflow-hidden overflow-ellipsis text-display-xs font-bold text-neutral-950 lg:text-display-sm lg:tracking-[-2%]">
              {book.title}
            </p>
            <p className="text-sm font-semibold tracking-[-2%] text-neutral-700 lg:text-md">
              {book.author.name}
            </p>
            <p className="h-[30px] w-[192px] gap-0.5 text-md font-bold tracking-[-2%] text-neutral-900">
              ⭐ {book.rating}
            </p>
          </div>
          {/* Statistics */}
          <div className="flex h-[60px] w-full items-center justify-between gap-5 lg:h-[66px] lg:justify-start">
            <div className="flex h-full w-[95.67px] flex-col lg:w-[102px]">
              <p className="text-lg font-bold tracking-[-3%] text-neutral-950 lg:text-display-xs lg:tracking-[0]">
                N/A
              </p>
              <p className="text-sm font-medium tracking-[-2%] text-neutral-950 lg:text-md lg:tracking-[-3%]">
                Page
              </p>
            </div>
            <div className="h-full w-px bg-neutral-300" />
            <div className="flex h-full w-[95.67px] flex-col lg:w-[102px]">
              <p className="text-lg font-bold tracking-[-3%] text-neutral-950 lg:text-display-xs lg:tracking-[0]">
                {book.rating}
              </p>
              <p className="text-sm font-medium tracking-[-2%] text-neutral-950 lg:text-md lg:tracking-[-3%]">
                Rating
              </p>
            </div>
            <div className="h-[60px] w-px bg-neutral-300" />
            <div className="flex h-full w-[95.67px] flex-col lg:w-[102px]">
              <p className="text-lg font-bold tracking-[-3%] text-neutral-950 lg:text-display-xs lg:tracking-[0]">
                {book.reviewCount}
              </p>
              <p className="text-sm font-medium tracking-[-2%] text-neutral-950 lg:text-md lg:tracking-[-3%]">
                Reviews
              </p>
            </div>
          </div>
          <div className="h-px w-full bg-neutral-300" />
          {/* Description */}
          <div className="max-h-[206px] w-full gap-1 lg:h-[128px]">
            <p className="text-xl font-bold tracking-[-2%] text-neutral-950">
              Description
            </p>
            <p className="max-h-[168px] overflow-y-auto text-sm font-medium tracking-[-3%] text-neutral-950 lg:h-[90px] lg:text-md">
              {book.description}
            </p>
          </div>
          {/* Buttons */}
          <LoanButtons book={book} />
        </div>
      </div>
    </section>
  );
}
