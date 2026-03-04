import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/features/auth/useRegister";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();

  // Password Validation
  const showMismatch = password2.length > 0 && password !== password2;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity(); // show browser messages
      return;
    }
    mutate(
      { name, email, phone, password },
      {
        onSuccess: () => {
          toast.success("Registered successfully 🎉");
          navigate("/login");
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Registration failed");
        },
      },
    );
  };

  return (
    <section className="mt-[75px] flex min-h-screen flex-col items-center lg:mt-[94px]">
      <div className="flex h-[701px] w-[345px] flex-col gap-5 lg:h-[431px] lg:w-[400px]">
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
            Register
          </h1>
          <p className="text-sm font-semibold tracking-[-2%] text-neutral-700 lg:text-md">
            Create your account to start borrowing books.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex h-[562px] w-full flex-col gap-4 lg:h-[564px]"
        >
          <div className="gap-0.5">
            <Label htmlFor="name" className="text-sm font-bold tracking-[-2%]">
              Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="h-[48px] px-4 py-2"
            />
          </div>
          <div className="gap-0.5">
            <Label htmlFor="email" className="text-sm font-bold tracking-[-2%]">
              Email<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder=""
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="h-[48px] px-4 py-2"
            />
          </div>
          <div className="gap-0.5">
            <Label htmlFor="phone" className="text-sm font-bold tracking-[-2%]">
              Nomor Handphone
            </Label>
            <Input
              id="phone"
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              placeholder=""
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="h-[48px] px-4 py-2"
            />
          </div>
          <div className="gap-0.5">
            <Label
              htmlFor="password2"
              className="text-sm font-bold tracking-[-2%]"
            >
              Confirm Password<span className="text-red-500">*</span>
            </Label>
            <Input
              id="password2"
              type="password"
              placeholder=""
              value={password2}
              required
              onChange={(e) => setPassword2(e.target.value)}
              // className="h-[48px] px-4 py-2"
              // />
              className={`h-[48px] px-4 py-2 ${showMismatch ? "border-[#EE1D52] focus-visible:ring-[#EE1D52]" : ""}`}
            />
            <p
              className={`${showMismatch ? "block" : "hidden"} text-[12px]/[24px] text-[#EE1D52]`}
            >
              Password not matched
            </p>
          </div>

          <Button
            type="submit"
            disabled={isPending || showMismatch}
            className="h-[48px] w-full gap-2 rounded-[100px] bg-primary-300 p-2 text-md font-bold tracking-[-2%] text-neutral-25"
          >
            {isPending ? "Registering..." : "Submit"}
          </Button>
          <p className="text-center text-sm font-semibold tracking-[-2%] text-neutral-950 lg:text-md">
            Already have an account?{" "}
            <a href="/login" className="text-[#1C65DA]">
              Log in
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
