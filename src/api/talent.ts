
"use server";
import { env } from "@/lib/env";
import { withTimeout } from "@/lib/withTimeout";

export const fetchTopTalents = async (timeoutMs = 30_000) => {
    const fetchCall = (signal: AbortSignal) =>
        fetch(`${env("apiUrl")}/api/v1/talents/top`, {
            signal,
        });

    const res = await withTimeout(fetchCall, timeoutMs);
    if (!res.ok) throw new Error('Failed to fetch top talents');
    return res.json();
};