import TalentSearchFilter from '@/components/talent-search-filter'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TalentCard from '@/components/talentCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BookmarkedList = () => {
  return (
    <div className='md:mt-[36px] mt-[24px]'>
      <TalentSearchFilter />
      <Card className='shadow-none outline-px mt-[24px] gap-0 bg-[#fafafa] px-4 text-[#101828] md:min-h-[608px]'>
        <div className='my-auto mx-auto flex flex-col items-center justify-center text-[#101828]'>
          <Image
            src={'/assets/icons/empty-bookmark.svg'}
            alt='empty-bookmark'
            height={164}
            width={164}
          />
          <p className='mt-4 font-semibold'>
            No bookmarks yet
          </p>
          <p className='w-full max-w-[295px] mt-[10px] text-[13px] text-center'>Save your favorite candidates here for quick access when you&apos;re ready to hire.</p>
          <Link href={'/talents'}>
            <Button variant={'outline'} className='rounded-sm mt-4'>
              Bookmark new talent
            </Button>
          </Link>
        </div>
        {/* <p className=' font-semibold'>
          Your Bookmarked Talents
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className={index === 0 ? 'md:col-span-2' : ''}
            >
              <TalentCard height={`${index===0?'md:h-[291px]':'md:h-[307px]'}`} width={`${index === 0 ? 'max-w-[919px]' : 'max-w-[453px]'}`} />
            </div>
          ))}
        </div> */}
      </Card>
    </div>
  )
}

export default BookmarkedList
