'use client';

import { useAuthStore } from "@/store/authStore";
import { unauthorized } from "next/navigation";

const TalentLayout = ({ children }: { children: React.ReactNode }) => {
    const userRole = useAuthStore.getState().user?.role;
    if (userRole !== 'recruiter') {
        return unauthorized()
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default TalentLayout
