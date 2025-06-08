'use client';
import React from 'react'
import Prompt from './prompt'
import RecommendedTalent from './recommended-talent'
import BookmarkedTalent from './bookmarked-talent'
import Notifications from './notification'
import { useDashboardApi } from '@/hooks/useDashboard'
import { useQuery } from '@tanstack/react-query';
import RecruiterDashboardSkeleton from './recruiter-board-skeleton';

const RecruiterDashboard = () => {
  const { fetchRecruiterDashboard } = useDashboardApi()
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchRecruiterDashboard,
  });
  console.log('data at recruiter dashboard', data)
  if (isLoading) {
    return (
      <RecruiterDashboardSkeleton />
    )
  }
  return (
    <div className='w-full'>
      <Prompt />
      <RecommendedTalent talents={data?.recommended_talents} />
      <BookmarkedTalent talents={data?.saved_talents} />
      <Notifications data={data} />
    </div>
  )
}

export default RecruiterDashboard
