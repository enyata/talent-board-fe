'use client'
import { ButtonWithLoader } from "@/components/ui/button-with-loader";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Timeout() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 -translate-y-8">
            <Image
                src={'/assets/icons/cloud.svg'}
                alt="cloud"
                height={200}
                width={200}
                className=""
            />
            <h1 className="text-3xl font-medium">Server Unavailable</h1>
            <p className="mb-6">
                Your request took too long. Please&nbsp;try again in a moment.
            </p>
            <Link
                href="/"
            >
                <ButtonWithLoader
                    isLoading={loading}
                    onClick={() => setLoading(true)}
                >
                    Retry
                </ButtonWithLoader>
            </Link>
        </div>
    );
}