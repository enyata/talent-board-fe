import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTalentApi } from '../useTalents';


export const useUpvoteTalentMutation = () => {
    const { upvoteTalent } = useTalentApi();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['upvote-talent'],
        mutationFn: upvoteTalent,
        onSuccess: (_data, talentId) => {
            queryClient.invalidateQueries({ queryKey: ['talents'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            queryClient.invalidateQueries({ queryKey: ['saved_talents'] });
            queryClient.invalidateQueries({ queryKey: ['talent', talentId] });
        },
        onError: (err) => {
            console.error('Error upvoting talent:', err);
        },
    });
};
export const useSaveTalentMutation = () => {
    const { saveTalent } = useTalentApi();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['save-talent'],
        mutationFn: saveTalent,
        onSuccess: (_data, talentId) => {
            queryClient.invalidateQueries({ queryKey: ['talents'] });
            queryClient.invalidateQueries({ queryKey: ['talent', talentId] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            queryClient.invalidateQueries({ queryKey: ['saved_talents'] });
        },
        onError: (err) => {
            console.error('Error upvoting talent:', err);
        },
    });
};