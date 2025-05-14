import React from 'react';
import ProtectedHeader from './components/header';
import { redirect } from 'next/navigation';
import { getUser } from '@/api/user';
import { AuthHydrator } from '@/components/authHydrator';
import ProtectedFragment from './components/protected-fragment';
import { cookies } from "next/headers";


const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token");
    const user = await getUser();
    console.log('refresh token at layout of protected', refreshToken)
    if (!user) {
        console.log('no user at protected')
        redirect('/login');
    }
    if (user.data.user.profile_completed === false) {
        redirect('/onboard');
    }

    return (
        <ProtectedFragment>
            <AuthHydrator user={user.data.user} refreshToken={refreshToken?.value}>
                <ProtectedHeader />
                <div className='mx-auto w-full md:max-w-[951px] mt-[120px]'>
                    {children}
                </div>
            </AuthHydrator>
        </ProtectedFragment>
    );
};

export default ProtectedLayout;
