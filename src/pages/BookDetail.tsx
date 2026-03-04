import DetailSection from "@/components/layout/Detail";
import ReviewSection from "@/components/layout/Reviews";
import RelatedBooks from "@/components/layout/Related";
import { useParams } from "react-router-dom";
import { useBookDetail } from "@/features/books/useBookDetail";
import { toast } from "sonner";

function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const bookId = id ? Number(id) : 0;
  const { data, isLoading, isError } = useBookDetail(bookId);

  if (isLoading) toast("Loading...");
  if (isError) toast.error("Something went wrong.");
  if (!data) return null;
  const book = data;
  const reviews = data.reviews;

  return (
    <section className="w-100vh mt-[72px] flex h-auto flex-col items-center gap-6 bg-[#FFFFFF] lg:mt-[96px] lg:max-h-[2358px] lg:gap-[48px]">
      <DetailSection book={book} />
      <div className="h-px w-full border bg-neutral-300" />
      <ReviewSection reviews={reviews} />
      <div className="h-px w-full border bg-neutral-300" />
      <RelatedBooks bookId={book.id} categoryId={book.categoryId} />
    </section>
  );
}

export default BookDetail;
