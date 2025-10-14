'use client';

import { useTalentApi } from '@/hooks/useTalents';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
import TalentCard from '@/components/talentCard';
import SkeletonTalentCard from '@/components/skeleton-talent-card';
import TalentSearchFilter from '@/components/talent-search-filter';
import { talentProp } from '@/types/user';
import { useTalentStore } from '@/store/talentStore';
import { PaginatedData, TalentParams } from '@/types/talentParam.type';
import { cleanParams } from '@/lib/cleanParams';

export default function TalentList() {
    const { fetchAllTalents } = useTalentApi();

    const observerRef = useRef<HTMLDivElement>(null);

    const store = useTalentStore();

    const filters = useMemo(
        () => ({
            q: store.q,
            limit: store.limit,
            experience: store.experience,
            country: store.country,
            state: store.state,
            skills: store.skills,
            cursor: store.cursor,
            direction: store.direction,
        }),
        [store.q, store.limit, store.experience, store.country, store.state, store.skills, store.cursor, store.direction]
    );

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery<PaginatedData<talentProp> | null>({
            queryKey: ['talents', filters],
            queryFn: async ({ pageParam }) => {
                const rawParams: TalentParams = {
                    q: filters.q,
                    limit: filters.limit,
                    experience: filters.experience,
                    country: filters.country,
                    state: filters.state,
                    skills: filters.skills,
                    cursor: pageParam as string | undefined,
                    direction: filters.direction,
                };

                const params = cleanParams(rawParams);
                const res = await fetchAllTalents({ params });
                return res;
            },

            getNextPageParam: (lastPage) => {
                if (!lastPage?.hasNextPage) return undefined;
                return lastPage.nextCursor ?? undefined;
            },

            initialPageParam: undefined,
        });

    useEffect(() => {
        const el = observerRef.current;
        if (!el) return;

        let timeout: NodeJS.Timeout;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }, 300);
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(el);
        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


    const allTalents = data?.pages.flatMap((page) => page?.results ?? []) || [];

    return (
            <div className='mt-5'>
                <div className='sticky md:top-[82px] top-[68px] py-4 z-10 bg-white'>
                    <TalentSearchFilter isLoading={isLoading} />
                </div>

                {isLoading ? (
                    <div className='mt-2 grid md:grid-cols-2 grid-cols-1 gap-3'>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonTalentCard key={i} />
                        ))}
                    </div>
                ) : (
                    <div className='mt-2 grid md:grid-cols-2 grid-cols-1 gap-3'>
                        {allTalents.map((talent: talentProp, i: number) => (
                            <TalentCard
                             key={i}
                              talent={talent}
                              width='max-w-full'
                               />
                        ))}
                    </div>
                )}

                <div
                    ref={observerRef}
                    className='h-10 mt-4 flex justify-center items-center'
                >
                    {isFetchingNextPage && <p>Loading more...</p>}
                </div>
            </div>
    );
}
