"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/hooks/useAuth";
import { startSession, takeTokensFromUrl } from "@/lib/auth-session";

export default function AuthCallbackPageComponent() {
  const router = useRouter();
  const { fetchUser } = useAuth();
  const started = useRef(false);

  useEffect(() => {
    // Strict Mode runs effects twice in dev; the URL is scrubbed on the first run.
    if (started.current) return;
    started.current = true;

    const finish = async () => {
      const tokens = takeTokensFromUrl();
      if (!tokens) {
        router.replace("/login");
        return;
      }
      try {
        await startSession(tokens);
        const user = await fetchUser();
        router.replace(!user ? "/login" : user.profile_completed ? "/dashboard" : "/onboard");
      } catch (err) {
        console.error("Error finalizing auth:", err);
        router.replace("/login");
      }
    };

    finish();
  }, [router, fetchUser]);

  return <Loader className="text-primary shadow-none size-[40px]" />;
}
