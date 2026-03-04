import { useAppSelector } from "@/app/hooks";
import { Button } from "../ui/button";
import { toast } from "sonner";
export default function ProfileTab() {
  const { profile } = useAppSelector((state) => state.auth);

  if (!profile) return <p>Loading...</p>;

  return (
    <section className="mt-6 flex h-[315px] w-[361px] flex-col gap-[15px] lg:h-[360px] lg:w-[557px] lg:gap-6">
      <p className="flex h-8 w-full text-display-xs font-bold text-neutral-950 lg:h-[38px] lg:text-display-sm lg:tracking-[-3%]">
        Profile
      </p>
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[298px] lg:w-[557px] lg:gap-6 lg:p-5">
        <div className="flex h-[172px] w-[329px] flex-col gap-2 lg:h-[190px] lg:w-[517px] lg:gap-3">
          <img
            src="/assets/image-Author.svg"
            alt={profile.name}
            className="flex size-16"
          />
          <div className="flex w-full justify-between">
            <span className="text-sm font-medium tracking-[-3%] text-neutral-950 lg:text-md">
              Name
            </span>
            <span className="text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-md">
              {profile.name}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-sm font-medium tracking-[-3%] text-neutral-950 lg:text-md">
              Email
            </span>
            <span className="text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-md">
              {profile.email}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-sm font-medium tracking-[-3%] text-neutral-950 lg:text-md">
              Nomor Handphone
            </span>
            <span className="text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-md">
              {profile.phone}
            </span>
          </div>
        </div>
        <Button
          onClick={() => toast.info("Maaf belum sempat dibuat coach...")}
          className="h-[44px] w-[329px] rounded-[100px] bg-primary-300 text-md font-bold tracking-[-2%] text-neutral-25 lg:w-[517px]"
        >
          Update Profile
        </Button>
      </div>
    </section>
  );
}
