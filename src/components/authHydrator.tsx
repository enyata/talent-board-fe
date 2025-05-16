"use client";

import { useAuthStore, User } from "@/store/authStore";
import { useEffect, useState } from "react";

export function AuthHydrator({
  user,
  refreshToken,
  children,
}: {
  user: User;
  refreshToken?:string | undefined;
  children: React.ReactNode;
}) {
  const { setUser, setRefreshToken } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(user);
    setRefreshToken(refreshToken)
    setHydrated(true);
     // eslint-disable-next-line
  }, [user]);

  if (!hydrated) return null;

  return <>{children}</>;
}
