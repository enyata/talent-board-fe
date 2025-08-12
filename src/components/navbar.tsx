import { Button } from './ui/button'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { DialogTitle } from './ui/dialog'
import { getUser } from '@/api/user'
import Image from 'next/image'

const Navbar = async () => {
  const user = await getUser();
  return (
    <>
      <nav
        className="fixed top-0 bg-white/50  backdrop-blur-lg left-0 right-0 z-50 p-6 text-foreground transition-all will-change-transform hidden md:block"
      >
        <div className="max-w-[1198px] mx-auto flex items-center justify-between">
          <Link href={'/'} className='flex items-center gap-[4px] md:gap-[10px]'>
            <div className='relative size-[32px] md:size-[45px]'>
              <Image
                src="/assets/icons/brand-icon.svg"
                alt="Talentboard Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-semibold md:text-[24px]">Talentboard</span>
          </Link>

          <ul className="flex gap-[28px] font-medium">
            <Link href="/#about"><li>About</li></Link>
            <Link href="/#talents"><li>Browse Talents</li></Link>
            <Link href="/#how-it-works"><li>How it works</li></Link>
          </ul>
          {
            user ?
              <Link href={'/dashboard'} className='font-medium'>Go to dashboard</Link> :
              <div>
                <Link href="/signup">
                  <Button variant="outline" className="w-[72px] h-[42px] cursor-pointer">Register</Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-primary w-[91px] h-[42px] ml-2 cursor-pointer">Login</Button>
                </Link>
              </div>
          }
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white md:hidden flex items-center justify-between px-4 py-4 border-b">
        <Link href={'/'} className='flex items-center gap-[4px] md:gap-[10px]'>
          <div className='relative size-[32px] md:size-[45px]'>
            <Image
              src="/assets/icons/brand-icon.svg"
              alt="Talentboard Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-semibold md:text-[24px]">Talentboard</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[260px] pt-6 px-6">
            <DialogTitle className="text-lg font-semibold">Talentboard</DialogTitle>
            <nav className="flex flex-col gap-5 text-[16px] font-medium">
              <Link href="/#about">About</Link>
              <Link href="/#talents">Browse Talents</Link>
              <Link href="/#how-it-works">How it works</Link>
              {
                user ?
                  <Link href={'/dashboard'} className='font-medium'>Go to dashboard</Link> :
                  <div className='w-full mt-6 flex flex-col '>
                    <Link href="/signup">
                      <Button variant="outline" className="w-full">Register</Button>
                    </Link>
                    <Link href="/login" className='mt-6'>
                      <Button className="w-full">Login</Button>
                    </Link>
                  </div>
              }
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Spacer */}
      <div className="md:h-[80px] h-[69px]" />
    </>
  )
}

export default Navbar
