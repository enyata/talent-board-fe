"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader";

export default function FinalizePageComponent() {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token") || "";
  const refreshToken = searchParams.get("refresh_token") || "";
  const router = useRouter();
  const { fetchUser } = useAuth();
  const { setAccessToken, setRefreshToken } = useAuthStore();

  useEffect(() => {
    const finalize = async () => {
      try {
        // store in zustand (client state)
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        // store in cookies (so server can read later)
        document.cookie = `access_token=${accessToken}; path=/; Secure; SameSite=Strict`;
        document.cookie = `refresh_token=${refreshToken}; path=/; Secure; SameSite=Strict`;

        const user = await fetchUser();
        if (!user) {
          router.replace("/login");
          return;
        }
        router.replace(user.profile_completed ? "/dashboard" : "/onboard");
      } catch (err) {
        console.error("Error finalizing auth:", err);
        router.replace("/login");
      }
    };

    finalize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader className="text-primary shadow-none size-[40px]" />;
}
