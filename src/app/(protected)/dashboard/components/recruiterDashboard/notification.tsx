import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { timeAgo } from '@/lib/timeStampFormatter'
import { NotificationData, TalentDashboardData } from '@/types/dashboard'
import Image from 'next/image'
import React from 'react'


const Notifications = ({ data }: { data: TalentDashboardData | undefined }) => {
    const notifications = data?.notifications ?? []
    return (
        <Card className='shadow-none outline-px bg-[#fafafa] w-full mt-4 text-[#101828] max-h-[500px] overflow-scroll'>
            <div className='px-[16px] '>
                <div className='flex justify-between items-center'>
                    <div className=''>
                        <p className='font-semibold'>New Notifications</p>
                        <p className='text-[14px]'>You have {notifications.length} unread messages from recruiters</p>
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
                            <div key={item.id} className='flex gap-2 text-[#727272] text-[14px]'>
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
                                <p className='mt-3 w-full ml-auto max-w-[795px] text-[13px]'>
                                    {timeAgo(item.timestamp)}
                                </p>
                            </div>
                        )}

                </div >
            </div >

        </Card >
    )
}

// function AvatarDisplay({ talents }: { talents: { id: number, display_photo: string, first_name: string }[] }) {
//     return (
//         <div className="inline-flex items-center ml-1.5">
//             {talents
//                 ?.filter((_, index) => index < 3)
//                 .map((talent, index) => (
//                     <Avatar
//                         key={index}
//                         className="-ml-1.5 relative border-[1px] border-white"
//                     >
//                         <AvatarImage src={talent.display_photo} />
//                         <AvatarFallback className="text-xs">
//                             {talent.first_name?.[0]?.toUpperCase()}
//                         </AvatarFallback>
//                     </Avatar>
//                 ))}
//         </div>
//     );
// }

//NOTIFICATION TYPES

{/* <Card className='relative bg-red w-full text-[#727272] gap-0 text-[14px] p-[16px] bg-white shadow-none'>
<span className='absolute top-4 right-2'><EllipsisVertical size={'16px'} /></span>
<div className='flex gap-4'>
    <span className='bg-[#4976F4] size-[10px] rounded-full'></span>
    <div>
        <div className=' flex gap-2 items-center'>
            <Avatar className='size-6'>
                <AvatarImage src='https://github.com/shadcn.png' sizes='24px' />
                <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <div className=''>
                <span className='font-medium'>Elsa Wright</span> <span>Accepted Your Connection Request</span>
            </div>
        </div>
        <p className='mt-3 w-full text-[13px] text-gray-300'>
            Yesterday
        </p>
    </div>
</div>

</Card> */}


export default Notifications
