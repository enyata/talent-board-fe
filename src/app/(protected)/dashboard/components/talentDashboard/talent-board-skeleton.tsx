'use client'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function TalentDashboardSkeleton() {
    return (
        <div>
            {/* Header Card */}
            <Card className='shadow-none md:mt-[36px] mt-[16px]'>
                <div className='px-[16px]'>
                    <div className='flex flex-col md:flex-row justify-between md:items-center'>
                        <div className='flex items-center gap-2'>
                            <Skeleton className='size-[64px] rounded-full' />
                            <div className=' flex flex-col'>
                                <Skeleton className='h-[20px] w-[160px] mb-2' />
                                <Skeleton className='h-[16px] w-[240px]' />
                            </div>
                        </div>
                        <Skeleton className='h-[34px] w-[160px] rounded-md mt-2 md:mt-0' />
                    </div>

                    {/* Overview Cards */}
                    <div className='mt-4 flex flex-col md:flex-row justify-between items-center gap-4'>
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className='h-[96px] w-full rounded-lg' />
                        ))}
                    </div>
                </div>
            </Card>

            {/* Quick Insights */}
            <Card className='mt-[24px] shadow-none'>
                <Skeleton className='h-[16px] w-[120px]' />
                <div className='mt-[12px] flex flex-col md:flex-row gap-3'>
                    {[...Array(2)].map((_, i) => (
                        <Card
                            key={i}
                            className='shadow-none border-none w-full h-[92px] flex items-center px-[16px]'
                        >
                            <div className='flex justify-between items-center w-full'>
                                <div className='space-y-2'>
                                    <Skeleton className='h-[16px] w-[120px]' />
                                    <Skeleton className='h-[14px] w-[200px]' />
                                </div>
                                <Skeleton className='h-[52px] w-[33px]' />
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>

            {/* Notifications */}
            <Card className='shadow-none w-full mt-4'>
                <div className='px-[16px]'>
                    <div className='flex justify-between items-center'>
                        <div className='text-[#475467] text-[14px]'>
                            <Skeleton className='h-[16px] w-[140px] mb-2' />
                            <Skeleton className='h-[14px] w-[220px]' />
                        </div>
                        <Skeleton className='rounded-lg size-[40px]' />
                    </div>

                    <div className='flex flex-col gap-[12px] mt-[24px]'>
                        {[1, 2].map((item) => (
                            <Card
                                key={item}
                                className=' border-none shadow-none p-[16px] text-[14px]'
                            >
                                <div className='flex gap-2 items-center'>
                                    <Skeleton className='size-[64px] rounded-full' />
                                    <Skeleton className='h-[14px] w-[220px]' />
                                </div>

                                {/* Nested Card inside Notification */}
                                <div className='mt-[12px]'>
                                    <Card className='p-[16px] border-none shadow-none rounded-[12px]'>
                                        <div className='flex justify-between items-start flex-col md:flex-row'>
                                            <div className='flex gap-2 items-center'>
                                                <Skeleton className='size-[48px] rounded-full' />
                                                <div>
                                                    <Skeleton className='h-[14px] w-[120px] mb-1' />
                                                    <Skeleton className='h-[13px] w-[160px]' />
                                                </div>
                                            </div>
                                            <Skeleton className='h-[32px] w-[110px] mt-4 md:mt-0' />
                                        </div>

                                        <div className='flex items-center gap-1 mt-[24px]'>
                                            <Skeleton className='h-[13px] w-[120px]' />
                                        </div>

                                        <Skeleton className='h-[40px] w-full mt-2' />

                                        <div className='mt-[16px] flex gap-2 flex-wrap'>
                                            {[...Array(3)].map((_, i) => (
                                                <Skeleton
                                                    key={i}
                                                    className='h-[24px] w-[90px] rounded-[2px]'
                                                />
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                                <Skeleton className='h-[13px] w-[100px] mt-3 ml-auto' />
                            </Card>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    )
}
