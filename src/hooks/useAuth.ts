"use client";

import { GET } from "@/lib/requests";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { setUser, setLoading, set_isAuthenticated } = useAuthStore();

  const loginWithProvider = (provider: "google" | "linkedin") => {
    const redirect = `${window.location.origin}/auth/callback`;

    setLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/${provider}?redirect_uri=${redirect}&include_tokens_in_url=true`;
  };

  const fetchUser = async () => {
    try {
      const response = await GET("/api/v1/users/me");
      if (!response) {
        return null;
      }
      const user = response.data.user;
      console.log('response', response)
      setUser(user);
      set_isAuthenticated(true);
      return user;
    } catch (err) {
      console.error("Fetch user failed", err);
      throw err;
    }
  };

  return { loginWithProvider, fetchUser };
};
