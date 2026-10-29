"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { POST } from "@/lib/requests";
import { ApiEnvelope } from "@/types/APIResponseTypes";
import { useAuthStore } from "@/store/authStore";
import { clearTokens } from "@/lib/store-token";
import { showError, showSuccess } from "@/lib/Alerts";

export function useLogout() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = (onSuccess?: () => void) => {
    startTransition(async () => {
      try {
        const res = await POST<ApiEnvelope>(`/api/v1/auth/logout`);
        if (res.status !== "success") {
          showError(res.message || "Something went wrong");
          return;
        }
        // HttpOnly cookies can only be cleared server-side.
        await clearTokens();
        useAuthStore.getState().logout();
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
