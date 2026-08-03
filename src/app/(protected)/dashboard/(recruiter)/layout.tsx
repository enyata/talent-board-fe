'use client';

import { useAuthStore } from "@/store/authStore";
import { unauthorized } from "next/navigation";

const RecruiterTalentsLayout = ({ children }: { children: React.ReactNode }) => {
    const user = useAuthStore.getState().user

    if (user?.role !== 'recruiter') {
        return unauthorized()
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default RecruiterTalentsLayout
