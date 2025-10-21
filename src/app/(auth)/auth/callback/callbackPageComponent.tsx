'use client';


import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from '@/components/ui/loader';

export default function AuthCallbackPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (!accessToken || !refreshToken) {
      router.replace('/login');
      return;
    }
    // const appEnv = env('appEnv') ?? 'production';
    // if (appEnv === 'local') {
    //   router.replace(
    //     `/api/auth/finalize?access_token=${accessToken}&refresh_token=${refreshToken}`
    //   );
    // } 

      router.replace(
        `/auth/finalize/client?access_token=${accessToken}&refresh_token=${refreshToken}`
      );
    
  }, [searchParams, router]);

  return <Loader className="text-primary shadow-none size-[40px]" />;
}


