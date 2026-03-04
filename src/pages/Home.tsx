import Recommended from "@/components/layout/Recommended";
import HeroSection from "@/components/layout/Hero";
import PopularAuthors from "@/components/layout/PopularAuthors";

function Home() {
  return (
    <section className="w-100vh mt-[72px] flex max-h-[3069px] flex-col items-center gap-6 bg-[#FFFFFF] lg:mt-[96px] lg:max-h-[2358px] lg:gap-[48px]">
      <HeroSection />
      <Recommended />
      <div className="h-px w-full bg-neutral-300" />
      <PopularAuthors />
    </section>
  );
}

export default Home;
