"use client";
import { motion } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ButtonWithLoader } from "@/components/ui/button-with-loader";
import { Loader } from "@/components/ui/loader";
import { showError, showSuccess } from "@/lib/Alerts";
import { getApiErrorMessage } from "@/lib/helpers";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

const formatTime = (seconds: number) => {
  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
};

const VerifyEmailForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { verifyEmail, resendOtp } = useAuth();
  const { setAccessToken, setRefreshToken, setUser, set_isAuthenticated } =
    useAuthStore();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const nextOtp = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      nextOtp[i] = char;
    });
    setOtp(nextOtp);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < OTP_LENGTH) {
      showError("Please enter the complete 6-digit code");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await verifyEmail({ email, otp: code });
      const { access_token, refresh_token } = response.tokens;
      const { user } = response.data;

      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      document.cookie = `access_token=${access_token}; path=/; Secure; SameSite=Strict`;
      document.cookie = `refresh_token=${refresh_token}; path=/; Secure; SameSite=Strict`;
      setUser(user);
      set_isAuthenticated(true);

      showSuccess(response.message || "Email verified");
      router.replace(user.profile_completed ? "/dashboard" : "/onboard");
    } catch (err) {
      showError(getApiErrorMessage(err, "Something went wrong. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || isResending) return;

    setIsResending(true);
    try {
      const response = await resendOtp({ email });
      setOtp(Array(OTP_LENGTH).fill(""));
      setSecondsLeft(RESEND_SECONDS);
      showSuccess(
        response.message || "A new code has been sent to your email",
      );
      inputsRef.current[0]?.focus();
    } catch (err) {
      showError(getApiErrorMessage(err, "Something went wrong. Please try again."));
    } finally {
      setIsResending(false);
    }
  };

  const canSubmit = otp.every((digit) => digit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center max-w-[360px] w-full"
    >
      <h2 className="font-semibold text-[30px] text-center text-[#050505]">
        Verify your email
      </h2>
      <p className="text-[#667085] text-center">
        Enter the code we sent to{" "}
        <span className="font-medium text-[#101828]">
          {email || "your email"}
        </span>
      </p>

      <form onSubmit={handleSubmit} className="w-full mt-[32px]" noValidate>
        <div className="flex items-center justify-center gap-2 md:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              className={`w-[44px] h-[52px] md:w-[52px] md:h-[52px] text-center text-[20px] font-semibold rounded-xl border outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30 ${
                digit ? "border-primary" : "border-[#D0D5DD]"
              }`}
            />
          ))}
        </div>

        <p className="text-center text-[14px] text-[#667085] mt-[32px]">
          {secondsLeft > 0 ? (
            <>
              Resend OTP in{" "}
              <span className="text-red-500 font-medium">
                {formatTime(secondsLeft)}
              </span>
            </>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-primary font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </p>

        <ButtonWithLoader
          type="submit"
          className="w-full h-[42px] mt-[52px]"
          isLoading={isSubmitting}
          disabled={!canSubmit || isSubmitting}
        >
          Verify and continue
        </ButtonWithLoader>
      </form>

      <p
        className="flex items-center justify-center gap-2 text-[14px] mt-[16px] cursor-pointer text-[#677A8C] hover:text-black"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-3.5" />
        Back
      </p>

      <div className="flex items-center gap-3 bg-neutral-50 rounded-2xl p-4 mt-[36px] w-full md:w-[480px]">
        <span className="mt-1 w-[8px] h-[8px] rounded-full bg-primary shrink-0" />
        <p className="text-[14px] text-[#667085] leading-relaxed">
          Check your spam or promotions folder if it doesn&apos;t arrive in a
          minute. Codes are single-use and expire in 10 minutes.
        </p>
      </div>
    </motion.div>
  );
};

const VerifyEmailPage = () => {
  return (
    <Suspense
      fallback={<Loader className="text-primary shadow-none size-[40px]" />}
    >
      <VerifyEmailForm />
    </Suspense>
  );
};

export default VerifyEmailPage;
