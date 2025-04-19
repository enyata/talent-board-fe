import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'

const testimonies = [
    {
        text: 'Enyata Talentboard has been great with keeping me busy with gigs.',
        name: 'John Doe',
        position: 'Software Engineer',
    },
    {
        text: 'I love the way Enyata Talentboard connects me with clients.',
        name: 'Jane Doe',
        position: 'Product Designer',
    },
    {
        text: 'The platform is easy to use and has a great community.',
        name: 'Sam Smith',
        position: 'Data Scientist',
    },
    {
        text: 'I have learned so much from the resources available on Enyata Talentboard.',
        name: 'Alice Johnson',
        position: 'UX Researcher',
    },
    {
        text: 'Enyata Talentboard has helped me grow my skills and network.',
        name: 'Bob Brown',
        position: 'Web Developer',
    },
]
const TestimonyCarousel = () => {
    return (
        <Carousel className="w-full max-w-[608px] absolute bottom-[56px] left-1/2 -translate-x-1/2 text-white">
            <CarouselContent>
                {testimonies.map((_, index) => (
                    <CarouselItem key={index} className='flex items-end'>
                        <div className=" flex flex-col">
                            <span className="text-4xl font-medium">{_.text}</span>
                            <span className='text-[30px] mt-[24px] font-medium'>{_.name}</span>
                            <span className='text-[18px] mt-[12px]'>{_.position}</span>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='bottom-0 right-22 top-auto left-auto translate-y-0 bg-transparent border-[1px] border-white size-[56px]' />
            <CarouselNext className='bottom-0 right-0 top-auto translate-y-0 bg-transparent border-[1px] border-white size-[56px]' />
        </Carousel>

    )
}

export default TestimonyCarousel
