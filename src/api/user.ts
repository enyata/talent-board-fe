
"use server";

import { cookies } from "next/headers";
import { env } from "@/lib/env";
import { withTimeout} from "@/lib/withTimeout";
export async function getUser(timeoutMs = 30_000) {
  const cookieStore   = await cookies();
  const refreshToken  = cookieStore.get("refresh_token");
  const accessToken   = cookieStore.get("access_token");

  if (!refreshToken) return null; 


  const fetchCall = (signal: AbortSignal) =>
    fetch(`${env("apiUrl")}/api/v1/users/me`, {
      headers: {
        Authorization:       `Bearer ${accessToken?.value ?? ""}`,
        "x-refresh-token":   refreshToken.value,
      },
      credentials: "include",
      signal,
    });

  const res = await withTimeout(fetchCall, timeoutMs);

  if (!res.ok) return null;
  return res.json();
}
