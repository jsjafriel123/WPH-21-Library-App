const categories = [
  { id: 4, url: "/assets/icon-Fiction.svg", name: "Fiction" },
  { id: 10, url: "/assets/icon-Non-Fiction.svg", name: "Non-Fiction" },
  { id: 7, url: "/assets/icon-Self-Improvement.svg", name: "Self-Improvement" },
  { id: 9, url: "/assets/icon-Finance.svg", name: "Finance" },
  { id: 11, url: "/assets/icon-Science.svg", name: "Science" },
  { id: 8, url: "/assets/icon-Education.svg", name: "Education" },
];
interface Props {
  categoryId?: number;
  onChange: (id?: number) => void;
}
export default function Category({ categoryId, onChange }: Props) {
  const toggleButton = (id: number) => {
    id === categoryId ? onChange(undefined) : onChange(id);
  };

  return (
    <section className="flex h-[252px] w-[361px] justify-center lg:h-[130px] lg:w-[1200px]">
      <div className="grid grid-cols-3 gap-3 lg:grid-cols-6 lg:gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex max-h-[132px] w-[112.33px] flex-col gap-3 rounded-2xl p-2 shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[130px] lg:w-[186.67px] lg:p-3"
          >
            <button
              onClick={() => toggleButton(category.id)}
              className={`flex h-[56px] w-[96.33px] items-center justify-center rounded-xl p-[5.6px] lg:h-[64px] lg:w-[162.67px] lg:p-[6.4px] ${categoryId === category.id ? "scale-110 bg-primary-300" : "bg-[#E0ECFF]"}`}
            >
              <img
                src={category.url}
                alt={category.name}
                className="size-[44.8px] lg:size-[51.2px]"
              />
            </button>
            <p className="text-xs font-semibold lg:text-md lg:tracking-[-2%]">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
