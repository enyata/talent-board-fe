import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ClockFading } from 'lucide-react'
import React from 'react'

const DashboardOverview = () => {
    return (
        <Card className='shadow-none outline-px mt-[36px] bg-[#fafafa] '>
            <div className='px-[16px]'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <Avatar className='size-[64px] border-[2px] border-[#E0E0E0]'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                        <div className='text-[#3A374B] flex flex-col'>
                            <span className='font-bold text-[20px]'>David Farotumi</span>
                            <span className='text-[14px] font-medium text-[#475467]'>Evening is here! Ready to wrap up your day. 🌇</span>
                        </div>
                    </div>
                    <Button className={`h-[34px] bg-[#F9F2E5] text-[#C99B00] border-[1px] border-[#C99B00]`}>
                        <span><ClockFading /></span>
                        <span className=''>Pending Approval</span>
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default DashboardOverview