import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const accessToken = req.nextUrl.searchParams.get("access_token");
    const refreshToken = req.nextUrl.searchParams.get("refresh_token");

    if (!accessToken || !refreshToken) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const cookieStore = await cookies();

    cookieStore.set({
        name: "access_token",
        value: accessToken,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
    });

    cookieStore.set({
        name: "refresh_token",
        value: refreshToken,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
    });

    return NextResponse.redirect(new URL(`/auth/finalize/client?access_token=${accessToken}&refresh_token=${refreshToken}`, req.url));
}
