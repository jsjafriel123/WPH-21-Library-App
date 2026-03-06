import { useAppSelector } from "@/app/hooks";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useUpdateProfile } from "@/features/auth/useUpdateProfile";
import { useDispatch } from "react-redux";
import { updateProfile } from "@/features/auth/authSlice";
export default function ProfileTab() {
  const { profile } = useAppSelector((state) => state.auth);
  if (!profile) return <p>Loading...</p>;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [profilePhoto, setProfilePhoto] = useState<File | undefined>();
  const { mutate, isPending } = useUpdateProfile();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    mutate(
      {
        name,
        email,
        phone,
        profilePhoto,
      },
      {
        onSuccess: (data) => {
          dispatch(updateProfile(data.data.profile));
          toast.success("Profile updated");
          setIsEditing(false);
        },
      },
    );
  };

  return (
    <section className="mt-6 flex h-[315px] w-[361px] flex-col gap-[15px] lg:h-[360px] lg:w-[557px] lg:gap-6">
      <p className="flex h-8 w-full text-display-xs font-bold text-neutral-950 lg:h-[38px] lg:text-display-sm lg:tracking-[-3%]">
        Profile
      </p>
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_0px_20px_0px_#CBCACA40] lg:h-[298px] lg:w-[557px] lg:gap-6 lg:p-5">
        <div className="flex h-[172px] w-[329px] flex-col gap-2 lg:h-[190px] lg:w-[517px] lg:gap-3">
          <div className="h-16 w-full">
            {isEditing ? (
              <>
                <p className="text-sm font-medium tracking-[-3%] text-neutral-950 lg:text-md">
                  Profile Photo
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setProfilePhoto(file);
                    console.log("file:", file);
                  }}
                />
              </>
            ) : (
              <img
                src={
                  profile.profilePhoto
                    ? profile.profilePhoto
                    : "/assets/image-Author.svg"
                }
                alt={profile.name}
                className="flex size-16 rounded-full"
              />
            )}
          </div>
          <div className="flex w-full justify-between">
            <span className="text-sm font-medium tracking-[-3%] text-neutral-950 lg:text-md">
              Name
            </span>
            {isEditing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded border px-2 text-right lg:w-[300px]"
              />
            ) : (
              <span className="text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-md">
                {profile.name}
              </span>
            )}
          </div>
          <div className="flex w-full justify-between">
            <span className="text-sm font-medium tracking-[-3%] text-neutral-950 lg:text-md">
              Email
            </span>
            {isEditing ? (
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded border px-2 text-right lg:w-[300px]"
              />
            ) : (
              <span className="text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-md">
                {profile.email}
              </span>
            )}
          </div>
          <div className="flex w-full justify-between">
            <span className="text-sm font-medium tracking-[-3%] text-neutral-950 lg:text-md">
              Nomor Handphone
            </span>
            {isEditing ? (
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded border px-2 text-right lg:w-[300px]"
              />
            ) : (
              <span className="text-sm font-bold tracking-[-2%] text-neutral-950 lg:text-md">
                {profile.phone}
              </span>
            )}
          </div>
        </div>
        <div className="flex w-full justify-between">
          <Button
            disabled={isPending}
            onClick={
              isEditing ? () => handleSubmit() : () => setIsEditing(true)
            }
            className={`${isEditing ? "w-[229px] lg:w-[417px]" : "w-[329px] lg:w-[517px]"} h-[44px] rounded-[100px] bg-primary-300 text-md font-bold tracking-[-2%] text-neutral-25`}
          >
            {isEditing ? "Confirm Update" : "Update Profile"}
          </Button>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => {
              setIsEditing(false);
              setName(profile?.name ?? "");
              setEmail(profile?.email ?? "");
              setPhone(profile?.phone ?? "");
              setProfilePhoto(undefined);
            }}
            className={`${isEditing ? "flex" : "hidden"} p2 h-11 w-fit rounded-2xl font-bold`}
          >
            Cancel
          </Button>
        </div>
      </div>
    </section>
  );
}
