"use client";

import { useAuthStore, User } from "@/store/authStore";
import { useEffect, useState } from "react";

export function AuthHydrator({
  user,
  refreshToken,
  accessToken,
  children,
}: {
  user: User;
  accessToken?: string | undefined;
  refreshToken?:string | undefined;
  children: React.ReactNode;
}) {
  const { setUser, setRefreshToken, setAccessToken} = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(user);
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setHydrated(true);
     // eslint-disable-next-line
  }, [user]);

  if (!hydrated) return null;

  return <>{children}</>;
}
