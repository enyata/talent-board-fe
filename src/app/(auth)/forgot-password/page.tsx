"use client";
import { motion } from "framer-motion";
import React, { ChangeEvent, useState } from "react";
import { checkEmptyFields } from "@/lib/helpers";
import { showSuccess } from "@/lib/Alerts";
import CustomInput from "@/components/utils/custom-input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
  });

  const canSubmit = formState.email.trim();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = formState;

    const isEmpty = checkEmptyFields({ email });

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
        Forgot password?
      </h2>
      <p className="text-[#667085]">
        No worries, we'll send you reset instructions.
      </p>

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
        <Button type="submit" className="w-full h-[42px]" disabled={!canSubmit}>
          Send reset link
        </Button>
      </form>
      <p
        className="flex items-center gap-2 text-[14px] mt-[32px] cursor-pointer text-[#677A8C] hover:text-black"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-3.5" />
        Back to Login
      </p>
    </motion.div>
  );
};

export default LoginPage;
