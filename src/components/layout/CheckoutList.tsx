import { useCart } from "@/hooks/useCart";
export default function CheckoutList({ itemIds }: { itemIds: number[] }) {
  const { cartItems, isLoading } = useCart();
  if (isLoading) return <p>Loading...</p>;

  const selectedItems = cartItems.filter((item: any) =>
    itemIds.includes(item.id),
  );

  return (
    <div className="flex max-h-[276px] w-full flex-col gap-4 lg:h-[344px] lg:max-h-none">
      <p className="text-lg font-bold tracking-[-3%] text-neutral-950 lg:text-display-xs">
        Book List ({itemIds.length})
      </p>

      <div className="flex max-h-[228px] w-full flex-col gap-0.5 overflow-y-auto lg:max-h-[321px]">
        {selectedItems.map((item: any) => (
          <div
            key={item.id}
            className="flex h-[106px] w-full items-center gap-4 lg:h-[138px]"
          >
            <img
              src={item.book.coverImage}
              alt={item.book.title}
              className="h-full w-[70px] object-cover lg:w-[92px]"
            />
            <div className="flex h-[94px] w-full flex-col gap-1 lg:h-[100px]">
              <div className="h-7 w-fit rounded-sm border border-neutral-300 px-2">
                <p className="font-bold tracking-[-2%] lg:text-sm">
                  {item.book.category.name}
                </p>
              </div>
              <p className="line-clamp-1 overflow-hidden overflow-ellipsis text-md font-bold tracking-[-2%] text-neutral-950 lg:text-xl">
                {item.book.title}
              </p>
              <p className="text-sm font-medium tracking-[-3%] text-neutral-700 lg:text-md">
                {item.book.author.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
