import { getUser } from '@/api/user';
import Navbar from '@/components/navbar'
import { redirect } from 'next/navigation';
import React from 'react'

const WebsiteLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getUser();
    if (user) {
        redirect('/dashboard');
    }
    return (
        <div className='w-full'>
            <Navbar />
            <div className='md:mt-[170px] mt-[40px]'>
                {children}
            </div>
        </div>
    )
}

export default WebsiteLayout
