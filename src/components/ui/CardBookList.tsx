import type { Book } from "@/features/books/booksApi";
import { Link } from "react-router-dom";
export default function CardBookList({ book }: { book: Book }) {
  return (
    <div className="h-[370px] w-[172px] rounded-xl bg-white shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[439.75px] lg:w-[204.75px]">
      <Link to={`/book/${book.id}`}>
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-[258px] w-full rounded-t-xl object-fill lg:h-[307.12px]"
        />
        <div className="flex h-[112px] w-full flex-col gap-1 rounded-b-xl p-3 lg:h-[132px] lg:gap-1 lg:p-4">
          <h2 className="h-[30px] w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-md font-bold tracking-[-3%] text-neutral-900 lg:text-lg">
            {book.title}
          </h2>

          <p className="h-[30px] w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium tracking-[-3%] text-neutral-700 lg:text-md">
            {book.author.name}
          </p>

          <p className="text-sm font-semibold tracking-[-2%] lg:text-md">
            ⭐ {book.rating}
          </p>

          {/* <p className="text-muted-foreground text-xs"> */}
          {/* Added {dayjs(book.createdAt).format("DD MMM YYYY")} */}
          {/* {book.category.name}
        </p> */}
        </div>
      </Link>
    </div>
  );
}
