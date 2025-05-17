import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import TalentList from './talent-list'

const TalentsPage = () => {
  return (
    <div className='px-4 md:px-0'>
      <Breadcrumb >
        <BreadcrumbList className='text-[14px]'>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard" className='flex items-center gap-1'>
              <Image
                src={'assets/icons/home.svg'}
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
            <BreadcrumbPage>Browse Talent</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='text-[#2D2D2D] mt-[36px]'>
        <h2 className='font-semibold text-[24px]'>Browse Talent</h2>
        <p className=' text-[14px]'>Find the perfect talent for your team from our curated list of professionals</p>
      </div>
      <TalentList />
    </div>
  )
}

export default TalentsPage
