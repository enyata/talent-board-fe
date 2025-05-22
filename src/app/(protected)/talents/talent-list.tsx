
'use client';
import SkeletonTalentCard from '@/components/skeleton-talent-card';
import TalentSearchFilter from '@/components/talent-search-filter'
import TalentCard from '@/components/talentCard'
import { useTalentApi } from '@/hooks/useTalents';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const TalentList = () => {
    const { fetchAllTalents } = useTalentApi()
    const [queryStringValue, setQueryStringValue] = useState<string>('')
    const params = Object.fromEntries(new URLSearchParams(queryStringValue));
    delete params.filter_options;
    console.log('params at talent list', params)

    const { data, isLoading } = useQuery({
        queryKey: ['talents', queryStringValue],
        queryFn: () => fetchAllTalents(params),
    });
    console.log('data at talent list', data)
    return (
        <div className='mt-5'>
            <div className='sticky top-[88px] py-4 z-10 bg-white'>
                <TalentSearchFilter
                    queryStringValue={queryStringValue}
                    setQueryStringValue={setQueryStringValue}
                    isLoading={isLoading}
                />
            </div>
            {
                isLoading ?
                    <div className="mt-2 grid md:grid-cols-2 grid-cols-1 gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonTalentCard key={i} />
                        ))}
                    </div>
                    :
                    <div className='mt-2 grid md:grid-cols-2 grid-cols-1 gap-3'>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <TalentCard height='md:h-[307px]' width='max-w-[469px]' key={index} />
                        ))}
                    </div>
            }
        </div>
    )
}

export default TalentList
