import { PRIVACY_POLICY } from '@/constants/privacy-policy'
import React from 'react'

const PolicySection = () => {
    return (
        <div className='md:py-[96px] py-[40px]'>
            <div className='max-w-[720px] w-full mx-auto'>
                <div className='font-semibold md:text-[18px] flex flex-col gap-4'>
                    <p>Jurisdiction: Nigeria</p>
                    <p>Operated by: Enyata</p>
                    <p>Contact: community@enyata.com</p>
                </div>
                <div className='mt-[24px] md:mt-[48px] flex flex-col gap-[24px] md:gap-[48px]'>
                    {
                        PRIVACY_POLICY.map((policy, index) => (
                            <div key={index} className=''>
                                <h2 className='font-semibold md:text-[24px] text-[20px] md:mb-4 mb-2'>{policy.title}</h2>
                                <p className='text-[16px] text-[#4B5563]'>{policy.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PolicySection
