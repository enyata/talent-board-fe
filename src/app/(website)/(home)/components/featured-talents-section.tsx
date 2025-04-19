import TalentCard from '@/components/talentCard'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const FeaturedTalentsSection = () => {
    return (
        <section className='mt-[80px] bg-[#F2F2F2]'>
            <div className='py-[80px] max-w-7xl w-full mx-auto'>
                <div className='flex justify-between'>
                    <div className='flex items-center h-fit '>
                        <span className='text-[#A18BDD] text-4xl'>•</span>
                        <p className='text-[13px] font-semibold ml-2'>Featured Talents</p>
                    </div>
                    <div className='max-w-[901px] w-full font-semibold'>
                        <div className='text-[40px]'>
                            <p className='leading-[120%]'>Handpicked Professionals. Ready to Build </p>
                            <p className='leading-[120%]'>What’s Next.</p>
                        </div>
                        <p className='text-[17px] mt-[24px]'>Meet a few of the standout talents from our board — vetted, verified, and open to new opportunities.</p>
                    </div>
                </div>
                <div className='mt-[64px]'>
                    <div className='flex justify-between'>
                        <span className='text-[18px] font-semibold'>Top ranking Talents</span>
                        <Link href={'/talents'} className=''>
                            <Button variant={'outline'} className='w-[149px] h-[36px] cursor-pointer'>
                                View all Talents <span className=''><ArrowRight strokeWidth={3} /></span>
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-[24px] grid grid-cols-1 md:grid-cols-3 gap-[10px] place-items-center">
                        {['1', '2', '3', '4', '5', '6'].map((card, index) => (
                            <TalentCard key={index} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}


export default FeaturedTalentsSection
