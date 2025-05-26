import { getUser } from '@/api/user';
import Navbar from '@/components/navbar'
import { RequestTimeoutError } from '@/lib/withTimeout';
import { redirect } from 'next/navigation';
import React from 'react';
import Timeout from '../time-out';

const WebsiteLayout = async ({ children }: { children: React.ReactNode }) => {
    let userData;
    try {
        userData = await getUser();
    } catch (err) {
        if (err instanceof RequestTimeoutError) {
            return(<Timeout/>)
        }
        console.error("User fetch failed:", err);
        redirect("/");
    }
    if (userData) {
        redirect("/dashboard");
    }
    return (
        <div className='w-full'>
            <Navbar />
            <div className='md:mt-[140px] mt-[40px]'>
                {children}
            </div>
        </div>
    )
}

export default WebsiteLayout
