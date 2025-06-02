'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link';
import React from 'react'

const Prompt = () => {
    const { user } = useAuthStore()
    return (
        <Card className='shadow-none outline-px md:mt-[36px] mt-[16px] bg-[#fafafa]'>
            <div className='px-[16px]'>
                <div className='flex flex-col md:flex-row justify-between md:items-center'>
                    <div className='flex items-center gap-2'>
                        <Avatar className='size-[64px] border-[2px] border-[#E0E0E0]'>
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback>{user?.first_name.trim().charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className='text-[#3A374B] flex flex-col'>
                            <span className='font-bold text-[20px]'>Hi {user?.first_name}</span>
                            <span className='text-[14px] font-medium text-[#475467]'>Ready to find your next great hire?</span>
                        </div>
                    </div>
                    <Link href={'/talents'} className='mt-4 md:mt-0'>
                        <Button className='font-semibold cursor-pointer w-full'>
                            Search Talents
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    )
}

export default Prompt
