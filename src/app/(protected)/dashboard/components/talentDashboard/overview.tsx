'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { getTimeOfDay } from '@/lib/dateAndTimeUtils'
import { useAuthStore } from '@/store/authStore'
import { TalentDashboardData } from '@/types/dashboard'
import Image from 'next/image'


const DashboardOverview = ({ data }: { data: TalentDashboardData | undefined }) => {
    const {profile_views, recruiter_saves, total_upvotes} = data || {}
    const overviewCardDetails = [
        {
            title: 'Total Upvotes',
            number: total_upvotes,
            icon: '/assets/icons/loyalty-card.svg'
        },
        {
            title: 'Profile Views',
            number: profile_views,
            icon: '/assets/icons/user-story.svg'
        },
        {
            title: 'Recruiter Saves',
            number: recruiter_saves,
            icon: '/assets/icons/bookmark.svg'
        }
    ];
    const { user } = useAuthStore()

    return (
        <Card className='shadow-none outline-px md:mt-[36px] mt-[16px] bg-[#fafafa]'>
            <div className='px-[16px]'>
                <div className='flex flex-col md:flex-row justify-between md:items-center'>
                    <div className='flex items-center gap-2'>
                        <Avatar className='size-[64px] border-[2px] border-[#E0E0E0]'>
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback>{user ? user.first_name.trim().charAt(0).toUpperCase() : ''}</AvatarFallback>
                        </Avatar>
                        <div className='text-[#3A374B] flex flex-col'>
                            <span className='font-bold text-[20px]'>{user?.first_name} {user?.last_name}</span>
                            <span className='text-[14px] font-medium text-[#475467]'><span className='capitalize'>{getTimeOfDay()}</span> is here! Ready to wrap up your day. 🌇</span>
                        </div>
                    </div>
                </div>
                <div className='mt-4 flex flex-col md:flex-row justify-between items-center gap-4'>
                    {overviewCardDetails.map((card, index) =>
                        <div key={index} className='text-[14px] font-semibold flex flex-row w-full justify-between items-center text-[#727272] bg-white rounded-lg border-[1px] p-5'>
                            <div className='flex items-center p-[20px gap-3'>
                                <span className='rounded-sm size-[40px] flex items-center justify-center bg-[#F2F2F2] border-[1px] border-[#E4E4E4]'>
                                    <Image
                                        src={card.icon}
                                        alt='icon'
                                        height={24}
                                        width={24}
                                    />
                                </span>
                                <span>
                                    {card.title}
                                </span>
                            </div>
                            <span className='text-[#09090B] text-[20px] font-bold'>{card.number}</span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}

export default DashboardOverview