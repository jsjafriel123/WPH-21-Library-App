import type { Book } from "@/features/books/booksApi";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
export default function CardBook({ book }: { book: Book }) {
  return (
    <div className="h-[370px] w-[172px] rounded-xl bg-white shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[468px] lg:w-[224px]">
      <Link to={`/book/${book.id}`}>
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-[258px] w-full rounded-t-xl object-fill lg:h-[336px]"
        />
        <div className="flex h-[112px] w-full flex-col gap-0.5 rounded-b-xl p-3 lg:h-[132px] lg:gap-1 lg:p-4">
          <h2 className="h-7 w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-bold tracking-[-2%] text-neutral-900 lg:h-8 lg:text-lg lg:tracking-[-3%]">
            {book.title}
          </h2>

          <p className="h-7 w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium tracking-[-3%] text-neutral-700 lg:h-[30px] lg:text-md lg:tracking-[-3%]">
            {book.author.name}
          </p>

          <div className="h-[28px] w-fit lg:h-[30px]">
            <StarRating rating={book.rating} />
          </div>

          {/* <p className="text-muted-foreground text-xs"> */}
          {/* Added {dayjs(book.createdAt).format("DD MMM YYYY")} */}
          {/* {book.category.name}
        </p> */}
        </div>
      </Link>
    </div>
  );
}
