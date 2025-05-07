import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/dashboard", "/profile", "/talents", "/settings"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  const isAuth = !!accessToken || !!refreshToken;

  if (isProtected && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Optional: Validate the access token by pinging your backend `/me` route
  // NOTE: This only works if backend supports token check via header
  if (accessToken) {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (err) {
      console.error("Token validation failed", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/profile/:path*", "/talents/:path*"],
};
