import Link from "next/link";

export default function TimeoutPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-3xl font-bold mb-4">Server is busy</h1>
            <p className="mb-6">
                Your request took too long. Please&nbsp;try again in a moment.
            </p>
            <Link
                href="/"
                className="rounded-md bg-primary px-4 py-2 font-medium text-white"
            >
                Retry
            </Link>
        </div>
    );
}