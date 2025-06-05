'use client';

import React, { useCallback } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Funnel, Search, X } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Checkbox } from './ui/checkbox';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from './ui/label';
import { ChooseExperienceLevel } from './choose-experience-button';
import { CountrySelect } from './ui/country-select';
import { StateSelect } from './ui/state-select';
import { SkillButton } from './skill-button';
import { ButtonWithLoader } from './ui/button-with-loader';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { TalentFilterForm } from '@/types/filters';
import { flattenAndSortSkills } from '@/lib/skills_sort';
import skillsLibrary from '../../public/skills_library.json';


interface TalentSearchFilterProps {
    isLoading?: boolean;
    queryStringValue?: string;
    setQueryStringValue: (q: string) => void
}

export default function TalentSearchFilter({ isLoading, setQueryStringValue }: TalentSearchFilterProps) {
    const SKILLSET = flattenAndSortSkills(skillsLibrary);

    const wrapperRef = React.useRef<HTMLDivElement>(null);

    // Close search panel when clicking outside
    // React.useEffect(() => {
    //     const handleOutside = (e: MouseEvent) => {
    //         if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
    //             setOpen(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleOutside);
    //     return () => document.removeEventListener('mousedown', handleOutside);
    // }, []);
    const router = useRouter();

    const { control, reset, watch, setValue, register } = useFormContext<TalentFilterForm>();
    const query = watch('q');
    const limit = watch('limit');
    const filterOptions = watch('filter_options');
    const experienceLevel = watch('experience');
    const country = watch('country');
    const state = watch('state');
    const skills = watch('skills');
    const cursor = watch('cursor');
    const direction = watch('direction');

    const buildQueryString = useCallback(() => {
        const params: Record<string, string> = {};
        if (filterOptions.length) params.filter_options = filterOptions.join(',');
        if (query) params.q = query;
        if (limit !== undefined) params.limit = limit.toString();
        if (cursor) params.cursor = cursor;
        if (direction) params.direction = direction;
        if (filterOptions.includes('experience') && experienceLevel)
            params.experience = experienceLevel;
        if (filterOptions.includes('skills') && skills.length)
            params.skills = skills.join(',');
        if (filterOptions.includes('location')) {
            if (country) params.country = country;
            if (state) params.state = state;
        }
        return new URLSearchParams(params).toString();
    }, [filterOptions, query, limit, experienceLevel, skills, country, state, cursor, direction])

    const debouncedSearch = useDebounce(query, 300);

    // Update query string when search input changes
    React.useEffect(() => {
        if (debouncedSearch === undefined) return
        const queryString = buildQueryString();
        setQueryStringValue(queryString);
        router.replace(`?${queryString}`, { scroll: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch])

    React.useEffect(() => {
        const queryString = buildQueryString();
        const down = (e: KeyboardEvent) => {
            if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setQueryStringValue(queryString);
                router.replace(`?${queryString}`, { scroll: false });
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [buildQueryString, router, setQueryStringValue]);

    const handleFilter = () => {
        const queryString = buildQueryString();
        setQueryStringValue(queryString);
        router.replace(`?${queryString}`, { scroll: false });
    }

    const handleReset = () => {
        reset({
            filter_options: [],
            experience: '',
            country: '',
            state: '',
            skills: []
        });
        router.push(window.location.pathname);
    }

    console.log('my search form', watch());


    return (
        <div className="relative">
            <div className="flex items-center gap-2">
                {/* Input with shortcut hint */}
                <div ref={wrapperRef} className='w-full'>
                    <div className="relative w-full">
                        <p className=" hidden md:block text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2">
                            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 px-1.5 font-mono text-[10px] font-medium">
                                <span className="text-xs rounded bg-muted text-muted-foreground opacity-100 size-5 flex items-center justify-center">
                                    ⌘
                                </span>{' '}
                                <span className="rounded bg-muted text-muted-foreground opacity-100 size-5 flex items-center justify-center">
                                    F
                                </span>
                            </kbd>
                        </p>
                        <span className={`${query !== '' ? 'hidden' : 'block'} absolute left-3 top-1/2 -translate-y-1/2 text-[#AFAFAF]`}><Search strokeWidth={1} size={18} /></span>
                        <Input
                            className={`w-full rounded-sm h-[42px] text-[14px] pr-10 ${query !== '' ? 'pl-3' : 'pl-8'}`}
                            placeholder="Search by skill, job title or name"
                            {...register('q')}
                        />
                    </div>
                    {/* Search Suggestion Panel */}
                    {/* {open && (
                        <div className="absolute left-0 top-full z-10 mt-2 w-full max-w-[859px] max-h-[500px] overflow-auto rounded-sm border shadow-lg bg-white p-5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Suggestions</span>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-lg leading-none cursor-pointer absolute top-3 right-3"
                                >
                                    <X strokeWidth={2} size={14} />
                                </button>
                            </div>
                            <p className='text-sm'>{query ? `Result for "${query}"` : 'Start typing...'}</p>
                            <ul className=" list-inside space-y-1 text-sm mt-2">
                                {isSuggestionLoading ? (
                                    <div>
                                        {
                                            Array.from({ length: 3 }).map((_, i) => (
                                                <Skeleton key={i} className='max-w-[50px] w-full h-[16px]' />
                                            ))
                                        }
                                    </div>
                                ) : (
                                    suggestions?.map((item: string) => (
                                        <li
                                            key={item}
                                            className="hover:bg-gray-50 p-2 cursor-pointer rounded-sm"
                                            onClick={() => {
                                                setValue('q', item);
                                                setOpen(false);
                                            }}
                                        >
                                            {item}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )} */}
                </div>
                {/* Filter button */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 focus-none rounded-[4px] text-[#09090B] text-[14px] h-[42px]"
                        >
                            Filter <Funnel size={14} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='rounded-[8px] gap-0 flex flex-col p-5 w-full max-w-[300px] md:max-w-[469px] shadow-lg'>
                        <p className='flex items-center gap-2 text-[#09090B] font-medium'>Filter by <Funnel size={16} /></p>
                        <DropdownMenuItem className='absolute text-[#09090B] top-3 right-3'> <X strokeWidth={2} size={16} /></DropdownMenuItem>
                        <DropdownMenuSeparator className='mt-[16px]' />
                        <Controller
                            name="filter_options"
                            control={control}
                            render={({ field }) => (
                                <div className="flex flex-col mt-[20px] md:flex-row gap-6 text-[#696969]">
                                    {['skills', 'experience', 'location'].map((item) => {
                                        const isChecked = field.value.includes(item);

                                        return (
                                            <div key={item} className="flex items-center gap-[10px]">
                                                <Checkbox
                                                    checked={isChecked}
                                                    onCheckedChange={(checked) => {
                                                        const newValue = checked
                                                            ? [...field?.value, item] // add
                                                            : field?.value?.filter((v: string) => v !== item); // remove
                                                        field.onChange(newValue);
                                                    }}
                                                    className="size-5 border-[#CACACA] data-[state=checked]:bg-[#E5E4DE] data-[state=checked]:border-[#5F5F5F] data-[state=checked]:text-black"
                                                />
                                                <label className="font-medium capitalize">{item}</label>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        />
                        <DropdownMenuSeparator className='mt-[40px]' />
                        {/* EXPERIENCE LEVEL */}
                        <div className=' flex flex-col gap-5'>
                            <div className='mt-4'>
                                <Label htmlFor='experience-level' className='font-normal text-[14px]'>Select experience that apply</Label>
                                <div id='experience-level' className='flex gap-[10px] mt-1  w-full justify-between'>
                                    <Controller
                                        control={control}
                                        name="experience"
                                        render={({ field }) => (
                                            <div
                                                id="experience-level"
                                                className="flex flex-col md:flex-row gap-[10px] w-full justify-between"
                                            >
                                                {['entry', 'intermediate', 'expert'].map((lvl) => (
                                                    <ChooseExperienceLevel
                                                        key={lvl}
                                                        level={lvl}
                                                        selected={field.value === lvl}
                                                        onSelect={field.onChange}
                                                        className='rounded-[3px]'
                                                        selectedBorderClass='border-[#696969]'

                                                    />
                                                ))}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* LOCATION */}
                            <div>
                                <DropdownMenuSeparator />
                                {/* <Label htmlFor='experience-level' className='font-normal text-[14px] mt-4'>Enter location to search for here</Label> */}
                                <div className="mt-4 flex flex-col md:flex-row gap-[24px] justify-between">
                                    {/* Country */}
                                    <Controller
                                        control={control}
                                        name="country"
                                        render={({ field }) => (
                                            <CountrySelect
                                                value={field.value}
                                                onChange={(val) => {
                                                    field.onChange(val);
                                                    setValue('state', ''); // Reset state
                                                }}
                                            />
                                        )}
                                    />

                                    {/* State */}
                                    <Controller
                                        control={control}
                                        name="state"
                                        render={({ field }) => (
                                            <StateSelect
                                                countryCode={country}
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={!country}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            {/* SKILL */}
                            <div className=''>
                                <DropdownMenuSeparator />
                                <Label htmlFor='experience-level' className='font-normal text-[14px] mt-4'>Select skills that apply</Label>
                                <Controller
                                    control={control}
                                    name="skills"
                                    render={({ field }) => (
                                        <div className="flex flex-wrap gap-4 mt-1 max-h-[200px] overflow-y-scroll p-2">
                                            {SKILLSET.map((skill, i) => {
                                                const selected = field?.value?.includes(skill.value);

                                                return (
                                                    <SkillButton
                                                        key={i}
                                                        skill={skill.label}
                                                        selected={selected}
                                                        onToggle={() => {
                                                            const newArr = selected
                                                                ? field.value.filter((v) => v !== skill.value) // remove
                                                                : [...(field.value ?? []), skill.value]; // add
                                                            field.onChange(newArr);
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                />

                            </div>
                        </div>
                        <div className='flex justify-between mt-5'>
                            <Button
                                disabled={filterOptions.length < 1 || isLoading}
                                onClick={handleReset} variant={'outline'}
                                className='rounded-[7px]'>
                                Reset
                            </Button>
                            <ButtonWithLoader
                                isLoading={isLoading}
                                disabled={filterOptions.length < 1 || isLoading}
                                variant='outline'
                                className='rounded-[7px]'
                                onClick={handleFilter}
                            >
                                Show result
                                 {/* {watch('filter_options').length !== 0 ? `(${watch('filter_options').length})` : ''} */}
                            </ButtonWithLoader>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
