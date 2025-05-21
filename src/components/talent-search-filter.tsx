'use client';

import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Funnel, Search, X } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Checkbox } from './ui/checkbox';

export default function TalentSearchFilter() {
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
                    {/* Panel */}
                    {open && (
                        <div className="absolute left-0 top-full z-10 mt-2 w-full max-w-[859px] max-h-[500px] overflow-auto rounded-sm border bg-white p-4">
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
                            className="flex items-center gap-2 text-[#09090B] text-[14px] h-[42px]"
                        >
                            Filter <Funnel size={14} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='rounded-[8px] flex flex-col gap-[24px] shadow-none p-6 md:ml-20 min-w-[164px]'>
                        <p className='flex items-center gap-2 text-[#09090B] font-medium'>Filter by <Funnel size={16} /></p>
                        <div className='flex flex-col gap-2 text-[#696969]'>
                            {['Skills', 'Experience', 'Location'].map(item =>
                                <div key={item} className='flex items-center gap-[10px] '>
                                    <Checkbox className='size-5 border-[#CACACA]' />
                                    <label className='font-medium'>{item}</label>
                                </div>
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}