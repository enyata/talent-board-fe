import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const isAuth = !!token;
    const { pathname } = request.nextUrl;

    const protectedPaths = ["/dashboard", "/profile", "/talents", "/settings", "/onboard"]; //add "/onboard"
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtected && !isAuth) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/onboard", "/dashboard/:path*", "/settings/:path*", "/profile/:path*", "/talents/:path*",] // add "/onboard"
};
