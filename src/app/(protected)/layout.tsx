import React from 'react'
import ProtectedHeader from './components/header'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthHydrator } from '@/components/authHydrator';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')

    const hasCookie = cookieStore.has('refresh_token')
    console.log('Refresh token:', hasCookie);

    if (!refreshToken) {
        redirect('/login');
    }
    const res = await fetch(`${process.env.API_URL}/api/v1/users/me`, {
        headers: {
            cookie: `refresh_token=${refreshToken.value}`,
        },
        credentials: 'include',
    });

    if (res.status !== 200) {
        redirect('/login');
    }

    const user = await res.json();
    return (
        <div>
            <AuthHydrator user={user} />
            <ProtectedHeader />
            <div className='mx-auto w-full md:max-w-[951px]'>
                {children}
            </div>
        </div>
    )
}

export default ProtectedLayout
