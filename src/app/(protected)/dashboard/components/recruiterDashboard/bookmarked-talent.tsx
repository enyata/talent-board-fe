import TalentCard from '@/components/talentCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BookmarkedTalent = () => {
    return (
        <Card className='shadow-none outline-px md:mt-[36px] mt-[24px] gap-0 bg-[#fafafa] px-4 text-[#101828]'>
            <div className='flex  gap-6 items-baseline justify-between'>
                <span className='text-[16px] font-semibold self-baseline mt-auto'>Your Bookmarked Talents</span>
                <Link href={'/talents/bookmark'} className=''>
                    <Button variant={'outline'} className=' w-[120px] h-[36px] text-[14px] rounded-md cursor-pointer'>
                        View All <span className=''><ArrowRight strokeWidth={3} /></span>
                    </Button>
                </Link>
            </div>
            <RecentBookmarkedTalent />
        </Card>
    )
}
const RecentBookmarkedTalent = () => {
    return (
        <div className='w-full mt-[24px] gap-3 grid md:grid-cols-2 grid-cols-1'>
            {Array.from({ length: 4 }).map((_, index) => (
                <TalentCard bookmarked={true} width='max-w-[453px]' key={index} />
            ))}
        </div>
    )
}

export default BookmarkedTalent
