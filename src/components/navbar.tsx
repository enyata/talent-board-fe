'use client';
import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from './ui/button'

const Navbar = () => {
  const controls = useAnimation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true)
        controls.start({ top: 0, backdropFilter: 'blur(12px)' })
      } else {
        setScrolled(false)
        controls.start({ top: 80, backdropFilter: 'blur(0px)' })
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [controls])


  return (
    <motion.nav
      animate={controls}
      initial={{ top: 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 right-0 z-50 px-6 py-4 bg-white/70 dark:bg-black/30 backdrop-blur-sm text-foreground transition-all"
      style={{ backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className='font-semibold text-[24px] cursor-pointer'>Talentboard</span>
        <div>
          <ul className='flex gap-[28px] font-medium'>
            <li>About</li>
            <li>Browse Talents</li>
            <li>How it works</li>
          </ul>
        </div>
        <div className=''>
          <Button variant={'outline'} className='w-[72px] h-[42px]'>Register</Button>
          <Button className='bg-primary w-[91px] h-[42px] ml-2'>Login</Button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
