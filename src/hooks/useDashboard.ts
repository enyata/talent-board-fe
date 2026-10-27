'use client';

import { GET } from '@/lib/requests';
import { ApiEnvelope } from '@/types/APIResponseTypes';
import { RecruiterDashboardData, TalentDashboardData } from '@/types/dashboard';

export const useDashboardApi = () => {
  const fetchTalentDashboard = async () => {
    const res = await GET<ApiEnvelope<TalentDashboardData>>('/api/v1/dashboard/talent');
    return res?.data ?? null;
  };

  const fetchRecruiterDashboard = async () => {
    const res = await GET<ApiEnvelope<RecruiterDashboardData>>('/api/v1/dashboard/recruiter');
    return res?.data ?? null;
  };

  return { fetchTalentDashboard, fetchRecruiterDashboard };
};
