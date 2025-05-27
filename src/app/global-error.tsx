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
                <div className="flex flec-col gap-2 justify-center items-center">
                    <h2 className="font-medium text-3xl">Something went wrong!</h2>
                    <p>{error.message}</p>
                    <ButtonWithLoader isLoading={loading} onClick={handleReset}>Try again</ButtonWithLoader>
                </div>
            </body>
        </html>
    )
}