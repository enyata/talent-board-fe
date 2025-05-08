"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader";

export default function FinalizeAuth() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const { setAccessToken, setRefreshToken } = useAuthStore();
    const { fetchUser } = useAuth();

    useEffect(() => {
        const finalize = async () => {
            if (!accessToken || !refreshToken) {
                router.replace("/not-found");
                return;
            }

            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            try {
                const user = await fetchUser();
                console.log("User fetched: at finalizing", user);

                if (user?.profile_completed) {
                    router.replace("/dashboard");
                } else {
                    router.replace("/onboard");
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                router.replace("/login");
            }
        };
        console.log("Finalizing auth...");
        finalize();
    }, [accessToken]);

    return <Loader className="text-primary shadow-none size-[40px]" />;
}
