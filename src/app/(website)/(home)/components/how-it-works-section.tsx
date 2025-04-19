import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const cardDetails = [
    {
        image: "/assets/images/walkthrough-img1.svg",
        icon: "/assets/icons/walkthrough-icon1.svg",
        topic: "Talents Join & Showcase Their Skills",
        desc: "Sign in with Google, fill out your profile, and share your experience, skills, and portfolio."
    },
    {
        image: "/assets/images/walkthrough-img2.svg",
        icon: "/assets/icons/walkthrough-icon2.svg",
        topic: "Profiles Reviewed & Approved",
        desc: "Each submission is reviewed by our team to ensure quality, completeness, and authenticity."
    },
    {
        image: "/assets/images/walkthrough-img3.svg",
        icon: "/assets/icons/walkthrough-icon3.svg",
        topic: "Get Discovered by Recruiters",
        desc: "Approved profiles appear in the public talent directory where recruiters can search, filter, and upvote"
    },
    {
        image: "/assets/images/walkthrough-img4.svg",
        icon: "/assets/icons/walkthrough-icon4.svg",
        topic: "Connect & Start Conversations",
        desc: "Recruiters can reach out via Enyata Community, LinkedIn, or email — no middlemen, no delays."
    }
]
const Walkthrough = () => {
    return (

        <section className='py-[80px] max-w-7xl w-full mx-auto'>
            <div className='flex justify-between'>
                <div className='flex items-center h-fit '>
                    <span className='text-[#A18BDD] text-4xl'>•</span>
                    <p className='text-[13px] font-semibold ml-2'>How It Works</p>
                </div>
                <div className='max-w-[901px] w-full font-semibold'>
                    <div className='text-[40px]'>
                        <p className='leading-[120%]'>Your journey to exceptional talent or your next big opportunity starts here.</p>

                    </div>
                    <p className='text-[17px] mt-[24px]'>We’ve made it simple — whether you’re a recruiter searching for skilled professionals or a tech talent ready to be discovered.
                        Here’s how the Enyata Talent Board works, step-by-step.
                    </p>
                </div>
            </div>
            <div className='mt-[64px] grid grid-cols-1 md:grid-cols-2 gap-[24px] place-items-center'>
                {cardDetails.map((card, index) =>
                    <WalkthroughCard key={index} image={card.image} icon={card.icon} topic={card.topic} desc={card.desc} number={index + 1} />
                )}
            </div>
        </section>
    )
}

type WalkthroughCardProps = {
    image: string;
    icon: string;
    topic: string;
    desc: string;
    number: number
}

const WalkthroughCard: React.FC<WalkthroughCardProps> = ({ image, icon, topic, desc, number }) => {
    return (
        <Card className='p-[20px] pb-0 max-w-[650px] w-full h-[264px] bg-[#F7F7F7] shadow-none overflow-hidden'>
            <div>
                <div className='relative'>
                    <span className='rounded-md size-[36px] border-[1px] border-[#E1E1E1] flex #9A9A9A'>
                        <Image
                            className='mt-2'
                            src={icon}
                            alt='icon'
                            width={34}
                            height={20}
                        />
                    </span>
                    <p className='text-[14px] font-semibold mt-[16px]'>{topic}</p>
                    <p className='text-[12px] font-medium mt-[8px]'>{desc}</p>
                    <span className='absolute top-0 right-2 text-[54px] text-[#9A9A9A] font-medium'>
                        0{number}
                    </span>
                </div>
                <Image
                    className='mt-[20px]'
                    src={image}
                    alt='walkthrough image'
                    width={638}
                    height={58}
                />
            </div>
        </Card>
    )
}

export default Walkthrough
