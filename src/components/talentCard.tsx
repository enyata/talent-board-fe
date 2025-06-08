'use client'
import React, { useState } from 'react'
import { Card } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
    Bookmark,
    BookmarkCheck,
    ChevronDown,
    ChevronUp,
    MapPinned,
    SquareArrowOutUpRightIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { talentProp } from '@/types/user'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-toastify'
import skillsLibrary from '../../public/skills_library.json'
import { getSkillLabelByValue } from '@/lib/skills_sort'
import { getCountryNameByCode } from '@/lib/countryfromIsocode'
import { useSaveTalentMutation, useUpvoteTalentMutation } from '@/hooks/mutations/talent'

interface TalentboardProps {
    width?: string
    height?: string
    bookmarked?: boolean

    talent?: talentProp
}

const TalentCard = ({ width = 'max-w-[418px]', height = 'md:h-[291px]', talent }: TalentboardProps) => {
    const router = useRouter()
    const [bookmarked, setBookmarked] = useState(talent?.is_saved || false)
    const [isUpvoted, setIsUpvoted] = useState(talent?.is_upvoted || false)
    const [upvotes, setUpvotes] = useState(talent?.upvotes)
    const { user } = useAuthStore()

    const talentId = talent?.id || '';

    const { mutate: upvoteATalent, isPending: isUpvoting } = useUpvoteTalentMutation();
    const { mutate: saveATalent, isPending: isSaving } = useSaveTalentMutation()

    const handleCardClick = () => {
        if (!user) {
            router.push('/login')
            return
        }
        if (user && user?.role === 'talent') {
            toast.info('You need a recruiter account to view this talent profile.')
            return
        }
        if (user && user?.role === 'recruiter') {
            router.push(`/talents/${talent?.id}`)
        }
    }

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const handleBookmark = (e: React.MouseEvent) => {
        stopPropagation(e)
        if (!user) {
            router.push('/login')
            return
        }
        if (user && user?.role === 'talent') {
            toast.info('You need a recruiter account to bookmark this talent profile.')
            return
        }
        if (user && user?.role === 'recruiter') {
            setBookmarked(prev => !prev)
            saveATalent(talentId, {
                onSuccess: () => {
                    toast.success(`Talent ${!bookmarked ? 'bookmarked' : 'removed from bookmarks'} successfully!`)
                },
                onError: () => {
                    toast.error(`Failed to ${!bookmarked ? 'bookmark' : 'remove bookmark'} talent.`)
                },
            });
        }
    }

    const handleUpvote = (e: React.MouseEvent) => {
        stopPropagation(e)
        if (!user) {
            router.push('/login')
            return
        }
        if (user && user?.role === 'talent') {
            toast.info('You need a recruiter account to upvote this talent profile.')
            return
        }

        if (user && user?.role === 'recruiter') {
            if (!isUpvoted) {
                setUpvotes((prev) => (prev || 0) + 1)
            } else {
                setUpvotes((prev) => (prev || 0) - 1)
            }
            setIsUpvoted(prev => !prev)
            upvoteATalent(talentId, {
                onSuccess: () => {
                    toast.success(`Talent ${!isUpvoted ? 'upvoted' : 'downvoted'} successfully!`);
                },
                onError: () => {
                    toast.error(`Failed to ${!isUpvoted ? 'upvote' : 'downvote'} talent.`);
                },
            });
        }

    }

    const handlePortfolioClick = (e: React.MouseEvent, portfolio: string = '') => {
        stopPropagation(e)
        if (!user) {
            router.push('/login')
        }
        if (user && user?.role === 'talent') {
            toast.info('You need a recruiter account to access this profile.')
        }
        if (user && user?.role === 'recruiter') {
            window.open(portfolio, '_blank')
        }
    }

    return (
        <Card
            onClick={handleCardClick}
            className={`${width} ${height} min-h-[291px] flex flex-col justify-between w-full p-[20px] shadow-none cursor-pointer hover:bg-[#fafafa]`}
        >
            <div >
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <Avatar className='size-[48px]'>
                            <AvatarImage src={talent?.avatar} />
                            <AvatarFallback>{talent ? (talent.first_name ? talent.first_name.trim().charAt(0).toUpperCase() : '') : ''}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='font-semibold text-[14px]'>{talent?.first_name} {talent?.last_name}</p>
                            <p className='font-medium text-[#5F5F5F] text-[13px]'>{talent?.job_title}</p>
                        </div>
                    </div>

                    <Button
                        disabled={isSaving || isUpvoting}
                        onClick={handleBookmark}
                        variant='outline'
                        className='w-[75px] h-[28px] text-[#5F5F5F] rounded-[2px]'
                    >
                        Save <span>{bookmarked ? <BookmarkCheck /> : <Bookmark />}</span>
                    </Button>
                </div>

                <div className='flex items-center gap-1 text-[#5F5F5F] font-semibold text-[13px] mt-[24px]'>
                    <span>
                        <MapPinned size={14} strokeWidth={3} />
                    </span>
                    <p>{talent?.state} {getCountryNameByCode(talent?.country || '')}</p>
                </div>

                <p className='mt-[8px] font-semibold text-[13px] text-[#5F5F5F] text-ellipsis'>
                    {talent?.bio}
                </p>

                <div className='mt-[16px] flex gap-2 flex-wrap'>
                    {talent?.skills?.slice(0, 3).map((skill, index) => (
                        <Button
                            key={index}
                            onClick={stopPropagation}
                            className='bg-[#F5F5F5] text-[#5F5F5F] h-[24px] rounded-[2px] p-[6px] text-[12px]'
                        >
                            {getSkillLabelByValue(skill, skillsLibrary)}
                        </Button>
                    ))}
                </div>
            </div>

            <div className='border-t-[2px] pt-[8px] border-[#E3E3E3] flex justify-between text-[#5F5F5F] text-[12px]'>
                <button
                    disabled={isUpvoting || isSaving}
                    onClick={handleUpvote}
                    className='flex items-center font-semibold cursor-pointer border-none disabled:pointer-events-none disabled:opacity-50'
                >
                    {upvotes}{' '}
                    <span className='ml-1'>
                        {isUpvoted ?
                            <ChevronDown size={12} strokeWidth={3} /> :
                            <ChevronUp size={12} strokeWidth={3} />
                        }
                    </span>
                </button>

                {talent?.portfolio_url &&
                    <div
                        onClick={(e) => handlePortfolioClick(e, talent?.portfolio_url)}
                        className='flex items-center font-semibold cursor-pointer'
                    >
                        Portfolio{' '}
                        <span className='ml-2'>
                            <SquareArrowOutUpRightIcon size={12} strokeWidth={3} />
                        </span>
                    </div>
                }
            </div>
        </Card>
    )
}

export default TalentCard
