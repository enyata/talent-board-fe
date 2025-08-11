'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TestimonyCarousel from './components/testimony-carousel'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentIndex = useRef(0)
  const isThrottled = useRef(false)
  const sectionCount = 2

  const scrollToSection = (index: number) => {
    const container = containerRef.current
    if (!container) return

    const sections = container.querySelectorAll<HTMLElement>('section')
    const target = sections[index]
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container || window.innerWidth >= 768) return // Only on mobile

    const handleScroll = (e: WheelEvent) => {
      if (isThrottled.current) return

      isThrottled.current = true
      setTimeout(() => (isThrottled.current = false), 800)

      const delta = e.deltaY

      if (delta > 0 && currentIndex.current < sectionCount - 1) {
        currentIndex.current++
        scrollToSection(currentIndex.current)
      } else if (delta < 0 && currentIndex.current > 0) {
        currentIndex.current--
        scrollToSection(currentIndex.current)
      }
    }

    container.addEventListener('wheel', handleScroll, { passive: false })
    return () => container.removeEventListener('wheel', handleScroll)
  }, [])

  return (
    <div className="relative md:h-screen">
      <Link
        href="/"
        className="absolute md:top-[32px] top-[24px] md:left-[32px] left-[24px] text-[24px] font-semibold z-10 cursor-pointer"
      >
        Talentboard
      </Link>

      <div
        ref={containerRef}
        className="block md:flex md:h-screen overflow-y-scroll md:overflow-hidden"
      >
        <section className="w-full md:w-1/2 h-screen flex items-center justify-center px-4">
          {children}
        </section>

        <section className="w-full md:w-1/2 h-screen relative">
          <Image
            src="/assets/images/auth-img.avif"
            alt="Auth image"
            width={500}
            height={500}
            loading="lazy"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <TestimonyCarousel />
        </section>
      </div>
    </div>
  )
}

export default AuthLayout
