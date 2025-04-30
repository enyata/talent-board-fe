import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronDown } from 'lucide-react'
import React from 'react'

const ProtectedHeader = () => {
    return (
        <div className='flex items-center justify-between w-full p-[24px] sticky z-50'>
            <h1 className='font-semibold text-[24px]'>Talentboard</h1>
            <div className='flex items-center gap-2'>
                <Avatar className='size-[38.8px] border-[1px] border-[#34A9FF]'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>DP</AvatarFallback>
                </Avatar>
                <span className='text-[14px]'>David Farotumi</span>
                <span className='text-transparent'><ChevronDown fill='black'/></span>
            </div>
        </div>
    )
}

export default ProtectedHeader
