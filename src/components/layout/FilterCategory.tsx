import { useSearchParams } from "react-router-dom";
import { useBookCategories } from "@/features/books/useBookCategories";
import { toast } from "sonner";
export default function FilterCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = useBookCategories();

  if (isLoading) toast("Loading...");
  if (isError) toast.error("Something went wrong.");
  if (!data) return null;

  const categories = data.categories;
  const categoryId = searchParams.get("categoryId");

  const selectCategory = (id: number | null) => {
    const params = new URLSearchParams(searchParams);

    if (id) {
      params.set("categoryId", String(id));
    } else {
      params.delete("categoryId");
    }

    params.delete("page");
    setSearchParams(params);
  };

  return (
    <div className="min-h-[312px] w-full gap-2.5 px-4">
      <p className="text-lg font-bold tracking-[-2%] text-neutral-950">
        Category
      </p>
      <div className="flex h-auto w-full flex-col">
        <label className="flex h-[30px] items-center gap-2">
          <input
            type="radio"
            name="Category"
            checked={categoryId === null}
            onChange={() => selectCategory(null)}
            defaultChecked
            className="h-[46px] gap-2 text-md font-medium tracking-[-3%]"
          />
          All
        </label>
        {categories.map((cat) => (
          <label key={cat.id} className="flex h-[30px] items-center gap-2">
            <input
              type="radio"
              name="Category"
              checked={categoryId === String(cat.id)}
              onChange={() => selectCategory(cat.id)}
              className="h-[46px] gap-2 text-md font-medium tracking-[-3%]"
            />
            {cat.name}
          </label>
        ))}
      </div>
    </div>
  );
}
