// import { env } from "@/lib/env";
// import { redirect } from "next/navigation";

// interface CallbackPageProps {
//   searchParams: {
//     access_token?: string;
//     refresh_token?: string;
//   };
// }

// export default function AuthCallbackPage({ searchParams }: CallbackPageProps) {
//   const accessToken = searchParams.access_token;
//   const refreshToken = searchParams.refresh_token;

//   if (!accessToken || !refreshToken) {
//     redirect("/login");
//   }
//   console.log('refresh token at callback', refreshToken)
//   console.log('access token at callback', accessToken)

//   if (env("appEnv") === 'local') {
//     redirect(`/api/auth/finalize?access_token=${accessToken}&refresh_token=${refreshToken}`);
//   } else {
//     redirect(`/auth/finalize/client?access_token=${accessToken}&refresh_token=${refreshToken}`);
//   }

// }
import { env } from "@/lib/env";
import { redirect } from "next/navigation";

interface CallbackPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function AuthCallbackPage({ searchParams }: CallbackPageProps) {
  const accessToken = searchParams.access_token as string | undefined;
  const refreshToken = searchParams.refresh_token as string | undefined;

  if (!accessToken || !refreshToken) {
    redirect("/login");
  }

  console.log("refresh token at callback", refreshToken);
  console.log("access token at callback", accessToken);

  if (env("appEnv") === "local") {
    redirect(
      `/api/auth/finalize?access_token=${accessToken}&refresh_token=${refreshToken}`
    );
  } else {
    redirect(
      `/auth/finalize/client?access_token=${accessToken}&refresh_token=${refreshToken}`
    );
  }
}

