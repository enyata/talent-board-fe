import React from "react";
import Link from "next/link";
import Auth from "../components/auth";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto p-4">
      <h2 className="font-bold text-3xl">Login to your account</h2>

      {/* Using the one auth globally */}
      <Auth />

      <p>
        Dont have an account?
        <Link href={"/signup"} className="font-bold">
          {" "}
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
