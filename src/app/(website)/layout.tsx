import Navbar from '@/components/navbar'
import React from 'react'

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full'>
            <Navbar />
            <div className='mt-[170px]'>
                {children}
            </div>
        </div>
    )
}

export default WebsiteLayout
