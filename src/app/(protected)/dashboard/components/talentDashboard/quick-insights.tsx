import { Card } from '@/components/ui/card'
import { TalentDashboardData } from '@/types/dashboard'
import Image from 'next/image'
import React from 'react'

const QuickInsights = ({ data }: { data: TalentDashboardData | undefined }) => {
  const { search_appearances } = data || {}
  return (
    <div className='mt-[24px]'>
      <p className='font-semibold'>Quick Insights</p>
      <div className='mt-[12px] text-[#475467] text-[14px] flex flex-col md:flex-row gap-3'>
        <Card className='shadow-none outline-px bg-[#fafafa] w-full'>
          <div className='px-[16px] flex justify-between items-center'>
            <div>
              <p className='font-semibold'>Profile Review</p>
              <p>Your profile has been approved</p>
            </div>
            <Image
              src={'/assets/icons/hour-glass.svg'}
              alt='icon'
              height={52}
              width={33.3}
            />
          </div>
        </Card>
        <Card className='shadow-none outline-px bg-[#fafafa] w-full'>
          <div className='px-[16px] flex justify-between items-center'>
            <div>
              <p className='font-semibold'>Profile Views</p>
              <p>Your profile appeared in {search_appearances} recruiter searches this week!</p>
            </div>
            <Image
              src={'/assets/icons/profile.svg'}
              alt='icon'
              height={52}
              width={33.3}
            />
          </div>

        </Card>
      </div>
    </div>
  )
}

export default QuickInsights
