'use client';

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import MasonryAnimated from './masonry-section'
import { motion } from 'framer-motion';

const WhyEnyata = () => {
    const [showText, setShowText] = useState(false);
    return (
        <section id='about' className='md:py-[80px] pb-[80px] max-w-[1198px] w-full mx-auto px-4 md:px-0'>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex items-center h-fit '>
                    <span className='text-[#A18BDD] text-4xl'>•</span>
                    <p className='text-[13px] font-semibold ml-2'>Why Enyata Talent Board?</p>
                </div>
                <div className='max-w-[901px] w-full font-semibold'>
                    <div className='md:text-[40px] text-3xl'>
                        <p className='leading-[120%]'>Top companies around the world are actively hiring vetted tech talent.</p>

                    </div>
                    <p className='text-[17px] mt-[24px]'>
                        Whether you’re a frontend wizard, a backend architect, or a design visionary — your next opportunity could be one click away. Enyata’s Talent Board helps you get seen by fast-growing startups and global tech giants alike.
                    </p>
                </div>
            </div>
            <div className='md:mt-[112px] mt-[80px]'>
                <MasonryAnimated onComplete={() => setShowText(true)} />

                {showText && (
                    <motion.div
                        className='flex flex-col justify-center items-center w-full mt-4 md:mt-0'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <div className='text-center w-full font-semibold'>
                            <div className='md:text-[40px] text-3xl'>
                                <p className='leading-[120%]'>Let’s build the future — together.</p>
                            </div>
                            <div className='text-[17px] mt-[24px]'>
                                <p>
                                    Whether you’re here to hire or get hired, Enyata Talent Board makes discovery seamless, curated, and fast.
                                </p>
                                <p>Start your journey today.</p>
                            </div>
                        </div>
                        <div className='mt-[52px] flex gap-2 flex-wrap justify-center'>
                            <Link href={'/signup'}>
                                <Button className='bg-primary w-[178px] h-[42px] cursor-pointer rounded text-white'>Join the Talent Board</Button>
                            </Link>
                            <Link href={'/#talents'}>
                                <Button className='border w-[138px] h-[42px] cursor-pointer rounded border-gray-400'>Find Top Talent</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>

        </section>
    )
}

export default WhyEnyata
