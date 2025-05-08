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

  if (!accessToken) {
    redirect("/login"); 
  }

  redirect(`/auth/finalize?access_token=${accessToken}&refresh_token=${refreshToken}`); 
}
