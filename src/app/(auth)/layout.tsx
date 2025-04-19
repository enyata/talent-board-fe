import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen relative">
      <Link href={'/'} className="absolute top-15 left-15">Talentboard</Link>

      <div className="h-screen flex items-center justify-center">
        <div className="w-full md:w-1/2">{children}</div>

        <div className="w-1/2 hidden md:block h-screen">
          <Image
            src="/assets/images/authimage.png"
            alt="Auth side image"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
