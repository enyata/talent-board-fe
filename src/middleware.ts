import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that need a session. Keep in sync with `config.matcher` below
// (Next requires the matcher to be a static literal).
export const PROTECTED_PATHS = ["/dashboard", "/profile", "/settings", "/onboard"];

/** True for a protected route or anything under it ("/dashboard", "/dashboard/x"), not "/dashboards". */
export function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (isProtectedPath(request.nextUrl.pathname) && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/onboard/:path*"],
};
