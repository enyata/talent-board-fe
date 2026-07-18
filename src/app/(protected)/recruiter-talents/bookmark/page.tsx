import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BookmarkedList from './bookmarked-list'

const BookmarkedTalentPage = () => {
    return (
        <div className='px-4 md:px-0'>
            <Breadcrumb>
                <BreadcrumbList className='text-[14px]'>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard" className='flex items-center gap-1'>
                            <Image
                                src={'/assets/icons/home.svg'}
                                alt="home"
                                height={16}
                                width={16}
                            />
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <ChevronRight />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Bookmarked Talent</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='text-[#2D2D2D] mt-[36px]'>
                <h2 className='font-semibold text-[24px]'>Bookmarked Talents</h2>
                <p className=' text-[14px]'>Your saved talent pool is ready. Access top candidates instantly whenever you need them.</p>
            </div>
            <BookmarkedList />
        </div>
    )
}

export default BookmarkedTalentPage
