'use client';
import React from 'react'
import TalentDashboard from './components/talentDashboard'
import { useAuthStore } from '@/store/authStore'
import RecruiterDashboard from './components/recruiterDashboard'

const DashboardPage = () => {
    const { user } = useAuthStore()

    return (
      <div className="w-full px-4 md:px-[32px] mt-[24px] pb-[80px]">
        <div>
          {user?.role === "talent" ? (
            <TalentDashboard />
          ) : (
            <RecruiterDashboard />
          )}
        </div>
      </div>
    );
}

export default DashboardPage
