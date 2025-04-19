import React from "react";
import Auth from "../components/auth";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto p-4">
      <h2 className="font-bold text-3xl text-center">Sign up</h2>

      {/* Using the one auth globally */}
      <Auth />

      <p>
        <Link href={"/login"} className="">
          Already have an account?
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
