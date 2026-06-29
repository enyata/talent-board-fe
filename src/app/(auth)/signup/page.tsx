"use client";
import { motion } from "framer-motion";
import AuthForm from "../components/auth-form";
import Link from "next/link";
import React, { useState } from "react";
import CustomInput from "@/components/utils/custom-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { checkEmptyFields } from "@/lib/helpers";
import { showError, showSuccess } from "@/lib/Alerts";

const SignupPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formState;

    const isEmpty = checkEmptyFields({ password, email });

    if (!isEmpty) {
      if (password.length < 6) {
        showError("Password should be at least 6 characters");
        return;
      }

      if (password !== confirmPassword) {
        showError("Confirm password does not match new password");
        return;
      }

      showSuccess("All field validation pass!");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center max-w-[360px] w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-semibold text-[30px] text-center">Create account</h2>

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
          label="Create password"
          value={formState.password}
          name="password"
          onChange={handleOnChange}
          placeholder="******"
          type="password"
        />
        <CustomInput
          label="Repeat password"
          value={formState.confirmPassword}
          name="confirmPassword"
          onChange={handleOnChange}
          placeholder="******"
          type="password"
        />
        <Button type="submit" className="w-full h-[42px]">
          Create account
        </Button>
      </form>

      {/* Divider */}
      <div className="my-[32px] flex items-center gap-3 w-full">
        <Separator className="flex-1 border-[#D4D5D7]" />
        <span className="text-[14px] font-normal uppercase tracking-[0.16em]">
          or
        </span>
        <Separator className="flex-1 border-[#D4D5D7]" />
      </div>

      <AuthForm action={"signup"} />
      <p className="text-[14px] mt-[32px]">
        Already have an account?
        <Link href={"/login"} className="font-medium">
          {" "}
          Login
        </Link>
      </p>
    </motion.div>
  );
};

export default SignupPage;
