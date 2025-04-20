'use client';
import { motion } from "framer-motion";
import AuthForm from "../components/auth-form";
import Link from "next/link";

const SignupPage = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center max-w-[360px] w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-bold text-3xl text-center">Sign up</h2>
      <AuthForm action={"signup"} />
      <p className="text-[14px] mt-[32px]">
        Already have an account?
        <Link href={"/login"} className="font-bold">
          {" "}
          Login
        </Link>
      </p>
    </motion.div>
  );
};

export default SignupPage;
