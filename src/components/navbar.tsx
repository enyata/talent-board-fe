'use client'

import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  const controls = useAnimation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY

      if (y > 80) {
        controls.start({
          y: 0,
          opacity: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: { type: 'tween', duration: 0.2, ease: 'easeOut' },
        })
      } else {
        controls.start({
          y: 80,
          opacity: 0.9,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
          transition: { type: 'tween', duration: 0.2, ease: 'easeOut' },
        })
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [controls])

  return (
    <>
      <motion.nav
        animate={controls}
        initial={{
          y: 80,
          opacity: 0.9,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
        }}
        className="fixed left-0 right-0 z-50 px-6 py-4 text-foreground transition-all will-change-transform"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-semibold text-[24px] cursor-pointer">Talentboard</span>
          <ul className="flex gap-[28px] font-medium">
            <Link href='/#about'>
              <li>About</li>
            </Link>
            <Link href='/#talents'>
              <li>Browse Talents</li>
            </Link>
            <Link href='/#how-it-works'>
              <li>How it works</li>
            </Link>
          </ul>
          <div>
            <Link href="/signup">
              <Button variant="outline" className="w-[72px] h-[42px] cursor-pointer">
                Register
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-primary w-[91px] h-[42px] ml-2 cursor-pointer">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>
      <div className="h-[80px]" />
    </>
  )
}

export default Navbar
