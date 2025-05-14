'use client';
import React from 'react'
import TalentDashboard from './components/talentDashboard'
import { useAuthStore } from '@/store/authStore'
import RecruiterDashboard from './components/recruiterDashboard'

const DashboardPage = () => {
    const { user } = useAuthStore()
    return (
        <div className='md:mt-[64px] w-full px-4'>
            <div className='flex justify-between'>
                <span className='font-semibold text-[24px] hidden md:block'>Dashboard</span>
                {/* <Link href={'/profile'}>
                    <Button className='font-medium text-[14px] text-[#404D61] cursor-pointer flex items-center gap-2' variant={'outline'}>
                        <span><PencilLine /></span>
                        <span>Edit Profile</span>
                    </Button>
                </Link> */}
            </div>
            {user?.role === 'talent' ?
                <TalentDashboard /> :
                <RecruiterDashboard />
            }
        </div>

    )
}

export default DashboardPage
