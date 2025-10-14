'use client';

import { GET } from '@/lib/requests';

export const useDashboardApi = () => {
  const fetchTalentDashboard = async () => {
    const res = await GET('/api/v1/dashboard/talent');
    return res?.data ?? null;
  };

  const fetchRecruiterDashboard = async () => {
    const res = await GET('/api/v1/dashboard/recruiter');
    return res?.data ?? null;
  };

  return { fetchTalentDashboard, fetchRecruiterDashboard };
};
