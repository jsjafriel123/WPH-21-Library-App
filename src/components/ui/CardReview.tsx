import StarRating from "../ui/StarRating";
import dayjs from "dayjs";
export default function CardReview({ review }: { review: any }) {
  console.log(review);
  return (
    <div className="flex h-[346px] w-full flex-col gap-4 rounded-2xl border bg-white p-4 shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[380px] lg:gap-5 lg:p-5">
      <p className="text-sm font-semibold tracking-[-2%] text-neutral-950 lg:text-md">
        {dayjs(review.createdAt).format("DD MMMM YYYY, hh:mm")}
      </p>

      <div className="h-px w-full border bg-neutral-300" />

      <div className="flex h-[106px] w-full items-center gap-3 lg:h-[138px] lg:gap-5">
        <img
          src={review.book.coverImage}
          className="h-[106px] w-[70px] object-cover lg:h-[138px] lg:w-[92px]"
        />
        <div className="flex h-[94px] w-full flex-col gap-2 lg:h-[100px]">
          <div className="h-7 w-fit rounded-sm border border-neutral-300 px-1">
            <p className="text-sm font-bold tracking-[-2%] text-neutral-950">
              {review.book.category.name}
            </p>
          </div>
          <p className="line-clamp-1 overflow-hidden overflow-ellipsis text-md font-bold tracking-[-2%] text-neutral-950 lg:text-xl">
            {review.book.title}
          </p>
          <p className="text-sm font-medium tracking-[-3%] text-neutral-700 lg:text-md">
            {review.book.author.name}
          </p>
        </div>
      </div>

      <div className="h-px w-full border bg-neutral-300" />

      <div className="flex h-[116px] w-full flex-col gap-2 lg:h-[92px]">
        <StarRating rating={review.star} />
        <div className="h-[84px] w-full overflow-y-auto lg:h-[60px]">
          <p className="text-muted-foreground text-sm font-semibold tracking-[-2%] text-neutral-950 lg:text-md">
            {review.comment}
          </p>
        </div>
        {/* <p className="text-xs text-gray-400">
          {new Date(review.createdAt).toLocaleDateString()}
        </p> */}
      </div>
    </div>
  );
}
