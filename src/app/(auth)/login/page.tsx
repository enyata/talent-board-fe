import React from "react";
import Link from "next/link";
import AuthForm from "../components/auth-form";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[360px] w-full">
      <h2 className="font-bold text-3xl">Login to your account</h2>
      <AuthForm action={"login"} />
      <p className="text-[14px] mt-[32px]">
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
