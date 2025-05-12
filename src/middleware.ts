import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get("refresh_token")?.value;
    const { pathname } = request.nextUrl;

    const protectedPaths = ["/dashboard", "/profile", "/settings", "onboard"];
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtected && !refreshToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/onboard/:path*",]
};