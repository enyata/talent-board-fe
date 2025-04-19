import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[#FAFAFA] py-[80px] '>
      <div className='max-w-[1200px] w-full mx-auto text-[14px] text-muted-foreground'>
        <div className=' flex justify-between'>
          <div>
            <p className='text-[24px] font-semibold text-black'> Talentboard</p>
            <p className='text-[14px] font-semibold text-black'>A product of <br />Enyata Community</p>
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
        <div className='flex justify-between mt-[64px]'>
          <span>&copy; {new Date().getFullYear()} Enyata Talent Board</span>
          <div className='flex gap-2'>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
