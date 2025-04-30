import { Button } from '@/components/ui/button'
import { PencilLine } from 'lucide-react'
import React from 'react'
import DashboardOverview from './components/overview'

const DashboardPage = () => {
    return (
        <div className='mt-[64px] w-full'>
            <div className='flex justify-between'>
                <span className='font-semibold text-[24px]'>Dashboard</span>
                <Button className='font-medium text-[14px] text-[#404D61] cursor-pointer flex items-center gap-2' variant={'outline'}>
                    <span><PencilLine /></span>
                    <span>Edit Profile</span>
                </Button>
            </div>
            <DashboardOverview />
        </div>
    )
}

export default DashboardPage
