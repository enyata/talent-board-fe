import { User } from "@/store/authStore";

export interface SignupResponseData {
  id: string;
  email: string;
  is_email_verified: boolean;
}

export interface SignupResponse {
  message: string;
  data: SignupResponseData;
}

export interface VerifyEmailResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ResendOtpResponse {
  status: string;
  message: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
}

export interface ResetPasswordResponse {
  status: string;
  message: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SkillsResponse {
  status: string;
  data: {
    skills: Skill[];
  };
}

export interface CreateSkillResponse {
  status: string;
  data: {
    skill: Skill;
  };
}
