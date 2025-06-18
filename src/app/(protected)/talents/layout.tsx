'use client';

import { useAuthStore } from "@/store/authStore";
import { unauthorized, useRouter } from "next/navigation";

const TalentLayout = ({ children }: { children: React.ReactNode }) => {
    const user = useAuthStore.getState().user
    const router = useRouter()
    if (!user) {
        router.push('/login')
    }
    if (user?.role !== 'recruiter') {
        return unauthorized()
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default TalentLayout
