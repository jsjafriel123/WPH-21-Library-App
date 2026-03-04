export default function HeroSection() {
  return (
    <section className="flex h-[150.67px] w-[361px] flex-col items-center gap-2 lg:h-[467px] lg:w-[1200px] lg:gap-4">
      <img
        src="/assets/image-Hero.svg"
        alt="hero"
        className="h-[132.67] w-full rounded-xl lg:h-[441] lg:rounded-4xl"
      />
      <div className="flex w-[38px] gap-1 lg:h-[10px] lg:w-[42px] lg:gap-1.5">
        <div className="size-[6px] rounded-full bg-primary-300 lg:size-[10px]" />
        <div className="size-[6px] rounded-full bg-neutral-300 lg:size-[10px]" />
        <div className="size-[6px] rounded-full bg-neutral-300 lg:size-[10px]" />
      </div>
    </section>
  );
}
