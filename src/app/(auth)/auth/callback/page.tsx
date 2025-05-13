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
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { env } from '@/lib/env';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (!accessToken || !refreshToken) {
      router.replace('/login');
      return;
    }

    console.log('refresh token at callback', refreshToken);
    console.log('access token at callback', accessToken);

    if (env('appEnv') === 'local') {
      router.replace(
        `/api/auth/finalize?access_token=${accessToken}&refresh_token=${refreshToken}`
      );
    } else {
      router.replace(
        `/auth/finalize/client?access_token=${accessToken}&refresh_token=${refreshToken}`
      );
    }
  }, [searchParams, router]);

  return null;
}


