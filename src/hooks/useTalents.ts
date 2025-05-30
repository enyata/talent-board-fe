'use client';

import { GET, POST } from '@/lib/requests';

interface UseTalentApiProps {
    params?: {
        limit?: number;
        direction?: string;
        cursor?: string;
        sort?: string;
        q?: string;
        skills?: string;
        experience?: string;
        country?: string;
        state?: string;
    }
}
export const useTalentApi = () => {
    const fetchAllTalents = async ({ params }: UseTalentApiProps) => {
        const res = await GET('/api/v1/talents', params);
        return res?.data ?? null;
    }
    const fetchSavedTalents = async ({ params }: UseTalentApiProps) => {
        const res = await GET('/api/v1/talents/saved', params);
        return res?.data ?? null;
    }
    const fetchTalentById = async (id: string) => {
        const res = await GET(`/api/v1/talents/${id}`);
        return res?.data ?? null;
    }
    const upvoteTalent = async (id: string) => {
        const res = await POST(`/api/v1/talents/${id}/upvote`);
        return res?.data ?? null;
    }
    const saveTalent = async (id: string) => {
        const res = await POST(`/api/v1/talents/${id}/save`);
        return res?.data ?? null;
    }
    return { fetchTalentById, fetchAllTalents, fetchSavedTalents, upvoteTalent, saveTalent };
}