'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { timeAgo } from '@/lib/timeStampFormatter'
import { useAuthStore } from '@/store/authStore';
import { NotificationData, TalentDashboardData } from '@/types/dashboard'
import { ChevronUp, MapPinned } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Notifications = ({ data }: { data: TalentDashboardData | undefined }) => {
    const { user } = useAuthStore()
    const notifications = data?.notifications ?? []
    console.log('notifications', notifications)
    return (
        <Card className='shadow-none outline-px bg-[#fafafa] w-full mt-4 max-h-[500px] overflow-scroll'>
            <div className='px-[16px] '>
                <div className='flex justify-between items-center'>
                    <div className='text-[#475467] text-[14px]'>
                        <p className='font-semibold'>New Notifications</p>
                        <p>You have {notifications.length} unread messages from recruiters</p>
                    </div>
                    <span className='rounded-lg size-[40px] flex items-center justify-center border-[1px] border-[#E4E4E4]'>
                        <Image
                            src={'/assets/icons/notification.svg'}
                            alt='icon'
                            height={21}
                            width={19}
                        />
                    </span>
                </div>
                {/* EACH NOTIFICATION */}
                <div className='flex flex-col gap-[12px] mt-[24px]'>

                    {notifications && notifications?.length === 0 ? (
                        <Card className='bg-white shadow-none p-[16px] text-[#727272] text-[14px]'>
                            <p className='text-center'>You have no new notifications</p>
                        </Card>
                    ) :
                        (notifications).map((item: NotificationData) =>
                            <Card key={item.id} className='relative w-full text-[#727272] gap-0 text-[14px] p-[16px] bg-white shadow-none'>
                                <div className='flex gap-2'>
                                    <div className=' flex gap-2 items-center'>
                                        <span className='bg-[#4976F4] size-[10px] rounded-full'></span>
                                        <Avatar>
                                            <AvatarImage src={item.sender.avatar} sizes='32px' />
                                            <AvatarFallback>{item.sender.name.trim().charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div>
                                        <span className='font-medium'>{item?.message?.split(" ").slice(0, 2).join(" ")}</span> <span>{item?.message?.split(" ").slice(2).join(" ")}</span>
                                    </div>
                                </div>
                                <div className='relative'>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-100" />
                                    <Card className=' ml-auto max-w-[795px] w-full  p-[16px] rounded-[12px] shadow-none'>
                                        <div>
                                            <div className='flex flex-col md:flex-row justify-between md:items-center'>
                                                <div className='flex gap-2 items-center'>
                                                    <Avatar className='size-[48px]'>
                                                        <AvatarImage src={user?.avatar} />
                                                        <AvatarFallback>{user?.first_name.trim().charAt(0).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className='font-semibold text-[14px]'>{user?.first_name} {user?.last_name}</p>
                                                        <p className='font-medium text-[#5F5F5F] text-[13px]'>Senior Frontend Developer</p>
                                                    </div>
                                                </div>
                                                <Button variant={'outline'} className=' mt-2 md:mt-0 h-[32px] max-w-[110px] md:max-w-full text-[#5F5F5F] rounded-[3px] text-[12px] flex gap-2'>
                                                    <span><ChevronUp size={14} strokeWidth={3} /></span>
                                                    <span>{data?.total_upvotes}</span>
                                                    <span className='font-medium'></span>
                                                </Button>
                                            </div>
                                            <div className='flex items-center gap-1 text-[#5F5F5F] font-medium text-[13px] mt-[24px]'>
                                                <span><MapPinned size={14} strokeWidth={3} /></span>
                                                <p>Abuja</p>
                                            </div>
                                            <p className='mt-[8px] text-[13px] text-[#5F5F5F]'>Passionate frontend developer with expertise in building responsive and accessible web applications.
                                                Focused on user experience and performance optimization.
                                            </p>
                                            <div className='mt-[16px] flex gap-2 flex-wrap'>
                                                {['🔧 JavaScript', '⚡ Next.js', '📱 React Native'].map((skill, index) =>
                                                    <Button key={index} className='bg-[#F5F5F5] text-[#5F5F5F] h-[24px] rounded-[2px] p-[6px] text-[12px]'>
                                                        {skill}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <p className='mt-3 w-full ml-auto max-w-[795px] text-[13px]'>
                                    {timeAgo(item.timestamp)}
                                </p>
                            </Card>
                        )
                    }
                </div>
            </div>

        </Card>
    )
}

export default Notifications
