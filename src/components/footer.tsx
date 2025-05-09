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
            <p className='mt-[18px]'>Terms and Conditions</p>
            <p className='mt-[16px]'>Privacy Policy</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row justify-between mt-[64px] gap-4 md:gap-0 text-center md:text-left'>
          <span>&copy; {new Date().getFullYear()} Enyata Talent Board</span>
          <div className='flex justify-center md:justify-end gap-2'>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer
