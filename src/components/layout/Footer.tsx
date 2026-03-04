export default function Footer() {
  return (
    <section className="h-[328px] w-[393px] gap-6 border-t border-neutral-300 bg-white px-4 py-10 lg:h-[384px] lg:w-[1440px] lg:px-[150px] lg:py-20">
      <div className="flex h-[248px] w-full flex-col items-center gap-4 lg:h-[224px] lg:gap-10">
        <div className="flex h-[142px] w-full flex-col items-center gap-4 lg:h-[94px] lg:gap-[22px]">
          <p className="flex h-[42px] w-[141.43px] items-center gap-[11.43px] text-display-md font-bold lg:w-[155px] lg:gap-[15px]">
            <img
              src="/assets/logo-Booky.svg"
              alt="Booky"
              className="size-8 lg:size-[42px]"
            />
            Booky
          </p>
          <p className="text-center text-sm font-semibold tracking-[-2%] lg:text-md">
            Discover inspiring stories & timeless knowledge, ready to borrow
            anytime. Explore online or visit our nearest library branch.
          </p>
        </div>
        <div className="flex h-[90px] w-[196px] flex-col items-center gap-5">
          <p className="text-md font-bold tracking-[-2%] lg:tracking-[0]">
            Follow on Social Media
          </p>
          <img
            src="/assets/logo-Sosmed.svg"
            alt="Sosmed"
            className="h-10 w-full"
          />
        </div>
      </div>
    </section>
  );
}
