'use client';
import ConfettiComponent from '@/components/confetti-component';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

const SuccessComponent = () => {
    const router = useRouter();
    return (
        <div className='w-full max-w-[428px] px-[24px] py-[32px] relative flex flex-col justify-center items-center text-center'>
            <p className='text-3xl font-semibold'>Welcome onboard! <span className='text-primary '>David</span></p>
            <p className='text-[14px] mt-2'>Continue to your dashboard</p>
            <ConfettiComponent className='mt-[36px]' />
            <Button onClick={() => router.push('/dashboard')} className='h-[42px] font-semibold mt-[36px] w-full cursor-pointer'>
                Go to Dashboard
            </Button>
        </div>
    )
}

export default SuccessComponent

