import { toast } from "sonner";
import { usePopularAuthors } from "@/features/books/usePopularAuthors";

// const authors = [1, 2, 3, 4];

export default function PopularAuthors() {
  const { data, isLoading, isError } = usePopularAuthors(10);

  if (isLoading) toast("Loading...");
  if (isError) toast.error("Something went wrong.");
  if (!data) return null;

  const authors = data.authors;

  return (
    <section className="flex max-h-[444px] w-[361px] flex-col gap-6 lg:h-[197px] lg:w-[1200px]">
      <p className="w-full text-display-xs font-bold lg:h-11 lg:text-display-lg">
        Popular Authors
      </p>
      {/* <div className="flex h-[384px] w-full flex-col gap-4 lg:h-[113px] lg:flex-row lg:gap-5"> */}
      <div className="grid h-auto w-full grid-cols-1 gap-4 overflow-y-auto overflow-x-hidden px-0.5 lg:min-h-[113px] lg:grid-flow-col lg:grid-cols-[repeat(auto-fill,minmax(285px,1fr))] lg:grid-rows-1 lg:gap-5 lg:overflow-x-auto lg:overflow-y-hidden lg:px-0">
        {authors.map((author) => (
          <div
            key={author.id}
            className="flex h-[84px] w-full gap-3 rounded-xl bg-white p-3 shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[113px] lg:w-[285px] lg:gap-4 lg:p-4"
          >
            <img
              src="/assets/image-Author.svg"
              alt="Author"
              className="size-[60px] lg:size-[81px]"
            />
            <div className="flex h-[60px] min-w-[108px] flex-col gap-0.5 lg:h-[64px]">
              <p className="text-md font-bold tracking-[-2%] lg:text-lg lg:tracking-[-3%]">
                {author.name}
              </p>
              <div className="flex w-full items-center gap-1.5">
                <img
                  src="/assets/icon-Book.svg"
                  alt="Books"
                  className="inline-block size-6"
                />
                <p className="text-sm font-medium tracking-[-3%] lg:text-md">
                  {author.bookCount} Books
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
