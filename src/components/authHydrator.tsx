"use client";

import { useAuthStore, User } from "@/store/authStore";
import { useEffect, useState } from "react";

export function AuthHydrator({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const { setUser } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(user);
    setHydrated(true);
  }, [user]);

  if (!hydrated) return null;

  return <>{children}</>;
}
