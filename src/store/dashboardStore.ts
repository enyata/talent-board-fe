import { useDashboardApi } from '@/hooks/useDashboard';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    TalentDashboardData,
    RecruiterDashboardData,
} from '@/types/dashboard';

interface DashboardState {
    talent: TalentDashboardData | null;
    recruiter: RecruiterDashboardData | null;
    isLoading: boolean;
    fetchTalent: () => Promise<void>;
    fetchRecruiter: () => Promise<void>;
    reset: () => void;          // <— clear on logout
}

export const useDashboardStore = create<DashboardState>()(
    persist(
        (set) => {
            // pull API functions once
            const { fetchTalentDashboard, fetchRecruiterDashboard } =
                useDashboardApi();

            return {
                talent: null,
                recruiter: null,
                isLoading: false,
                error: null,

                fetchTalent: async () => {
                    set({ isLoading: true });
                    try {
                        const data = await fetchTalentDashboard();
                        set({ talent: data });
                    }
                     finally {
                        set({ isLoading: false });
                    }
                },

                fetchRecruiter: async () => {
                    set({ isLoading: true });
                    try {
                        const data = await fetchRecruiterDashboard();
                        set({ recruiter: data });
                    } finally {
                        set({ isLoading: false });
                    }
                },

                reset: () => set({ talent: null, recruiter: null }),
            };
        },
        {
            name: 'dashboard-storage',          // localStorage key
            partialize: (s) => ({ talent: s.talent, recruiter: s.recruiter }),
        }
    )
);
