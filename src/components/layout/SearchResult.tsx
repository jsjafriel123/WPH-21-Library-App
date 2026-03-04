import { useSearchParams } from "react-router-dom";
import { useSearchBooks } from "@/features/books/useSearchBooks";
import CardBookList from "../ui/CardBookList";
import { useRef, useEffect } from "react";
import { toast } from "sonner";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const q = searchParams.get("q");
  const categoryId = searchParams.get("categoryId");
  const minRating = searchParams.get("minRating");
  // console.log("Search param:", q);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchBooks(q, categoryId, minRating);

  if (isFetchingNextPage) toast("Loading...");

  const hasBooks = data?.pages.some((page) => page.books.length > 0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <section className="flex max-h-[1608px] w-full gap-4 overflow-y-auto overflow-x-visible lg:max-h-[898.25px] lg:w-[879px] lg:gap-5">
      {/* {isFetchingNextPage && <p>Loading...</p>} */}
      {!hasBooks ? (
        <div className="flex h-40 w-full flex-col justify-center lg:mt-[100px]">
          <p className="w-full text-center text-display-sm">
            No books found with the selected filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 lg:gap-3">
          {data?.pages.map((page) =>
            page.books.map((book) => (
              <div key={book.id}>
                <CardBookList key={book.id} book={book} />
              </div>
            )),
          )}
          <div ref={loadMoreRef} />
        </div>
      )}
    </section>
  );
}
