import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/auth/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
    mutate({ email, password });
  };

  return (
    <section className="mt-[217px] flex min-h-screen flex-col items-center lg:mt-[295px]">
      <div className="flex h-[419px] w-[324px] flex-col gap-5 lg:h-[431px] lg:w-[400px]">
        <div className="flex h-[33px] w-full gap-[11.79px]">
          <img
            src="/assets/logo-Booky.svg"
            alt="Logo Booky"
            className="size-[33px]"
          />
          <p className="text-[25.14px]/[33px] font-bold text-neutral-950">
            Booky
          </p>
        </div>
        <div className="h-[66px] w-full gap-0.5 lg:h-[76px] lg:gap-2">
          <h1 className="text-display-xs font-bold text-neutral-950 lg:text-display-sm lg:tracking-[-2%]">
            Login
          </h1>
          <p className="text-sm font-semibold tracking-[-2%] text-neutral-700 lg:text-md">
            Sign in to manage your library account.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex h-[280px] w-full flex-col gap-4 lg:h-[282px]"
        >
          <div className="gap-0.5">
            <Label htmlFor="email" className="text-sm font-bold tracking-[-2%]">
              Email<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="h-[48px] px-4 py-2"
            />
          </div>
          <div className="gap-0.5">
            <Label
              htmlFor="password"
              className="text-sm font-bold tracking-[-2%]"
            >
              Password<span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="h-[48px] px-4 py-2"
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="h-[48px] w-full gap-2 rounded-[100px] bg-primary-300 p-2 text-md font-bold tracking-[-2%] text-neutral-25"
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
          <p className="text-center text-sm font-semibold tracking-[-2%] text-neutral-950 lg:text-md">
            Don't have an account?{" "}
            <a href="/register" className="text-[#1C65DA]">
              Register
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
