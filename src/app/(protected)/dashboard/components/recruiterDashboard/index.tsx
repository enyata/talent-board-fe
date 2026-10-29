'use client';
import React from 'react'
import Prompt from './prompt'
import RecommendedTalent from './recommended-talent'
import BookmarkedTalent from './bookmarked-talent'
import Notifications from './notification'
import { useDashboardApi } from '@/hooks/useDashboard'
import { useQuery } from '@tanstack/react-query';
import RecruiterDashboardSkeleton from './recruiter-board-skeleton';
import { QueryError } from '@/components/query-error';

const RecruiterDashboard = () => {
  const { fetchRecruiterDashboard } = useDashboardApi()
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["dashboard", "recruiter"],
    queryFn: fetchRecruiterDashboard,
  });
  if (isLoading) {
    return (
      <RecruiterDashboardSkeleton />
    )
  }
  if (isError) {
    return <QueryError title="We couldn't load your dashboard" onRetry={() => refetch()} isRetrying={isRefetching} />
  }
  return (
    <div className='w-full'>
      <Prompt />
      <RecommendedTalent talents={data?.recommended_talents ?? []} />
      <BookmarkedTalent talents={data?.saved_talents ?? []} />
      <Notifications data={data} />
    </div>
  )
}

export default RecruiterDashboard
