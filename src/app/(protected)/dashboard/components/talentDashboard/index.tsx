import React from 'react'
import DashboardOverview from './overview'
import QuickInsights from './quick-insights'
import Notifications from './notifications'

const TalentDashboard = () => {
    return (
        <div className=' w-full'>
            <DashboardOverview />
            <QuickInsights />
            <Notifications />
        </div>
    )
}

export default TalentDashboard
