import Image from "next/image";
import Link from "next/link";
import React from "react";
import TestimonyCarousel from "./components/testimony-carousel";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:h-screen relative">
      <Link href={'/'} className="absolute md:top-[32px] top-[24px] md:left-[32px] left-[24px] text-[24px] font-semibold">Talentboard</Link>

      <div className="md:h-screen flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2  h-screen flex items-center justify-center">{children}</div>

        <div className="md:w-1/2 w-full  h-screen group relative">
          <Image
            src="/assets/images/auth-img.svg"
            alt="Auth image"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
          <TestimonyCarousel/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
