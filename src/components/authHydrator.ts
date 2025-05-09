'use client';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export function AuthHydrator({ user }: { user: any }) {
    const setUser = useAuthStore((s) => s.setUser);

    useEffect(() => {
        setUser(user);
    }, [user]);

    return null;
}
