'use client'
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import FinalizePageComponent from "./finalizePageComponent";

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<Loader className="text-primary shadow-none size-[40px]" />}>
            <FinalizePageComponent />
        </Suspense>
    );
}
