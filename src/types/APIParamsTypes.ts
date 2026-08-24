// auth types

export interface SignupPayload {
  email: string;
  password: string;
  confirm_password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface SendMessageRequestBody {
  talent_id: string;
  intro_note: string;
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  password: string;
  confirm_password: string;
}
