import React, { useState, useTransition } from 'react'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ButtonWithLoader } from '@/components/ui/button-with-loader'
import { useRouter } from 'next/navigation'
import { POST } from '@/lib/requests'
import { toast } from 'react-toastify'

const LogoutModal = ({ setOpenDialog }: { setOpenDialog: (arg0: boolean) => void }) => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition();
  const handleLogout = () => {
    startTransition(async () => {
      try {
        const res = await POST(
          `/api/v1/auth/logout`
        );
        if (res.status !== "success") {
          toast.error(res.message || "Something went wrong");
          return;
        }
        setOpenDialog(false)
        toast.success('Logged out successfully')
        router.replace('/login')


      } catch (error) {
        console.error("Error from form submission:", error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };
  return (
    <DialogContent className='w-[482px] rounded-[8px] md:gap-[48px] justify-center'>
      <DialogTitle className='hidden' />
      <Image
        src="/assets/images/danger-alert.svg"
        alt="logout"
        width={118}
        height={118}
        className='mx-auto'
      />
      <div>
        <p className='text-[20px] font-semibold text-center'>Are you sure you want to log out?</p>
        <p className='text-[14px] text-center'>You’ll be signed out of your Talentboard account. You can log back in anytime.</p>
      </div>
      <div className=' flex justify-between items-center gap-[4px]'>
        <Button
          className='rounded-[6px] h-[48px] w-full flex-1'
          variant={'outline'}
          onClick={() => setOpenDialog(false)}
        >
          Cancel
        </Button>
        <ButtonWithLoader
          onClick={handleLogout}
          isLoading={isPending}
          disabled={isPending}
          className='rounded-[6px] h-[48px] w-full flex-1 bg-[#EA4335] hover:bg-[#EA4335]/90'
        >
          Log Out
        </ButtonWithLoader>
      </div>
    </DialogContent>
  )
}

export default LogoutModal
