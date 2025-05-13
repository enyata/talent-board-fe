"use server";

import { env } from "@/lib/env";
import { cookies } from "next/headers";

export async function getUser() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token");
    const accessToken = cookieStore.get("access_token");
    console.log('All cookies at userCookies:', cookieStore.getAll())

    if (!refreshToken) return null;

    const res = await fetch(`${env("apiUrl")}/api/v1/users/me`, {
        headers: {
            Authorization: `Bearer ${accessToken?.value}`,
            'x-refresh-token': refreshToken?.value,
            // Cookie: `refresh_token=${refreshToken.value}`,
        },
        credentials: "include",
    });



    if (!res.ok) return null;

    const user = await res.json();
    return user;
}
