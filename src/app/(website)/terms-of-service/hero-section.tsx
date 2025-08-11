import React from 'react'

const HeroSection = () => {
    return (
        <div className='md:py-[96px] py-[40px] px-4 flex items-center justify-center bg-[#F9FAFB]'>
            <div className='w-full max-w-[768px] text-center'>
                <p className='font-semibold text-[#7557D3]'>
                    Current as of August 1st, 2025
                </p>
                <h1 className='font-semibold md:mt-[12px] mt-2 md:text-[48px] text-[24px]'>
                    Terms of Service
                </h1>
                <p className='md:mt-[24px] mt-4'>
                    Welcome to the Enyata Talent Board. These Terms of Service govern your access to and use of our platform.
                    By registering for or using the platform, you agree to abide by these Terms and our Privacy Policy.
                </p>
            </div>
        </div>
    )
}

export default HeroSection
