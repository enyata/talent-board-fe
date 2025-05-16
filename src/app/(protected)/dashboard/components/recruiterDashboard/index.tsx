import React from 'react'
import Prompt from './prompt'
import RecommendedTalent from './recommended-talent'
import BookmarkedTalent from './bookmarked-talent'
import Notifications from './notification'

const RecruiterDashboard = () => {
  return (
    <div className='w-full'>
      <Prompt />
      <RecommendedTalent />
      <BookmarkedTalent />
      <Notifications/>
    </div>
  )
}

export default RecruiterDashboard
