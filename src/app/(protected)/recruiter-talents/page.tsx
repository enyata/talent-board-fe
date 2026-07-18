import React from 'react'
import TalentList from '@/components/talent-list'

const RecruiterTalentsPage = () => {
  return (
    <div className='px-4 md:px-0'>
      <div className='text-[#2D2D2D] mt-[36px]'>
        <h2 className='font-semibold text-[24px]'>Browse Talent</h2>
        <p className=' text-[14px]'>Find the perfect talent for your team from our curated list of professionals</p>
      </div>
      <TalentList />
    </div>
  )
}

export default RecruiterTalentsPage
