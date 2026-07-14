"use client";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check, TriangleAlert } from "lucide-react";
import Image from "next/image";
import CustomInput from "@/components/utils/custom-input";
import { Button } from "@/components/ui/button";
import { ButtonWithLoader } from "@/components/ui/button-with-loader";
import { Loader } from "@/components/ui/loader";
import { showError, showSuccess } from "@/lib/Alerts";
import { getApiErrorMessage } from "@/lib/helpers";
import { useAuth } from "@/hooks/useAuth";

const SPECIAL_CHAR_REGEX = /[^A-Za-z0-9]/;

const decodeParam = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const PasswordRequirement = ({
  met,
  label,
}: {
  met: boolean;
  label: string;
}) => (
  <div className="flex items-center gap-2">
    <span
      className={`flex items-center justify-center size-[16px] rounded-full shrink-0 ${
        met ? "bg-primary" : "bg-[#E4E9F2]"
      }`}
    >
      {met && <Check className="size-2.5 text-white" strokeWidth={3} />}
    </span>
    <span className="text-[13px] text-[#667085]">{label}</span>
  </div>
);

const ResetPasswordForm = ({
  password,
  confirmPassword,
  isSubmitting,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBack,
}: {
  password: string;
  confirmPassword: string;
  isSubmitting: boolean;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) => {
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = SPECIAL_CHAR_REGEX.test(password);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const canSubmit = hasMinLength && hasSpecialChar && passwordsMatch;

  return (
    <>
      <Image
        src="/assets/icons/lock-icon.svg"
        alt="Reset password"
        width={56}
        height={56}
      />
      <h2 className="font-semibold text-[32px] text-center text-[#050505] mt-[24px]">
        Create a new password
      </h2>
      <p className="text-[#667085] text-center">
        Your new password must be different from previously used passwords.
      </p>

      <form
        onSubmit={onSubmit}
        className="space-y-[32px] w-full mt-[32px]"
        noValidate
      >
        <div>
          <CustomInput
            label="Create new Password"
            type="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Create a new password"
          />
          <div className="flex flex-col gap-1.5 mt-2">
            <PasswordRequirement
              met={hasMinLength}
              label="Must be at least 8 characters"
            />
            <PasswordRequirement
              met={hasSpecialChar}
              label="Must contain one special character"
            />
          </div>
        </div>

        <CustomInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          placeholder="Confirm your password"
        />

        <ButtonWithLoader
          type="submit"
          className="w-full h-[42px]"
          isLoading={isSubmitting}
          disabled={!canSubmit || isSubmitting}
        >
          Reset password...
        </ButtonWithLoader>
      </form>

      <p
        className="flex items-center gap-2 text-[14px] mt-[16px] cursor-pointer text-[#677A8C] hover:text-black"
        onClick={onBack}
      >
        <ArrowLeft className="size-3.5" />
        Back to log in
      </p>
    </>
  );
};

const ResetSuccess = ({
  onLogin,
  onBack,
}: {
  onLogin: () => void;
  onBack: () => void;
}) => {
  return (
    <>
      <Image
        src="/assets/icons/ep_success-filled.svg"
        alt="Success"
        width={80}
        height={80}
      />
      <h2 className="font-semibold text-[30px] text-center text-[#050505] mt-[24px]">
        Password reset
      </h2>
      <p className="text-[#667085] text-center">
        Your password has been successfully reset
      </p>

      <Button onClick={onLogin} className="w-full h-[42px] mt-[32px]">
        Login
      </Button>

      <p
        className="flex items-center gap-2 text-[14px] mt-[16px] cursor-pointer text-[#677A8C] hover:text-black"
        onClick={onBack}
      >
        <ArrowLeft className="size-3.5" />
        Back to log in
      </p>
    </>
  );
};

const InvalidResetLink = ({ onRequestNewLink }: { onRequestNewLink: () => void }) => (
  <>
    <div className="flex items-center justify-center size-[56px] rounded-2xl border border-[#E4E7EC]">
      <TriangleAlert className="size-6 text-destructive" />
    </div>
    <h2 className="font-semibold text-[30px] text-center text-[#050505] mt-[24px]">
      Invalid or expired link
    </h2>
    <p className="text-[#667085] text-center">
      This password reset link is invalid or has expired. Please request a
      new one.
    </p>

    <Button onClick={onRequestNewLink} className="w-full h-[42px] mt-[32px]">
      Request a new link
    </Button>
  </>
);

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = decodeParam(searchParams.get("email") ?? "").trim();
  const token = decodeParam(searchParams.get("token") ?? "").trim();
  const isLinkValid = Boolean(email && token);
  const { resetPassword } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await resetPassword({
        email,
        token,
        password,
        confirm_password: confirmPassword,
      });
      showSuccess(
        response.message ||
          "Password reset successful. You can now log in with your new password.",
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center max-w-[360px] w-full"
    >
      {!isLinkValid ? (
        <InvalidResetLink
          onRequestNewLink={() => router.push("/forgot-password")}
        />
      ) : step === 1 ? (
        <ResetPasswordForm
          password={password}
          confirmPassword={confirmPassword}
          isSubmitting={isSubmitting}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
          onSubmit={handleSubmit}
          onBack={() => router.push("/login")}
        />
      ) : (
        <ResetSuccess
          onLogin={() => router.push("/login")}
          onBack={() => router.push("/login")}
        />
      )}
    </motion.div>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={<Loader className="text-primary shadow-none size-[40px]" />}
    >
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;
