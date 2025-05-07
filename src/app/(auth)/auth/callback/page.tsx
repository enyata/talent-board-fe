import { redirect } from "next/navigation";

interface CallbackPageProps {
  searchParams: {
    access_token?: string;
    refresh_token?: string;
  };
}

export default function AuthCallbackPage({ searchParams }: CallbackPageProps) {
  const accessToken = searchParams.access_token;
  const refreshToken = searchParams.refresh_token;

  // If no token, redirect to login or 404
  if (!accessToken) {
    redirect("/login"); // or redirect("/not-found")
  }

  // Redirect to finalize page to store token in client and fetch user
  redirect(`/auth/finalize?access_token=${accessToken}&refresh_token=${refreshToken}`); 
}
