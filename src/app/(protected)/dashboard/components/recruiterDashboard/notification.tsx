import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { EllipsisVertical } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const talents = [
    {
        id: 1,
        display_photo: 'https://github.com/shadcn.png',
        first_name: 'Elva'
    },
    {
        id: 2,
        display_photo: 'https://github.com/shadcn.png',
        first_name: 'Ruth'
    },
    {
        id: 3,
        display_photo: 'https://github.com/shadcn.png',
        first_name: 'Enoch'
    }, {
        id: 4,
        display_photo: '',
        first_name: 'David'
    }, {
        id: 5,
        display_photo: 'https://github.com/shadcn.png',
        first_name: 'Jeremiah'
    }
]

const Notifications = () => {
    return (
        <Card className='shadow-none outline-px bg-[#fafafa] w-full mt-4 text-[#101828]'>
            <div className='px-[16px] '>
                <div className='flex justify-between items-center'>
                    <div className=''>
                        <p className='font-semibold'>New Notifications</p>
                        <p className='text-[14px]'>You have 3 unread messages from recruiters</p>
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

                    <Card className='relative bg-red w-full text-[#727272] gap-0 text-[14px] p-[16px] bg-white shadow-none'>
                        <span className='absolute top-4 right-2'><EllipsisVertical size={'16px'} /></span>
                        <div className='flex gap-4'>
                            <span className='bg-[#4976F4] size-[10px] rounded-full'></span>
                            <div>
                                <div className=''>
                                    <p>
                                        New talents matching your interests have just joined! 🔥 Check them out.
                                    </p>
                                    {/* AVATAR GROUP */}
                                    <div className='mt-3 relative'>
                                        <AvatarDisplay talents={talents} />
                                        {talents.length > 3 && (
                                            <span className="absolute inline-flex justify-center items-center rounded-full bg-white border-[1px] border-[#4976F4] text-[12px] text-grey-40 size-[32px] -ml-1.5">
                                                +{talents.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className='mt-3 w-full text-[13px] text-gray-300'>
                                    3 hours ago
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className='relative bg-red w-full text-[#727272] gap-0 text-[14px] p-[16px] bg-white shadow-none'>
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

                    </Card>

                </div>
            </div>

        </Card>
    )
}

function AvatarDisplay({ talents }: { talents: { id: number, display_photo: string, first_name: string }[] }) {
    return (
        <div className="inline-flex items-center ml-1.5">
            {talents
                ?.filter((_, index) => index < 3)
                .map((talent, index) => (
                    <Avatar
                        key={index}
                        className="-ml-1.5 relative border-[1px] border-white"
                    >
                        <AvatarImage src={talent.display_photo} />
                        <AvatarFallback className="text-xs">
                            {talent.first_name?.[0]?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                ))}
        </div>
    );
}

export default Notifications
