'use client'
import React, { useState } from 'react'
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

interface TalentboardProps {
    width?: string
    height?: string
    bookmarked?: boolean

    image_url?: string
    first_name?: string
    last_name?: string
    title?: string
    location?: string
    description?: string
    skills?: string[]
    upvotes?: number
    portfolio_url?: string
}

const TalentCard = ({
    width = 'max-w-[418px]',
    height = 'md:h-[291px]',
    bookmarked: initialBookmarked = false
}: TalentboardProps) => {
    const router = useRouter()
    const [bookmarked, setBookmarked] = useState(initialBookmarked)
    const [upvotes, setUpvotes] = useState(46)

    const handleCardClick = () => {
        router.push('/talents/1')
    }

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const handleBookmark = (e: React.MouseEvent) => {
        stopPropagation(e)
        setBookmarked(prev => !prev)
    }

    const handleUpvote = (e: React.MouseEvent) => {
        stopPropagation(e)
        setUpvotes(prev => prev + 1)
    }

    const handlePortfolioClick = (e: React.MouseEvent) => {
        stopPropagation(e)
        window.open('https://portfolio-link.com', '_blank')
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
                            <AvatarImage src='https://github.com/shadcn.png' />
                            <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='font-semibold text-[14px]'>Cameron Williamson</p>
                            <p className='font-medium text-[#5F5F5F] text-[13px]'>Senior Frontend Developer</p>
                        </div>
                    </div>

                    <Button
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
                    <p>Abuja</p>
                </div>

                <p className='mt-[8px] font-semibold text-[13px] text-[#5F5F5F]'>
                    Passionate frontend developer with expertise in building responsive and accessible web applications.
                    Focused on user experience and performance optimization.
                </p>

                <div className='mt-[16px] flex gap-2 flex-wrap'>
                    {['🔧 JavaScript', '⚡ Next.js', '📱 React Native'].map((skill, index) => (
                        <Button
                            key={index}
                            onClick={stopPropagation}
                            className='bg-[#F5F5F5] text-[#5F5F5F] h-[24px] rounded-[2px] p-[6px] text-[12px]'
                        >
                            {skill}
                        </Button>
                    ))}
                </div>
            </div>

            <div className='border-t-[2px] pt-[8px] border-[#E3E3E3] flex justify-between text-[#5F5F5F] text-[12px]'>
                <div
                    onClick={handleUpvote}
                    className='flex items-center font-semibold cursor-pointer'
                >
                    {upvotes}{' '}
                    <span className='ml-1'>
                        <ChevronUp size={12} strokeWidth={3} />
                    </span>
                </div>

                <div
                    onClick={handlePortfolioClick}
                    className='flex items-center font-semibold cursor-pointer'
                >
                    Portfolio{' '}
                    <span className='ml-2'>
                        <SquareArrowOutUpRightIcon size={12} strokeWidth={3} />
                    </span>
                </div>
            </div>
        </Card>
    )
}

export default TalentCard
