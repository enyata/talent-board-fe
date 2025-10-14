// types/talentParams.type.ts

export interface TalentFilters {
    q?: string;
    limit?: number;
    filter_options?: string[];
    experience?: string;
    country?: string;
    state?: string;
    skills?: string[];
}

export interface TalentPagination {
    cursor?: string;
    direction?: 'next' | 'prev';
    sort?: string;
}

export interface TalentParams extends TalentFilters, TalentPagination { }

export interface PaginatedData<T> {
  results: T[];
  count: number;
  nextCursor?: string;
  previousCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

