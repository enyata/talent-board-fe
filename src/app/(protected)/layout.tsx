import React from 'react';
import ProtectedHeader from './components/header';
import { redirect } from 'next/navigation';
import { getUser } from '@/api/user';
import { AuthHydrator } from '@/components/authHydrator';
import { GET } from '@/lib/requests';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getUser();
    if (!user) {
        redirect('/login');
    }

    return (
        <div>
            <AuthHydrator user={user} />
            <ProtectedHeader />
            <div className='mx-auto w-full md:max-w-[951px]'>
                {children}
            </div>
        </div>
    );
};

export default ProtectedLayout;
