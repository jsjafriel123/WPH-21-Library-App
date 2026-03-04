import { Button } from "@/components/ui/button";
import { useRecommendedBooks } from "@/features/books/useRecommendedBooks";
import { toast } from "sonner";
import CardBook from "../ui/CardBook";
import type { Book } from "@/features/books/booksApi";
import { useState } from "react";
import Category from "@/components/layout/Category";

export default function Recommended() {
  const [categoryId, setCategoryId] = useState<number | undefined>();
  //   const { data, isLoading, isError } = useRecommendedBooks();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRecommendedBooks("rating", categoryId, 10);

  if (isLoading) toast("Loading...");
  if (isError) toast.error("Something went wrong.");

  return (
    <section className="flex flex-col items-center gap-2 lg:gap-[48px]">
      <Category categoryId={categoryId} onChange={setCategoryId} />

      <section className="flex h-auto w-[361px] flex-col items-center gap-5 lg:max-h-[1128px] lg:w-[1200px] lg:gap-10">
        <div className="flex h-[36px] w-full items-center lg:h-[44px] lg:text-display-lg">
          <h1 className="text-display-xs font-bold">Recommendation</h1>
        </div>
        <div className="flex h-auto w-full flex-col items-center overflow-x-hidden overflow-y-hidden lg:h-[958px] lg:overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-5">
            {data?.pages.flatMap((page) =>
              page.books.map((book: Book) => (
                <CardBook key={book.id} book={book} />
              )),
            )}
          </div>
        </div>

        {/* {hasNextPage && ( */}
        <Button
          onClick={async () => {
            await fetchNextPage();
            toast("More books loaded 📚");
          }}
          disabled={isFetchingNextPage || !hasNextPage}
          variant="outline"
          className="flex h-10 w-[150px] rounded-[100px]"
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
        {/* )} */}
      </section>
    </section>
  );
}
