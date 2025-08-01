'use client';
import { Separator } from './ui/separator'
import { useFormContext } from 'react-hook-form';
import { TalentFilterForm } from '@/types/filters';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TalentPaginationFilterProps {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    nextCursor?: string;
    previousCursor?: string;
    count?: number;
    isLoading?: boolean;
    queryStringValue?: string;
    setQueryStringValue: (q: string) => void
}
const PaginationFrame = ({ setQueryStringValue, nextCursor, previousCursor, hasNextPage, hasPreviousPage }: TalentPaginationFilterProps) => {

    const { watch, setValue } = useFormContext<TalentFilterForm>();
    const query = watch('q');
    const limit = watch('limit');
    const filterOptions = watch('filter_options');
    const experienceLevel = watch('experience');
    const country = watch('country');
    const state = watch('state');
    const skills = watch('skills');
    const cursor = watch('cursor');
    const direction = watch('direction');

    const buildQueryStringWithOverrides = ({
        cursor: overrideCursor,
        direction: overrideDirection,
    }: {
        cursor?: string;
        direction?: string;
    }) => {
        const params: Record<string, string> = {};

        const effectiveCursor = overrideCursor ?? cursor;
        const effectiveDirection = overrideDirection ?? direction;

        if (filterOptions.length) params.filter_options = filterOptions.join(',');
        if (query) params.q = query;
        if (limit !== undefined) params.limit = limit.toString();
        if (effectiveCursor) params.cursor = effectiveCursor;
        if (effectiveDirection) params.direction = effectiveDirection;
        if (filterOptions.includes('experience') && experienceLevel)
            params.experience = experienceLevel;
        if (filterOptions.includes('skills') && skills.length)
            params.skills = skills.join(',');
        if (filterOptions.includes('location')) {
            if (country) params.country = country;
            if (state) params.state = state;
        }

        return new URLSearchParams(params).toString();
    };


    const handlePagination = async (selectedCursor: string, directionValue: 'next' | 'prev') => {
        setValue('cursor', selectedCursor, { shouldDirty: true });
        setValue('direction', directionValue, { shouldDirty: true });
        const queryString = buildQueryStringWithOverrides({
          cursor: selectedCursor,
          direction: directionValue,
        });
      
        setQueryStringValue(queryString);
      };
      
    return (
        <div className='mt-6 w-full'>
            <Separator className='h-[2px] bg' />

            <div className='flex items-center  flex-row justify-between w-full mt-[14px]'>
                <Button
                    disabled={!hasPreviousPage || !previousCursor}
                    variant={'outline'}
                    className='flex items-center gap-2'
                    onClick={
                        () => {
                            if (hasPreviousPage && previousCursor) {
                                handlePagination(previousCursor, 'prev');
                            }
                        }}
                >
                    <ChevronLeft />
                    <span>Prev</span>
                </Button>
                <Button
                    disabled={!hasNextPage || !nextCursor}
                    variant={'outline'}
                    className='flex items-center gap-2'
                    onClick={
                        () => {
                            if (hasNextPage && nextCursor) {
                                handlePagination(nextCursor, 'next');
                            }
                        }
                    }
                >
                    <span>Next</span>
                    <ChevronRight />
                </Button>
            </div>

        </div>
    )
}

export default PaginationFrame
