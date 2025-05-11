import React from 'react';
import ProtectedHeader from './components/header';
import { redirect } from 'next/navigation';
import { getUser } from '@/api/user';
import { AuthHydrator } from '@/components/authHydrator';
;

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getUser();
    console.log('user at layout of protected', user)
    if (!user) {
        redirect('/login');
    }

    return (
        <div>
            <AuthHydrator user={user.data.user}>
                <ProtectedHeader />
                <div className='mx-auto w-full md:max-w-[951px]'>
                    {children}
                </div>
            </AuthHydrator>
        </div>
    );
};

export default ProtectedLayout;
