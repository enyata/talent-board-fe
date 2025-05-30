import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='relative flex flex-col items-center justify-center h-[calc(100vh-190px)] text-center px-4'>
            <h2 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white' >404</h2>
            <p className='text-muted-foreground max-w-md'>There is no talent with this resource</p>
            <Link href="/talents" className='mt-4'>
                <Button className="h-[42px]">
                    View All Talents
                </Button>
            </Link>
        </div>
    )
}