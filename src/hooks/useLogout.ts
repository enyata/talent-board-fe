"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { POST } from "@/lib/requests";
import { useAuthStore } from "@/store/authStore";
import { showError, showSuccess } from "@/lib/Alerts";

export function useLogout() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = (onSuccess?: () => void) => {
    startTransition(async () => {
      try {
        const res = await POST(`/api/v1/auth/logout`);
        if (res.status !== "success") {
          showError(res.message || "Something went wrong");
          return;
        }
        useAuthStore.getState().logout();
        document.cookie =
          "access_token=; path=/; Secure; SameSite=Strict; Max-Age=0";
        document.cookie =
          "refresh_token=; path=/; Secure; SameSite=Strict; Max-Age=0";
        onSuccess?.();
        showSuccess("Logged out successfully");
        router.replace("/login");
      } catch (error) {
        console.error("Error from form submission:", error);
        showError("Something went wrong. Please try again.");
      }
    });
  };

  return { handleLogout, isPending };
}
