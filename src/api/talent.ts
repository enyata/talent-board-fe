import { env } from "@/lib/env";

export const fetchTopTalents = async () => {
    const res = await fetch(`${env("apiUrl")}/api/v1/talents/top`);
    if (!res.ok) throw new Error('Failed to fetch top talents');
    return res.json();
};