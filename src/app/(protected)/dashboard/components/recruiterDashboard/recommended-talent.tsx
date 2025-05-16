import TalentCard from '@/components/talentCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const RecommendedTalent = () => {
    return (
        <Card className='shadow-none outline-px md:mt-[36px] gap-0 mt-[24px] bg-[#fafafa] px-4 text-[#101828]'>
            <div className='flex  gap-6 items-baseline justify-between'>
                <span className='text-[16px] font-semibold self-baseline mt-auto'>Recommended for You</span>
                <Link href={'/talents'} className=''>
                    <Button variant={'outline'} className=' w-[120px] h-[36px] text-[14px] rounded-md cursor-pointer'>
                        View More <span className=''><ArrowRight strokeWidth={3} /></span>
                    </Button>
                </Link>
            </div>
            <RecommendedTalentCarousel />
        </Card>
    )
}

const RecommendedTalentCarousel = () => {
    return (
        <Carousel className="w-full  mt-[24px]">
            <CarouselContent className='-ml-1 gap-2 mt-0'>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className='pl-1 min-w-[250px] max-w-[423px] flex-shrink-0'>
                        <TalentCard width='max-w-[423px]' />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className='flex gap-4 w-full justify-end md:mt-[24px] mt-[20px]'>
                <CarouselPrevious className=' translate-y-0 left-auto relative bg-transparent border-[1px] border-black  size-[32px]' />
                <CarouselNext className='translate-y-0 right-auto relative bg-transparent border-[1px] border-black  size-[32px]' />
            </div>
        </Carousel>
    )
}

export default RecommendedTalent
