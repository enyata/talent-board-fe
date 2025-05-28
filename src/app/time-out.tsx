'use client'
import { ButtonWithLoader } from "@/components/ui/button-with-loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Timeout() {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            router.refresh();
            setLoading(false);
        }, 1000);
    };
    return (
        <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 -translate-y-8">
            <Image
                src={'/assets/icons/cloud.svg'}
                alt="cloud"
                height={200}
                width={200}
                className=""
            />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Server Unavailable</h1>
            <p className="mb-6 text-muted-foreground max-w-md">
                Your request took too long. Please&nbsp;try again in a moment.
            </p>
            <ButtonWithLoader
                isLoading={loading}
                onClick={handleRefresh}
                className="h-[42px]"
            >
                Retry
            </ButtonWithLoader>
        </div>
    );
}