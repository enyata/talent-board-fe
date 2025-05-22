'use client';

import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Funnel, Search, X } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Checkbox } from './ui/checkbox';
import { Controller, useForm } from 'react-hook-form';
import { Label } from './ui/label';
import { ChooseExperienceLevel } from './choose-experience-button';
import { CountrySelect } from './ui/country-select';
import { StateSelect } from './ui/state-select';
import { SkillButton } from './skill-button';
import { SKILLSET } from '@/constants';
import { ButtonWithLoader } from './ui/button-with-loader';
import { useRouter, useSearchParams } from 'next/navigation';

interface TalentSearchFilterProps {
    isLoading?: boolean;
    queryStringValue?: string;
    setQueryStringValue: (q: string) => void
}

export default function TalentSearchFilter({ isLoading, setQueryStringValue }: TalentSearchFilterProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (!open) setOpen(true);
    };

    // Close when clicking outside
    React.useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    // Toggle panel with CMD+F or CTRL+F
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const params = useSearchParams();
    const router = useRouter();
    const arrParam = (key: string): string[] =>
        (params.get(key) || '')
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);

    const strParam = (key: string): string =>
        (params.get(key) || '').trim();

    const { control, reset, watch } = useForm({
        defaultValues: {
            q: strParam('q') || '',
            limit: strParam('limit') || undefined,
            filter_options: arrParam('filter_options') || [] as string[],
            experience: strParam('experience') || '',
            country: strParam('country') || '',
            state: strParam('state') || '',
            skills: arrParam('skills') || [] as string[]
        },
    });
    const query = watch('q');
    const limit = watch('limit');
    const filterOptions = watch('filter_options');
    const experienceLevel = watch('experience');
    const country = watch('country');
    const state = watch('state');
    const skills = watch('skills');

    const handleFilter = () => {
        const params: Record<string, string> = {
            filter_options: filterOptions.join(','),
        };
        if (query) params.q = query;
        if (limit !== undefined) params.limit = limit.toString();
        if (filterOptions.includes('experience') && experienceLevel)
            params.experience = experienceLevel;
        if (filterOptions.includes('skills') && skills.length)
            params.skills = skills.join(',');
        if (filterOptions.includes('location')) {
            if (country) params.country = country;
            if (state) params.state = state;
        }
        const queryString = new URLSearchParams(params).toString();
        setQueryStringValue(queryString);
        router.replace(`?${queryString}`, { scroll: false });
        // window.history.replaceState({}, '', `?${queryString}`);
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
                        <span className={`${value !== '' ? 'hidden' : 'block'} absolute left-3 top-1/2 -translate-y-1/2 text-[#AFAFAF]`}><Search strokeWidth={1} size={18} /></span>
                        <Input
                            className={`w-full rounded-sm h-[42px] text-[14px] pr-10 ${value !== '' ? 'pl-3' : 'pl-8'}`}
                            placeholder="Search by skill, job title or name"
                            value={value}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Search Suggestion Panel */}
                    {open && (
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
                            <p className='text-sm'>{value ? `Result for "${value}"` : 'Start typing...'}</p>
                            <ul className=" list-inside space-y-1 text-sm mt-2">
                                {['React Developer', 'Product Designer', 'Backend Developer'].map(item =>
                                    <li
                                        key={item}
                                        className=' hover:bg-gray-50 p-2  cursor-pointer rounded-sm'
                                        onClick={() => {
                                            setValue(item);
                                            setOpen(false);
                                        }}
                                    >
                                        {item}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
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
                                                    setValue('state'); // Reset state
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
                            <div>
                                <DropdownMenuSeparator />
                                <Label htmlFor='experience-level' className='font-normal text-[14px] mt-4'>Select skills that apply</Label>
                                <Controller
                                    control={control}
                                    name="skills"
                                    render={({ field }) => (
                                        <div className="flex flex-wrap gap-4 mt-1">
                                            {SKILLSET.slice(0, 8).map((skill, i) => {
                                                const selected = field?.value?.includes(skill);

                                                return (
                                                    <SkillButton
                                                        key={i}
                                                        skill={skill}
                                                        selected={selected}
                                                        onToggle={(s, isSel) => {
                                                            const newArr = isSel
                                                                ? [...field.value, s] // add
                                                                : field.value.filter((sk) => sk !== s); // remove
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
                                Show result {watch('filter_options').length !== 0 ? `(${watch('filter_options').length})` : ''}
                            </ButtonWithLoader>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
