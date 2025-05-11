"use server"

import { cookies } from "next/headers"

interface StoreTokenRequest {
    access_token: string
    refresh_token: string
}

export async function storeToken(request: StoreTokenRequest) {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "access_token",
        value: request.access_token,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    })

    cookieStore.set({
        name: "refresh_token",
        value: request.refresh_token,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    })
}