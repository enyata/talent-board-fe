import React from 'react'
import ProtectedHeader from './components/header'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <ProtectedHeader />
            <div className='mx-auto w-full md:max-w-[951px]'>
            {children}
            </div>
        </div>
    )
}

export default ProtectedLayout
