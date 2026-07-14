"use client";
import { motion } from "framer-motion";
import React, { ChangeEvent, useState } from "react";
import { checkEmptyFields, getApiErrorMessage } from "@/lib/helpers";
import { showError, showSuccess } from "@/lib/Alerts";
import CustomInput from "@/components/utils/custom-input";
import { ButtonWithLoader } from "@/components/ui/button-with-loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const ForgotPasswordForm = ({
  email,
  isSubmitting,
  onChange,
  onSubmit,
  onBack,
}: {
  email: string;
  isSubmitting: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) => {
  const canSubmit = email.trim();

  return (
    <>
      <h2 className="font-semibold text-[30px] text-center text-[#050505]">
        Forgot password?
      </h2>
      <p className="text-[#667085]">
        No worries, we'll send you reset instructions.
      </p>

      <form
        onSubmit={onSubmit}
        className="space-y-[16px] w-full mt-[32px]"
        noValidate
      >
        {/* Email */}
        <CustomInput
          label="Email address"
          value={email}
          name="email"
          onChange={onChange}
          placeholder="example@domain.com"
        />
        <ButtonWithLoader
          type="submit"
          className="w-full h-[42px]"
          isLoading={isSubmitting}
          disabled={!canSubmit || isSubmitting}
        >
          Send reset link
        </ButtonWithLoader>
      </form>
      <p
        className="flex items-center gap-2 text-[14px] mt-[32px] cursor-pointer text-[#677A8C] hover:text-black"
        onClick={onBack}
      >
        <ArrowLeft className="size-3.5" />
        Back to Login
      </p>
    </>
  );
};

const CheckEmail = ({
  email,
  isResending,
  onResend,
  onBack,
}: {
  email: string;
  isResending: boolean;
  onResend: () => void;
  onBack: () => void;
}) => {
  const handleOpenEmailApp = () => {
    window.location.href = "mailto:";
  };

  return (
    <>
      <Image
        src="/assets/icons/email-icon.svg"
        alt="Email"
        width={56}
        height={56}
      />
      <h2 className="font-semibold text-[30px] text-center text-[#050505] mt-[32px]">
        Check your email
      </h2>
      <p className="text-[#667085] text-center">
        We sent a password reset link to <br />
        <span className="font-medium text-[#101828]">{email}</span>
      </p>

      <Button
        onClick={handleOpenEmailApp}
        className="w-full h-[42px] mt-[32px]"
      >
        Open email app...
      </Button>
      <p className="text-[14px] mt-[16px] text-[#667085]">
        Didn&apos;t receive the email?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={isResending}
          className="text-primary font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? "Sending..." : "Click to resend"}
        </button>
      </p>
      <p
        className="flex items-center gap-2 text-[14px] mt-[32px] cursor-pointer text-[#677A8C] hover:text-black"
        onClick={onBack}
      >
        <ArrowLeft className="size-3.5" />
        Back to Login
      </p>
    </>
  );
};

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { forgotPassword } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = formState;

    const isEmpty = checkEmptyFields({ email });

    if (isEmpty) return;

    setIsSubmitting(true);
    try {
      const response = await forgotPassword({ email });
      showSuccess(
        response.message ||
          "If an account exists for this email, a password reset link has been sent.",
      );
      setStep(2);
    } catch (err) {
      showError(
        getApiErrorMessage(err, "Something went wrong. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (isResending) return;

    setIsResending(true);
    try {
      const response = await forgotPassword({ email: formState.email });
      showSuccess(
        response.message ||
          "If an account exists for this email, a password reset link has been sent.",
      );
    } catch (err) {
      showError(
        getApiErrorMessage(err, "Something went wrong. Please try again."),
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center max-w-[360px] w-full"
    >
      {step === 1 ? (
        <ForgotPasswordForm
          email={formState.email}
          isSubmitting={isSubmitting}
          onChange={handleOnChange}
          onSubmit={handleSubmit}
          onBack={() => router.back()}
        />
      ) : (
        <CheckEmail
          email={formState.email}
          isResending={isResending}
          onResend={handleResend}
          onBack={() => router.push("/login")}
        />
      )}
    </motion.div>
  );
};

export default ForgotPasswordPage;
