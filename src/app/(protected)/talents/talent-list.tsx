
import TalentSearchFilter from '@/components/talent-search-filter'
import TalentCard from '@/components/talentCard'
import React from 'react'

const TalentList = () => {
    return (
        <div className='mt-5'>
            <div className='sticky top-[88px] py-4 z-10 bg-white'>
                <TalentSearchFilter />
            </div>
            <div className='mt-2 grid md:grid-cols-2 grid-cols-1 gap-3'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <TalentCard height='md:h-[307px]' width='max-w-[469px]' key={index} />
                ))}
            </div>
        </div>
    )
}

export default TalentList
