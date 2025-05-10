"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader";
import Cookies from 'js-cookie';

export default function FinalizeAuth() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const accessToken = searchParams.get("access_token");
    const { setAccessToken } = useAuthStore();
    const { fetchUser } = useAuth();

    useEffect(() => {
        const finalize = async () => {
            if (!accessToken) {
                router.replace("/not-found");
                return;
            }
            console.log('your access token at finalizing', accessToken)
            setAccessToken(accessToken);
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
