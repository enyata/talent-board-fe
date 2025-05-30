import React from 'react';
import ProtectedHeader from './components/header';
import { redirect } from 'next/navigation';
import { getUser } from '@/api/user';
import { AuthHydrator } from '@/components/authHydrator';
import ProtectedFragment from './components/protected-fragment';
import { cookies } from "next/headers";
import { RequestTimeoutError } from '@/lib/withTimeout';
import Timeout from '../time-out';


const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token");
    const accessToken = cookieStore.get("access_token");
    console.log('refresh token at layout of protected', refreshToken)

    let userData;
    try {
        userData = await getUser();
    } catch (err) {
        if (err instanceof RequestTimeoutError) {
            return (<Timeout />)
        }
        console.error("User fetch failed:", err);
        redirect("/login");
    }
    if (!userData) {
        redirect("/login");
    }
    if (userData.data.user.profile_completed === false) {
        redirect('/onboard');
    }

    return (
        <ProtectedFragment>
            <AuthHydrator user={userData?.data?.user} accessToken={accessToken?.value} refreshToken={refreshToken?.value}>
                <ProtectedHeader />
                <div className='mx-auto w-full md:max-w-[951px] mt-[120px] pb-[64px]'>
                    {children}
                </div>
            </AuthHydrator>
        </ProtectedFragment>
    );
};

export default ProtectedLayout;
