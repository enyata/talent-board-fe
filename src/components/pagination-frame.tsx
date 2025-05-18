import React from 'react'
import { Separator } from './ui/separator'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'

const PaginationFrame = () => {
    return (
        <div className='mt-6 w-full'>
            <Separator className='h-[2px] bg' />
            <Pagination className='mt-[14px]'>
                <PaginationContent className='flex  flex-row justify-between w-full'>
                    <PaginationItem>
                        <PaginationPrevious href="#" className='bg-white border' />
                    </PaginationItem>
                    <div className='flex gap-1 '>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">20</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">21</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">21</PaginationLink>
                        </PaginationItem>
                    </div>
                    <PaginationItem>
                        <PaginationNext href="#" className='bg-white border' />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PaginationFrame
