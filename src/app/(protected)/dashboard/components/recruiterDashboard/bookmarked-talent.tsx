import TalentCard from '@/components/talentCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { talentProp } from '@/types/user'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BookmarkedTalent = ({ talents }: { talents: talentProp[] }) => {
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
            {talents?.length > 0 ?
                <RecentBookmarkedTalent talents={talents} />
                :
                <div className='my-auto mx-auto flex flex-col items-center justify-center text-[#101828]'>
                    <p className='mt-4 font-semibold'>
                        No bookmarks yet
                    </p>
                    <p className='w-full max-w-[295px] mt-[10px] text-[13px] text-center'>Save your favorite candidates here for quick access when you&apos;re ready to hire.</p>
                </div>
            }
        </Card>
    )
}
const RecentBookmarkedTalent = ({ talents }: { talents: talentProp[] }) => {
    return (
        <div className='w-full mt-[24px] gap-3 grid md:grid-cols-2 grid-cols-1'>
            {talents?.slice(0, 4).map((talent, index) => (
                <TalentCard talent={talent} height='md:h-[307px]' width='max-w-[453px]' key={index} />
            ))}
        </div>
    )
}

export default BookmarkedTalent
