import React from 'react'
import { Card } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Bookmark, ChevronUp, MapPinned, SquareArrowOutUpRightIcon } from 'lucide-react'

const TalentCard = () => {
    return (
        <Card className='max-w-[418px] w-full h-[291px] p-[20px] shadow-none'>
            <div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <Avatar className='size-[48px]'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='font-semibold text-[14px]'>Cameron Williamson</p>
                            <p className='font-medium text-[#5F5F5F] text-[13px]'>Senior Frontend Developer</p>
                        </div>
                    </div>
                    <Button variant={'outline'} className='w-[75px] h-[28px] text-[#5F5F5F] rounded-[2px]'>
                        Save <span><Bookmark /></span>
                    </Button>
                </div>
                <div className='flex items-center gap-1 text-[#5F5F5F] font-semibold text-[13px] mt-[24px]'>
                    <span><MapPinned size={14} strokeWidth={3} /></span>
                    <p>Abuja</p>
                </div>
                <p className='mt-[8px] font-semibold text-[13px] text-[#5F5F5F]'>Passionate frontend developer with expertise in building responsive and accessible web applications.
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
            <div className='border-t-[2px] pt-[8px] border-[#E3E3E3] flex justify-between text-[#5F5F5F] text-[12px]'>
                <div className='flex items-center font-semibold'>
                    46 <span className='ml-1'><ChevronUp size={12} strokeWidth={3} /></span>
                </div>
                <div className='flex items-center font-semibold'>
                    Portfolio <span className='ml-2'><SquareArrowOutUpRightIcon size={12} strokeWidth={3} /></span>
                </div>
            </div>
        </Card>
    )
}

export default TalentCard
