'use client'
import { ButtonWithLoader } from "@/components/ui/button-with-loader"
import { useState } from "react";


export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const [loading, setLoading] = useState(false);
    const handleReset = () => {
        reset()
        setLoading(true)
    }
    return (
        <html>
            <body className="relative flex flex-col items-center justify-center h-screen text-center px-4">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Something went wrong!</h2>
                    <p className="text-muted-foreground max-w-md">{error.message}</p>
                    <ButtonWithLoader className="h-[42px]" isLoading={loading} onClick={handleReset}>Try again</ButtonWithLoader>
                </div>
            </body>
        </html>
    )
}