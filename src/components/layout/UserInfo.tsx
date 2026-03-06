import { useAppSelector } from "@/app/hooks";

export default function UserInfo() {
  const { profile } = useAppSelector((state) => state.auth);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="flex h-[146px] w-full flex-col gap-2 lg:h-[174px]">
      <p className="text-lg font-bold tracking-[-3%] text-neutral-950 lg:text-display-xs">
        User Information
      </p>
      <div className="flex h-[30px] justify-between text-sm text-neutral-950 lg:text-md">
        <span className="font-medium tracking-[-3%]">Name</span>{" "}
        <span className="font-bold tracking-[-2%]">{profile.name}</span>
      </div>
      <div className="flex h-[30px] justify-between text-sm text-neutral-950 lg:text-md">
        <span className="font-medium tracking-[-3%]">Email</span>{" "}
        <span className="font-bold tracking-[-2%]">{profile.email}</span>
      </div>
      <div className="flex h-[30px] justify-between text-sm text-neutral-950 lg:text-md">
        <span className="font-medium tracking-[-3%]">Nomor Handphone</span>{" "}
        <span className="font-bold tracking-[-2%]">{profile.phone}</span>
      </div>
    </div>
  );
}
