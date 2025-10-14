'use client';

import { useTalentApi } from '@/hooks/useTalents';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
import SkeletonTalentCard from '@/components/skeleton-talent-card';
import TalentCard from '@/components/talentCard';
import TalentSearchFilter from '@/components/talent-search-filter';
import { talentProp } from '@/types/user';
import { useTalentStore } from '@/store/talentStore';
import { PaginatedData, TalentParams } from '@/types/talentParam.type';
import { cleanParams } from '@/lib/cleanParams';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function BookmarkedList() {
  const { fetchSavedTalents } = useTalentApi();
  const store = useTalentStore();
  const observerRef = useRef<HTMLDivElement>(null);

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
    [
      store.q,
      store.limit,
      store.experience,
      store.country,
      store.state,
      store.skills,
      store.cursor,
      store.direction,
    ]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<PaginatedData<talentProp> | null>({
    queryKey: ['saved_talents', filters],
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
      const res = await fetchSavedTalents({ params });
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

  const allBookmarkedTalents =
    data?.pages.flatMap((page) => page?.results ?? []) || [];

  return (
    <div className='md:mt-5 mt-2'>
      <div className='sticky md:top-[82px] top-[68px] py-4 z-10 bg-white'>
        <TalentSearchFilter isLoading={isLoading} />
      </div>

      <Card className='shadow-none outline-px mt-2 gap-0 bg-[#fafafa] px-4 text-[#101828] md:min-h-[608px]'>
        {isLoading ? (
          <div className='mt-6 grid md:grid-cols-2 grid-cols-1 gap-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonTalentCard key={i} />
            ))}
          </div>
        ) : allBookmarkedTalents.length > 0 ? (
          <>
            <p className='font-semibold mt-2'>Your Bookmarked Talents</p>
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-3'>
              {allBookmarkedTalents.map((talent, index) => (
                <div
                  key={talent.id || index}
                  className={index === 0 ? 'md:col-span-2' : ''}
                >
                  <TalentCard
                    height={`${index === 0 ? 'md:h-[291px]' : 'md:h-[307px]'
                      }`}
                    width={`${index === 0 ? 'max-w-[919px]' : 'max-w-[453px]'
                      }`}
                    talent={talent}
                  />
                </div>
              ))}
            </div>

            <div
              ref={observerRef}
              className='h-10 mt-4 flex justify-center items-center'
            >
              {isFetchingNextPage && <p>Loading more...</p>}
            </div>
          </>
        ) : (
          <div className='my-auto mx-auto flex flex-col items-center justify-center text-[#101828]'>
            <Image
              src={'/assets/icons/empty-bookmark.svg'}
              alt='empty-bookmark'
              height={164}
              width={164}
            />
            <p className='mt-4 font-semibold'>No bookmarks yet</p>
            <p className='w-full max-w-[295px] mt-[10px] text-[13px] text-center'>
              Save your favorite candidates here for quick access when you&apos;re
              ready to hire.
            </p>
            <Link href={'/talents'}>
              <Button variant={'outline'} className='rounded-sm mt-4'>
                Bookmark new talent
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
