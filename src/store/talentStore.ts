import { TalentFilters, TalentPagination } from '@/types/talentParam.type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TalentState extends TalentFilters, TalentPagination {
    setFilter: <K extends keyof TalentFilters>(
        key: K,
        value: TalentFilters[K]
    ) => void;
    resetFilters: () => void;
    setPagination: (cursor?: string, direction?: 'next' | 'prev') => void;
}

export const useTalentStore = create<TalentState>()(
    devtools(
        (set) => ({
            q: '',
            limit: 10,
            experience: '',
            country: '',
            state: '',
            skills: [],
            cursor: undefined,
            direction: undefined,

            setFilter: (key, value) =>
                set((state) => ({
                    ...state,
                    [key]: value,
                    cursor: undefined,
                })),

            resetFilters: () =>
                set({
                    q: '',
                    experience: '',
                    country: '',
                    state: '',
                    skills: [],
                    cursor: undefined,
                    direction: undefined,
                }),

            setPagination: (cursor, direction) => set({ cursor, direction }),
        }),
        { name: 'talentStore', enabled: process.env.NODE_ENV !== 'production' }
    )
);
