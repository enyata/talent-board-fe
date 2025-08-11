import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[#FAFAFA] py-[80px] px-4'>
      <div className='max-w-[1200px] w-full mx-auto text-[14px] text-muted-foreground'>

        {/* Top Section */}
        <div className='flex flex-col md:flex-row md:justify-between gap-12'>
          <div>
            <p className='text-[24px] font-semibold text-black'>Talentboard</p>
            <p className='text-[14px] font-semibold text-black mt-2'>
              A product of <br />Enyata Community
            </p>
          </div>

          <div>
            <p className='text-[14px] font-semibold text-black'>About</p>
            <p className='mt-[18px]'>About</p>
            <p className='mt-[16px]'>How it works</p>
          </div>

          <div>
            <p className='text-[14px] font-semibold text-black'>Legal</p>
            <div className='mt-[18px]'>
              <Link href={'/terms-of-service'}>Terms and Conditions</Link>
            </div>
            <div className='mt-[16px]'>
              <Link href={'/privacy-policy'}>Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row justify-between mt-[64px] gap-4 md:gap-0 text-center md:text-left'>
          <span>&copy; {new Date().getFullYear()} Enyata Talent Board</span>
          <div className='flex justify-center md:justify-end gap-2'>
            <Link href={'/privacy-policy'}>Privacy Policy</Link>
            <Link href={'/terms-of-service'}>Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
