'use client'
import DashboardOverview from './overview'
import QuickInsights from './quick-insights'
import Notifications from './notifications'
import TalentDashboardSkeleton from './talent-board-skeleton'
import { useQuery } from '@tanstack/react-query'
import { useDashboardApi } from '@/hooks/useDashboard'

const TalentDashboard = () => {
    const {fetchTalentDashboard} = useDashboardApi()
    const { data, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: fetchTalentDashboard,
      });
    console.log('data at talent dashboard', data)
    if (isLoading) {
        return (
            <TalentDashboardSkeleton />
        )
    }
    return (
        <div className=' w-full'>
            <DashboardOverview />
            <QuickInsights />
            <Notifications />
        </div>
    )
}

export default TalentDashboard
