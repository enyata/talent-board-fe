export type TalentFilterForm = {
    q: string;
    limit: number;
    cursor: string;
    direction: 'next' | 'prev' | '';
    filter_options: string[];
    experience: string;
    country: string;
    state: string;
    skills: string[];
  };