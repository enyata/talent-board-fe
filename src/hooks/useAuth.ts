"use client";

import API from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { setUser, setAccessToken, setLoading } = useAuthStore();

  const loginWithProvider = (provider: "google" | "linkedin") => {
    const redirect = `${window.location.origin}/auth/callback`;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/${provider}?state=${redirect}`;
  };

  const fetchUser = async () => {
    // try {
    //   const res = await API.get("/api/v1/auth/me");
    //   const { user } = res.data.data;
    //   setUser(user);
    //   return user;
    // } catch (err) {
    //   console.error("Fetch user failed", err);
    //   throw err;
    // }
  };

  return { loginWithProvider, fetchUser };
};
