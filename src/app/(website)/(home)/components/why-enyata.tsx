import CommunityComponent from '@/components/community-component'

const WhyEnyataSection = () => {
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
                <CommunityComponent />
            </div>
        </section>
    )
}

export default WhyEnyataSection
