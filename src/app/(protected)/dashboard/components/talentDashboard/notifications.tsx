import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const Notifications = () => {
    return (
        <Card className='shadow-none outline-px bg-[#fafafa] w-full mt-4'>
            <div className='px-[16px] '>
                <div className='flex justify-between items-center'>
                    <div className='text-[#475467] text-[14px]'>
                        <p className='font-semibold'>New Notifications</p>
                        <p>You have 3 unread messages from recruiters</p>
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
            </div>

        </Card>
    )
}

export default Notifications
