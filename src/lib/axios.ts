import axios from "axios";
import { store } from "@/app/store";

export const api = axios.create({
  baseURL: "https://library-backend-production-b9cf.up.railway.app",
});

api.interceptors.request.use((config) => {
  // const token = store.getState().auth.token;
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
