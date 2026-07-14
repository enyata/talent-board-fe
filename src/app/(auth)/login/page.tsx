'use client';
import { motion } from "framer-motion";
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import SocialAuthButtons from "../components/social-auth-buttons";
import { checkEmptyFields } from "@/lib/helpers";
import { showSuccess } from "@/lib/Alerts";
import CustomInput from "@/components/utils/custom-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formState;

    const isEmpty = checkEmptyFields({ password, email });

    if (!isEmpty) {
      showSuccess("All field validation pass!");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center max-w-[360px] w-full"
    >
      <h2 className="font-semibold text-[30px] text-center text-[#050505]">
        Login to your account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-[16px] w-full mt-[32px]"
        noValidate
      >
        {/* Email */}
        <CustomInput
          label="Email address"
          value={formState.email}
          name="email"
          onChange={handleOnChange}
          placeholder="example@domain.com"
        />
        <CustomInput
          label="Password"
          value={formState.password}
          name="password"
          onChange={handleOnChange}
          placeholder="******"
          type="password"
        />
        <Button type="submit" className="w-full h-[42px]">
          Log in
        </Button>
        <p className="text-[14px]">
          Forgot password?
          <Link href={"/forgot-password"} className="text-primary font-medium">
            {" "}
            Reset Password
          </Link>
        </p>
      </form>

      {/* Divider */}
      <div className="my-[32px] flex items-center gap-3 w-full">
        <Separator className="flex-1 border-[#D4D5D7]" />
        <span className="text-[14px] font-normal uppercase tracking-[0.16em]">
          or
        </span>
        <Separator className="flex-1 border-[#D4D5D7]" />
      </div>

      <SocialAuthButtons action={"login"} />
      <p className="text-[14px] mt-[32px]">
        Dont have an account?
        <Link href={"/signup"} className="font-medium">
          {" "}
          Sign Up
        </Link>
      </p>
    </motion.div>
  );
};

export default LoginPage;
