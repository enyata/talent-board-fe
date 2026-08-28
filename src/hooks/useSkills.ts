'use client';

import { GET, POST } from '@/lib/requests';
import { CreateSkillResponse, Skill, SkillsResponse } from '@/types/APIResponseTypes';

export const useSkillsApi = () => {
    const fetchSkills = async (query?: string): Promise<Skill[]> => {
        const res = await GET<SkillsResponse>('/api/v1/skills', query ? { query } : undefined);
        return res?.data?.skills ?? [];
    };

    const createSkill = async (name: string): Promise<Skill> => {
        const res = await POST<CreateSkillResponse>('/api/v1/skills', { name });
        return res.data.skill;
    };

    return { fetchSkills, createSkill };
};
