"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader";

export default function FinalizeAuthClientPage() {
    const searchParams = useSearchParams();
    const accessToken = searchParams.get("access_token")
    const refreshToken = searchParams.get('refresh_token')
    const router = useRouter();
    const { fetchUser } = useAuth();
    const { setAccessToken, setRefreshToken } = useAuthStore();

    useEffect(() => {
        console.log('access token at client finalize', accessToken)
        setAccessToken(accessToken as string)
        setRefreshToken(refreshToken as string)
        const finalize = async () => {
            try {
                const user = await fetchUser();
                console.log("User fetched:", user);

                if (!user) {
                    router.replace("/login");
                    return;
                }

                if (user.profile_completed) {
                    router.replace("/dashboard");
                } else {
                    router.replace("/onboard");
                }
            } catch (err) {
                console.error("Error finalizing auth:", err);
                router.replace("/login");
            }
        };

        finalize();
        // eslint-disable-next-line
    }, []);

    return <Loader className="text-primary shadow-none size-[40px]" />;
}
