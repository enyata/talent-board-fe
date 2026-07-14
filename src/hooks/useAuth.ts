"use client";

import { GET, POST } from "@/lib/requests";
import { useAuthStore } from "@/store/authStore";
import {
  ForgotPasswordPayload,
  LoginPayload,
  ResendOtpPayload,
  SignupPayload,
  VerifyEmailPayload,
} from "@/types/APIParamsTypes";
import {
  ForgotPasswordResponse,
  LoginResponse,
  ResendOtpResponse,
  SignupResponse,
  VerifyEmailResponse,
} from "@/types/APIResponseTypes";

export const useAuth = () => {
  const { setUser, setLoading, set_isAuthenticated } = useAuthStore();

  const loginWithProvider = (provider: "google" | "linkedin") => {
    const redirect = `${window.location.origin}/auth/callback`;

    setLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/${provider}?redirect_uri=${redirect}&include_tokens_in_url=true`;
  };

  const fetchUser = async () => {
    try {
      const response = await GET("/api/v1/users/me");
      if (!response) {
        return null;
      }
      const user = response.data.user;
      setUser(user);
      set_isAuthenticated(true);
      return user;
    } catch (err) {
      console.error("Fetch user failed", err);
      throw err;
    }
  };

  const signup = async (payload: SignupPayload) => {
    return POST<SignupResponse>("/api/v1/auth/signup", payload);
  };

  const login = async (payload: LoginPayload) => {
    return POST<LoginResponse>("/api/v1/auth/login", payload);
  };

  const verifyEmail = async (payload: VerifyEmailPayload) => {
    return POST<VerifyEmailResponse>("/api/v1/auth/verify-email", payload);
  };

  const resendOtp = async (payload: ResendOtpPayload) => {
    return POST<ResendOtpResponse>("/api/v1/auth/resend-otp", payload);
  };

  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    return POST<ForgotPasswordResponse>(
      "/api/v1/auth/forgot-password",
      payload,
    );
  };

  return {
    loginWithProvider,
    fetchUser,
    signup,
    login,
    verifyEmail,
    resendOtp,
    forgotPassword,
  };
};
