import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const WhyEnyata = () => {
    return (
        <section className='my-[80px] max-w-7xl w-full mx-auto'>
            <div className='flex justify-between'>
                <div className='flex items-center h-fit '>
                    <span className='text-[#A18BDD] text-4xl'>•</span>
                    <p className='text-[13px] font-semibold ml-2'>Why Enyata Talent Board?</p>
                </div>
                <div className='max-w-[901px] w-full font-semibold'>
                    <div className='text-[40px]'>
                        <p className='leading-[120%]'>Top companies around the world are actively hiring vetted tech talent.</p>

                    </div>
                    <p className='text-[17px] mt-[24px]'>
                        Whether you’re a frontend wizard, a backend architect, or a design visionary — your next opportunity could be one click away. Enyata’s Talent Board helps you get seen by fast-growing startups and global tech giants alike.
                    </p>
                </div>
            </div>
            <div className='mt-[112px]'>
                <div className='h-[461px] max-w-[1053px] mx-auto flex gap-[11px] translate-y-[48px]'>
                    {[
                        ['/assets/images/masonry-img1.svg', '/assets/images/masonry-img2.svg'],
                        ['/assets/images/masonry-img3.svg', '/assets/images/masonry-img4.svg', 'mb-[48px]'],
                        ['/assets/images/masonry-img5.svg', undefined, 'mb-[136px]'],
                        ['/assets/images/masonry-img6.svg', undefined, 'mb-[187px]'],
                        ['/assets/images/masonry-img7.svg', undefined, 'mb-[155px]'],
                        ['/assets/images/masonry-img8.svg', undefined, 'mb-[187px]'],
                        ['/assets/images/masonry-img9.svg', undefined, 'mb-[133px]'],
                        ['/assets/images/masonry-img10.svg', '/assets/images/masonry-img11.svg', 'mb-[48px]'],
                        ['/assets/images/masonry-img12.svg', '/assets/images/masonry-img13.svg'],
                    ].map(([img1, img2, mb], i) => (
                        <div
                            key={i}
                            className={`max-w-[107px] w-full flex flex-col gap-[8px] ${mb ?? ''}`}
                        >
                            <div className='flex-1 w-full rounded-[8px] bg-gradient-to-t from-[#EDEDED] to-transparent'></div>
                            <div className='group overflow-hidden rounded-[8px]'>
                                <Image
                                    src={img1 as string}
                                    alt='image'
                                    height={133}
                                    width={107}
                                    className='transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg'
                                />
                            </div>
                            {img2 && (
                                <div className='group overflow-hidden rounded-[8px]'>
                                    <Image
                                        src={img2}
                                        alt='image'
                                        height={133}
                                        width={107}
                                        className='transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg'
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className=' text-center w-full font-semibold'>
                        <div className='text-[40px]'>
                            <p className='leading-[120%]'>Let’s build the future — together.</p>
                        </div>
                        <div className='text-[17px] mt-[24px]'>
                            <p className=''>
                                Whether you’re here to hire or get hired, Enyata Talent Board makes discovery seamless, curated, and fast.
                            </p>
                            <p> Start your journey today.</p>
                        </div>
                    </div>
                    <div className='mt-[52px]'>
                        <Link href={'/signup'}>
                            <Button className='bg-primary w-[178px] h-[42px] cursor-pointer'>Join the Talent Board</Button>
                        </Link>
                        <Link href={'/#talents'}>
                            <Button variant={'outline'} className='w-[138px] h-[42px] ml-2 cursor-pointer'>Find Top Talent</Button>
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default WhyEnyata
