// interface props {
//   bookId: number;
//   addedAt: Date;
// }
export default function CartItem({ item }: any) {
  return (
    <div className="flex h-[106px] w-[278px] items-center gap-3 lg:h-[138px] lg:w-[504px] lg:gap-4">
      <img
        src={item.book.coverImage}
        alt={item.book.title}
        className="h-[106px] w-[70px] lg:h-[138px] lg:w-[92px]"
      />
      <div className="flex h-[94px] w-full flex-col gap-1 lg:h-[98px]">
        <div className="w-fit rounded-sm border border-neutral-300 px-1">
          <p className="text-xs">{item.book.category.name}</p>
        </div>
        <p className="line-clamp-1 overflow-hidden overflow-ellipsis text-md font-bold tracking-[-2%] text-neutral-950">
          {item.book.title}
        </p>
        <p className="text-sm font-medium tracking-[-3%] text-neutral-700">
          {item.book.author.name}
        </p>
      </div>
    </div>
  );
}
