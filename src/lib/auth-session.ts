"use client";

import { useAuthStore } from "@/store/authStore";
import { storeToken } from "./store-token";

type Tokens = { access_token: string; refresh_token: string };

/**
 * Starts a session after login, email verification or OAuth: keeps the tokens
 * in memory for API calls and has the server set them as HttpOnly cookies
 * (sent in a POST body, never a URL).
 */
export async function startSession(tokens: Tokens) {
  const { setAccessToken, setRefreshToken } = useAuthStore.getState();
  setAccessToken(tokens.access_token);
  setRefreshToken(tokens.refresh_token);
  await storeToken(tokens);
}

/**
 * Reads OAuth tokens from the callback URL, then immediately scrubs them from
 * the address bar and history. Accepts the fragment (#access_token=…), which
 * never reaches servers or logs, as well as the query string the backend uses
 * today.
 */
export function takeTokensFromUrl(): Tokens | null {
  const url = new URL(window.location.href);
  const hash = new URLSearchParams(url.hash.slice(1));
  const read = (key: string) => hash.get(key) ?? url.searchParams.get(key);

  const access_token = read("access_token");
  const refresh_token = read("refresh_token");

  url.searchParams.delete("access_token");
  url.searchParams.delete("refresh_token");
  url.hash = "";
  window.history.replaceState(null, "", url.pathname + url.search);

  return access_token && refresh_token ? { access_token, refresh_token } : null;
}
