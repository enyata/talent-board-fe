"use client";

import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <div className="flex flex-col items-center gap-4">
                <ShieldAlert className="w-16 h-16 text-destructive" />
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    401 - Unauthorized
                </h1>
                <p className="text-muted-foreground max-w-md">
                    You don’t have permission to access this page. Please login with the correct account or return to a safe page.
                </p>

                <div className="flex gap-3">
                    <Link href="/login">
                        <Button className="h-[42px]">Go to Login</Button>
                    </Link>
                    <Link href="/">
                        <Button className="h-[42px]" variant="outline">Go Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
