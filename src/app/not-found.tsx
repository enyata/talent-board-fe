import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='relative flex flex-col items-center justify-center h-screen text-center px-4'>
            <h2 className='text-3xl' >404</h2>
            <p>Could not find requested resource</p>
            <Link href="/" className='mt-4'>
                <Button>
                    Return Home
                </Button>
            </Link>
        </div>
    )
}