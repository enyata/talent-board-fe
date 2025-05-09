'use client'
import React, { useEffect } from 'react'
import OnboardingFlow from './components'
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Onboard = () => {
    const { fetchUser } = useAuth();
    const router = useRouter();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await fetchUser();
                console.log("User fetched:", user);
                if (!user) {
                    router.replace('/login')
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                router.replace('/login');
            }
        };
        fetchUserData();

    }, [])

    return (
        <div className='w-full mx-auto'>
            <OnboardingFlow />
        </div>
    )
}

export default Onboard
