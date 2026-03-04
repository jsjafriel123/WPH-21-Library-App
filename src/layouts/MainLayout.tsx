import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-neutral-25 lg:gap-[48px]">
      <Header />
      <main className="pt-6xl px-4xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
