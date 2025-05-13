'use client';
import { Button } from '@/components/ui/button'
import { PencilLine } from 'lucide-react'
import React from 'react'
import TalentDashboard from './components/talentDashboard'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import RecruiterDashboard from './components/recruiterDashboard'

const DashboardPage = () => {
    const { user } = useAuthStore()
    return (
        <div className='mt-[64px] w-full'>
            <div className='flex justify-between'>
                <span className='font-semibold text-[24px]'>Dashboard</span>
                <Link href={'/profile'}>
                    <Button className='font-medium text-[14px] text-[#404D61] cursor-pointer flex items-center gap-2' variant={'outline'}>
                        <span><PencilLine /></span>
                        <span>Edit Profile</span>
                    </Button>
                </Link>
            </div>
            {user?.role === 'talent' ?
                <TalentDashboard /> :
                <RecruiterDashboard />
            }
        </div>

    )
}

export default DashboardPage
