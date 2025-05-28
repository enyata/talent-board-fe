import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='relative flex flex-col items-center justify-center h-screen text-center px-4'>
            <h2 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white' >404</h2>
            <p className='text-muted-foreground max-w-md'>Could not find requested resource</p>
            <Link href="/" className='mt-4'>
                <Button className="h-[42px]">
                    Return Home
                </Button>
            </Link>
        </div>
    )
}