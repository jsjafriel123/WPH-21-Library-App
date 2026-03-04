import { useBooks } from "@/features/books/useBooks";
import { toast } from "sonner";
import type { Book } from "@/features/books/booksApi";
import CardBook from "../ui/CardBook";
export default function RelatedBooks({
  bookId,
  categoryId,
}: {
  bookId: number;
  categoryId: number;
}) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBooks(categoryId, 10);

  if (isLoading) toast("Loading...");
  if (isError) toast.error("Something went wrong.");

  if (!data) return null;
  const books = data;
  // console.log(books);
  let totalRecords = data?.pages[0]?.pagination.total ?? 0;
  totalRecords = totalRecords - 1;

  return (
    <section className="flex max-h-[1198px] w-[364px] flex-col items-center gap-5 lg:max-h-[1128px] lg:w-[1200px] lg:gap-10">
      <div className="flex h-[36px] w-full items-center lg:h-[44px] lg:text-display-lg">
        <h1 className="text-display-xs font-bold text-neutral-950">
          Related Books ({totalRecords})
        </h1>
      </div>

      <div className="grid h-auto w-full grid-cols-2 gap-4 overflow-y-auto overflow-x-hidden lg:h-[468px] lg:grid-flow-col lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-rows-1 lg:gap-5 lg:overflow-x-auto lg:overflow-y-hidden">
        {books?.pages.flatMap((page) =>
          page.books
            .filter((book: Book) => book.id !== bookId)
            .map((book: Book) => <CardBook key={book.id} book={book} />),
        )}
      </div>
    </section>
  );
}
