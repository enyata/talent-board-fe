'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className='flex flex-col justify-center items-center w-full max-w-[1198px] mx-auto px-4 md:px-0'>
            <div className='md:text-[49px] text-4xl leading-[120%] font-semibold text-center'>
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
                <Link href={'/signup'}>
                    <Button className='bg-primary w-[178px] h-[42px] cursor-pointer'>Join the Talent Board</Button>
                </Link>
                <Link href={'/#talents'}>
                    <Button variant={'outline'} className='w-[138px] h-[42px] ml-2 cursor-pointer'>Find Top Talent</Button>
                </Link>
            </div>
        </motion.section>
    )
}

export default HeroSection
