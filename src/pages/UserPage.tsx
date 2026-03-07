// src/pages/UserPage.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import ProfileTab from "@/components/layout/ProfileTab";
import BorrowedTab from "@/components/layout/BorrowedTab";
import ReviewsTab from "@/components/layout/ReviewsTab";

export default function UserPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // read ?tab=
  const tab = searchParams.get("tab") ?? "profile";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <section className="mt-[80px] flex max-h-[1160px] w-[393px] justify-center lg:mt-[120px] lg:max-h-[1322px] lg:w-[1000px]">
      <Tabs
        defaultValue="profile"
        value={tab}
        onValueChange={handleTabChange}
        className="w-full gap-[15px]"
      >
        <div className="w-full rounded-2xl bg-neutral-100 lg:w-[557px]">
          <TabsList className="grid h-[56px] w-full grid-cols-3 p-2 lg:w-[557px]">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger value="loans" className="data-[state=active]:bg-white">
              Borrowed List
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-white"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="loans" className="flex justify-center">
          <BorrowedTab />
        </TabsContent>

        <TabsContent value="reviews" className="flex justify-center">
          <ReviewsTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
