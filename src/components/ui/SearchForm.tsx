import { useState, useEffect } from "react";
import { Input } from "./input";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchForm() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(location.search);

    if (!input.trim()) {
      params.delete("q");
    } else {
      params.set("q", input.trim());
    }

    // Reset page when new search
    params.delete("page");

    navigate(
      {
        pathname: "/books",
        search: params.toString(),
      },
      { replace: location.pathname === "/books" },
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") ?? "";
    setInput(q);
  }, [location.search]);

  return (
    <form onSubmit={handleSubmit} className="relative size-auto">
      <Input
        id="search"
        type="search"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-10 w-[265px] gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-2 lg:h-11 lg:w-[500px] lg:pl-10 lg:pr-4"
      />
      <button
        type="submit"
        className="absolute hidden size-6 hover:scale-105 lg:left-3 lg:top-2.5 lg:block"
      >
        <img
          src="/assets/icon-Search.svg"
          alt="Search"
          className="object-cover"
        />
      </button>
    </form>
  );
}
