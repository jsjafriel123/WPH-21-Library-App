import { api } from "@/lib/axios";

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  profilePhoto?: File;
}

export const getMe = async () => {
  const res = await api.get("/me");
  return res.data;
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const formData = new FormData();

  if (payload.name) formData.append("name", payload.name);
  if (payload.phone) formData.append("phone", payload.phone);
  if (payload.profilePhoto)
    formData.append("profilePhoto", payload.profilePhoto);

  const res = await api.patch("/api/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
