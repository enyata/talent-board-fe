
import React from 'react'
import TalentList from './component/talent-list'

const TalentsPage = () => {
  return (
    <div className='px-4 md:px-0  mx-auto w-full md:max-w-[951px] mt-5 md:mt-[64px] md:pb-[64px] pb-5'>
      <div className='text-[#2D2D2D] mt-[36px]'>
        <h2 className='font-semibold text-[24px]'>Browse Talent</h2>
        <p className=' text-[14px]'>Find the perfect talent for your team from our curated list of professionals</p>
      </div>
      <TalentList />
    </div>
  )
}

export default TalentsPage
