'use client';
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import AuthForm from "../components/auth-form";

const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center max-w-[360px] w-full"
    >
      <h2 className="font-bold text-3xl">Login to your account</h2>
      <AuthForm action={"login"} />
      <p className="text-[14px] mt-[32px]">
        Dont have an account?
        <Link href={"/signup"} className="font-bold">
          {" "}
          Sign Up
        </Link>
      </p>
    </motion.div>
  );
};

export default LoginPage;
