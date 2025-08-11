import React from 'react'

const HeroSection = () => {
    return (
        <div className='md:py-[96px] px-4 py-[40px] flex items-center justify-center bg-[#F9FAFB]'>
            <div className='w-full max-w-[768px] text-center'>
                <p className='font-semibold text-[#7557D3]'>
                    Current as of August 1st, 2025
                </p>
                <h1 className='font-semibold md:mt-[12px] mt-2 md:text-[48px] text-[24px]'>
                    We care about your privacy
                </h1>
                <p className='md:mt-[24px] mt-4'>
                    Your privacy is important to us at Enyata Talent Board.
                    We respect your privacy regarding any information we may collect from you across our website.
                </p>
            </div>
        </div>
    )
}

export default HeroSection
