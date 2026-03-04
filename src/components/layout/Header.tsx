import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/auth/authSlice";
import SearchForm from "../ui/SearchForm";
import CartBadge from "../ui/CartBadge";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { profile, loanStats, reviewsCount, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isAuthenticated = !!profile;
  // console.log("profile:", profile);
  // console.log("authenticated:", isAuthenticated);

  const LoginButton = () => {
    return (
      <div className="flex h-[72px] w-[393px] items-center justify-center gap-4 p-4 lg:h-[48px] lg:w-auto lg:p-0">
        {isAuthenticated ? (
          <div className="flex items-center gap-4 lg:h-[48px] lg:w-[240px] lg:gap-6">
            <CartBadge />
            <button
              onClick={() => {
                userOpen ? setUserOpen(false) : setUserOpen(true);
              }}
              className="flex items-center gap-4 lg:h-[48px] lg:w-[184px]"
            >
              <div className="rounded-full lg:size-12">
                <img
                  src="/assets/image-Author.svg"
                  alt={profile?.name}
                  className="object-fill"
                />
              </div>
              <p className="line-clamp-1 overflow-hidden overflow-ellipsis text-lg font-semibold tracking-[-2%]">
                {profile?.name}
              </p>
              <div className="size-6">
                <img
                  src="/assets/icon-Chevron-Down.svg"
                  alt="Open Close"
                  className="size-6"
                />{" "}
              </div>
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="outline"
                className="h-[40px] w-[174.5px] rounded-[100px] text-md font-bold lg:h-[48px] lg:w-[163px]"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="h-[40px] w-[174.5px] rounded-[100px] bg-primary-300 text-md font-bold text-neutral-25 lg:h-[48px] lg:w-[163px]">
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    );
  };

  const MobileMenu = () => {
    return (
      <div
        className={`${open ? "translate-y-0" : "-translate-y-[150px]"} absolute left-0 top-[64px] z-10 flex h-[72px] w-full items-center justify-center bg-white`}
      >
        <LoginButton />
      </div>
    );
  };

  const SearchMenu = () => {
    return (
      <div
        className={`${searchOpen ? "translate-y-0" : "-translate-y-[150px]"} shadow-[0px_0px_20px_0px_#CBCACA40]; absolute left-0 top-0 z-10 flex h-[64px] w-full items-center justify-between gap-4 bg-white px-4`}
      >
        <img
          src="/assets/logo-Booky.svg"
          alt="Logo Booky"
          className="size-[40px]"
        />
        <SearchForm />
        <button onClick={() => setSearchOpen(false)} className="size-6">
          <img src="/assets/icon-X-Black.svg" alt="Close" className="size-6" />
        </button>
      </div>
    );
  };

  const UserMenu = () => {
    return (
      <div
        className={`${userOpen ? "translate-y-0" : "-translate-y-[284px] lg:-translate-y-[300px]"} absolute left-0 top-[64px] z-10 flex h-[200px] w-full flex-col justify-center gap-4 rounded-2xl bg-white p-4 shadow-[0px_0px_20px_0px_#CBCACA40] lg:left-[1136px] lg:top-[80px] lg:w-[184px]`}
      >
        <Link to="/user?tab=profile" onClick={() => setUserOpen(false)}>
          <p className="text-sm font-semibold tracking-[-2%] text-neutral-950 lg:text-md">
            Profile
          </p>
        </Link>
        <Link to="/user?tab=loans" onClick={() => setUserOpen(false)}>
          <p className="text-sm font-semibold tracking-[-2%] text-neutral-950 lg:text-md">
            Borrowed List
          </p>
        </Link>
        <Link to="/user?tab=reviews" onClick={() => setUserOpen(false)}>
          <p className="text-sm font-semibold tracking-[-2%] text-neutral-950 lg:text-md">
            Reviews
          </p>
        </Link>
        <button
          onClick={() => {
            dispatch(logout());
            setUserOpen(false);
            navigate("/login");
          }}
          className="text-left"
        >
          <p className="text-sm font-semibold tracking-[-2%] text-[#EE1D52] lg:text-md">
            Logout
          </p>
        </button>
      </div>
    );
  };

  return (
    <section className="fixed z-40 flex h-[64px] w-[393px] items-center justify-between bg-white px-4 shadow-[0_0_20_0_#CBCACA40] lg:h-[80px] lg:w-[1440px] lg:px-[120px]">
      <div className="flex items-center justify-center lg:h-[42px] lg:w-[155px] lg:gap-[15px]">
        <img
          src="/assets/logo-Booky.svg"
          alt="Logo Booky"
          onClick={() => {
            navigate("/");
          }}
          className="size-[40px] cursor-pointer lg:size-[42px]"
        />
        <span className="hidden font-extrabold lg:block lg:text-display-md">
          Booky
        </span>
      </div>
      <div className="hidden lg:flex">
        <SearchForm />
      </div>
      <div className="hidden lg:flex">
        <LoginButton />
      </div>
      <div className="flex items-center gap-4 lg:hidden">
        <button onClick={() => setSearchOpen(true)} className="size-6">
          <img
            src="/assets/icon-Search.svg"
            alt="Search"
            className="object-fill"
          />
        </button>
        {isAuthenticated ? (
          <div className="flex h-10 w-[80px] items-center gap-4">
            <CartBadge />
            <button
              onClick={() => setUserOpen((prev) => !prev)}
              className="size-10 rounded-full"
            >
              <img
                src="/assets/image-Author.svg"
                alt={profile?.name}
                className="object-fill"
              />
            </button>
          </div>
        ) : (
          <div className="flex h-[28px] w-[40px] items-center justify-end gap-4 lg:hidden">
            <button
              onClick={() => setOpen(false)}
              className={`${open ? "flex" : "hidden"}`}
            >
              <img
                src="/assets/icon-X-Black.svg"
                alt="Close Button"
                className="size-[24px]"
              />
            </button>
            <button
              onClick={() => setOpen(true)}
              className={`${open ? "hidden" : "flex"}`}
            >
              <img
                src="/assets/icon-Hamburger.svg"
                alt="Mobile Button"
                className="size-[24px]"
              />
            </button>
          </div>
        )}
      </div>
      <MobileMenu />
      <UserMenu />
      <SearchMenu />
    </section>
  );
}
