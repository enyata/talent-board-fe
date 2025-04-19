import React from "react";
import AuthForm from "../components/auth-form";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[360px] w-full">
      <h2 className="font-bold text-3xl text-center">Sign up</h2>
      <AuthForm action={"signup"} />
      <p className="text-[14px] mt-[32px]">
        Already have an account?
        <Link href={"/Login"} className="font-bold">
          {" "}
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
