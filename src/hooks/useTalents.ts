'use client';

import { GET, POST } from '@/lib/requests';
import { PaginatedData, TalentParams } from '@/types/talentParam.type';
import { talentProp } from '@/types/user';

interface UseTalentApiProps {
    params?: TalentParams;
}
export const useTalentApi = () => {
    const fetchAllTalents = async (
        { params }: UseTalentApiProps
    ): Promise<PaginatedData<talentProp> | null> => {
        const res = await GET('/api/v1/talents', params);
        return res?.data ?? null;
    };

    const fetchSavedTalents = async (
        { params }: UseTalentApiProps
    ): Promise<PaginatedData<talentProp> | null> => {
        const res = await GET('/api/v1/talents/saved', params);
        return res?.data ?? null;
    };
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