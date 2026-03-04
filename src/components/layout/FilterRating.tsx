import { useSearchParams } from "react-router-dom";

export default function FilterRating() {
  const [searchParams, setSearchParams] = useSearchParams();

  let minRating = searchParams.get("minRating");
  // console.log("minRating", minRating);
  if (minRating === null) {
    minRating = "0";
  }

  const selectMinRating = (rating: number | null) => {
    const params = new URLSearchParams(searchParams);

    if (rating) {
      params.set("minRating", String(rating));
    } else {
      params.delete("minRating");
    }

    params.delete("page");
    setSearchParams(params);
  };

  return (
    <div className="h-[150px] w-full gap-2.5 px-4 lg:h-[272px]">
      <p className="text-lg font-bold tracking-[-2%] text-neutral-950">
        Min. Rating
      </p>
      <div className="grid h-auto w-full grid-cols-3 gap-2 lg:h-[230px] lg:grid-cols-1 lg:gap-0">
        {/* <div className="flex h-[230px] w-full flex-col"> */}
        {[5, 4, 3, 2, 1, 0].map((star) => (
          <label key={star} className="flex h-[40px] items-center gap-2 p-2">
            <input
              type="radio"
              name="minRating"
              checked={minRating === String(star)}
              onChange={() => selectMinRating(star)}
              className="h-[40px] gap-2 p-2 text-md tracking-[-2%]"
            />
            ⭐ {star}
          </label>
        ))}
      </div>
    </div>
  );
}
