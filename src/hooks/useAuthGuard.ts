
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
import API from '@/lib/axiosInstance';

export const useAuthGuard = () => {
  const router = useRouter();
  const { accessToken, setAccessToken, setUser, resetAuth } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      if (!accessToken) {
        try {
          const res = await API.get('/api/v1/users/me');
          setAccessToken(res.headers['x-access-token']);
          setUser(res.data);
        } catch {
          resetAuth();
          router.replace('/login');
        }
      }
    };
    init();
  }, [accessToken, setAccessToken, setUser, resetAuth, router]);
};
