import { getUser } from '@/api/user';
import Navbar from '@/components/navbar'
import { RequestTimeoutError } from '@/lib/withTimeout';
import { redirect } from 'next/navigation';
import React from 'react';
import Timeout from '../time-out';
import { cookies } from 'next/headers';
import { AuthHydrator } from '@/components/authHydrator';

const WebsiteLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token");
    let userData;
    try {
        userData = await getUser();
    } catch (err) {
        if (err instanceof RequestTimeoutError) {
            return (<Timeout />)
        }
        console.error("User fetch failed:", err);
        redirect("/");
    }
    if (userData) {
        redirect("/dashboard");
    }
    return (
        <AuthHydrator user={userData?.data?.user} refreshToken={refreshToken?.value}>
            <div className='w-full'>
                <Navbar />
                <div className='md:mt-[140px] mt-[40px]'>
                    {children}
                </div>
            </div>
        </AuthHydrator>
    )
}

export default WebsiteLayout
