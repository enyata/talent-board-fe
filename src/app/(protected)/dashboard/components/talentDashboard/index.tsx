'use client'
import DashboardOverview from './overview'
import QuickInsights from './quick-insights'
import Notifications from './notifications'
import TalentDashboardSkeleton from './talent-board-skeleton'
import { useQuery } from '@tanstack/react-query'
import { useDashboardApi } from '@/hooks/useDashboard'
import { QueryError } from '@/components/query-error'

const TalentDashboard = () => {
    const { fetchTalentDashboard } = useDashboardApi()
    const { data, isLoading, isError, refetch, isRefetching } = useQuery({
        queryKey: ["dashboard", "talent"],
        queryFn: fetchTalentDashboard,
    });
    if (isLoading) {
        return (
            <TalentDashboardSkeleton />
        )
    }
    if (isError) {
        return <QueryError title="We couldn't load your dashboard" onRetry={() => refetch()} isRetrying={isRefetching} />
    }
    return (
        <div className=' w-full'>
            <DashboardOverview data={data ?? undefined} />
            <QuickInsights data={data ?? undefined} />
            <Notifications data={data ?? undefined} />
        </div>
    )
}

export default TalentDashboard
