import { Button } from '@/components/ui/button'
import React from 'react'

const HeroSection = () => {
    return (
        <section className='flex flex-col justify-center items-center w-full max-w-7xl mx-auto'>
            <div className='text-[49px] leading-[120%] font-semibold text-center'>
                <p >
                    Discover Africa’s top tech talent.
                </p>
                <p>
                    Curated, verified, and community-backed.
                </p>
            </div>
            <div className='max-w-[634px] w-full text-center mt-[24px]'>
                <p>From engineers to designers and product thinkers — every profile is handpicked, reviewed, and backed by the community.</p>
            </div>
            <div className='mt-[52px]'>
                
                <Button className='bg-primary w-[178px] h-[42px]'>Join the Talent Board</Button>
                <Button variant={'outline'} className='w-[138px] h-[42px] ml-2'>Find Top Talent</Button>
            </div>
        </section>
    )
}

export default HeroSection
