"use server";

import { cookies } from "next/headers";

interface StoreTokenRequest {
  access_token: string;
  refresh_token: string;
}

// HttpOnly so page scripts can't read the cookies; the server layouts read
// them and hand the values to AuthHydrator for API calls. "lax" (not "strict")
// so following a link into the app from an email or another site keeps the
// session. Secure everywhere except plain-http local dev.
const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
} as const;

export async function storeToken(request: StoreTokenRequest) {
  const cookieStore = await cookies();
  cookieStore.set({ name: "access_token", value: request.access_token, ...cookieOptions });
  cookieStore.set({ name: "refresh_token", value: request.refresh_token, ...cookieOptions });
}

export async function clearTokens() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: "access_token", path: "/" });
  cookieStore.delete({ name: "refresh_token", path: "/" });
}
