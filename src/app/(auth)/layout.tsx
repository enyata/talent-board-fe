'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TestimonyCarousel from './components/testimony-carousel'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative md:h-screen">
      {/* <Link
        href="/"
        className="absolute md:top-[32px] top-[24px] md:left-[32px] left-[24px] text-[24px] font-semibold z-10 cursor-pointer"
      >
        Talentboard
      </Link> */}
      <Link
        href={"/"}
        className="absolute md:top-[32px] top-[24px] md:left-[32px] left-[24px] z-10 flex items-center gap-[4px] md:gap-[10px]"
      >
        <div className="relative size-[32px] md:size-[35px]">
          <Image
            src="/assets/icons/brand-icon.svg"
            alt="Talentboard Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-semibold md:text-[18px]">Talentboard</span>
      </Link>

      <div className="block md:flex md:min-h-screen overflow-y-scroll md:overflow-hidden">
        <section className="w-full md:w-1/2 flex items-center justify-center px-4 h-[850px]">
          {children}
        </section>

        <section className="w-full md:w-1/2 relative h-screen md:h-[unset]">
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
  );
};

export default AuthLayout
