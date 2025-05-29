'use client'
import React, { useState, useTransition } from 'react'
import { Card } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
    Bookmark,
    BookmarkCheck,
    ChevronUp,
    MapPinned,
    SquareArrowOutUpRightIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { talentProp } from '@/types/user'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-toastify'
import { useTalentApi } from '@/hooks/useTalents'
import skillsLibrary from '../../public/skills_library.json'
import { getSkillLabelByValue } from '@/lib/skills_sort'
import { getCountryNameByCode } from '@/lib/countryfromIsocode'

interface TalentboardProps {
    width?: string
    height?: string
    bookmarked?: boolean

    talent?: talentProp
}

const TalentCard = ({ width = 'max-w-[418px]', height = 'md:h-[291px]', bookmarked: initialBookmarked = false, talent }: TalentboardProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const [bookmarked, setBookmarked] = useState(initialBookmarked)
    const [upvotes, setUpvotes] = useState(talent?.upvotes)
    const [isUpvoted, setIsUpvoted] = useState(false)
    const { user } = useAuthStore()
    const { upvoteTalent, saveTalent } = useTalentApi()

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
        if (!user || user?.role === 'talent') {
            return
        }
        setBookmarked(prev => !prev)
        startTransition(() => {
            saveTalent(talent?.id || '')
                .then(() => {
                    toast.success(`Talent ${!bookmarked ? 'bookmarked' : 'removed from bookmarks'} successfully!`)
                })
                .catch((error) => {
                    console.error('Error saving talent:', error)
                    toast.error(`Failed to ${!bookmarked ? 'bookmark' : 'remove bookmark'} talent.`)
                })
        })
    }

    const handleUpvote = (e: React.MouseEvent) => {
        stopPropagation(e)
        if (!user || user?.role === 'talent') {
            return
        }
        if (isUpvoted) {
            toast.info('You have already upvoted this talent.')
            return
        }
        setIsUpvoted(true)
        setUpvotes((prev) => (prev || 0) + 1)
        startTransition(() => {
            upvoteTalent(talent?.id || '')
                .then(() => {
                    toast.success('Talent upvoted successfully!')
                })
                .catch((error) => {
                    console.error('Error upvoting talent:', error)
                    toast.error('Failed to upvote talent.')
                })
        })

    }

    const handlePortfolioClick = (e: React.MouseEvent, portfolio: string = '') => {
        stopPropagation(e)
        if (!user || user?.role === 'talent') {
            return
        }
        window.open(portfolio, '_blank')
    }

    return (
        <Card
            onClick={handleCardClick}
            className={`${width} ${height} w-full p-[20px] shadow-none cursor-pointer hover:bg-[#fafafa]`}
        >
            <div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <Avatar className='size-[48px]'>
                            <AvatarImage src={talent?.avatar} />
                            <AvatarFallback>{talent ? (talent.first_name ? talent.first_name.trim().charAt(0).toUpperCase() : '') : ''}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='font-semibold text-[14px]'>{talent?.first_name} {talent?.last_name}</p>
                            <p className='font-medium text-[#5F5F5F] text-[13px]'>{talent?.title}</p>
                        </div>
                    </div>

                    <Button
                        disabled={isPending}
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
                    <p>{getCountryNameByCode(talent?.country || '')}</p>
                </div>

                <p className='mt-[8px] font-semibold text-[13px] text-[#5F5F5F]'>
                    Passionate frontend developer with expertise in building responsive and accessible web applications.
                    Focused on user experience and performance optimization.
                </p>

                <div className='mt-[16px] flex gap-2 flex-wrap'>
                    {talent?.skills?.map((skill, index) => (
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
                    disabled={isPending}
                    onClick={handleUpvote}
                    className='flex items-center font-semibold cursor-pointer border-none'
                >
                    {upvotes}{' '}
                    <span className='ml-1'>
                        <ChevronUp size={12} strokeWidth={3} />
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
