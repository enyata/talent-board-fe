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

// Message Requests

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role: string;
}

export type RequestStatus = "pending" | "accepted" | "declined" | string;

export interface MessageRequest {
  id: string;
  intro_note: string;
  status: RequestStatus;
  responded_at: string | null;
  created_at: string;
  updated_at: string;
  recruiter: UserProfile;
  talent: UserProfile;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface MessageRequestsData {
  requests: MessageRequest[];
  pagination: Pagination;
}

export interface MessageRequestsResponse {
  status: string;
  message: string;
  data: MessageRequestsData;
}

// Active conversation threads

export interface Message {
  id: string;
  body: string;
  created_at: string;
  updated_at: string;
  source_request_id: string | null;
  sender: UserProfile;
}

export interface Thread {
  id: string;
  recruiter_last_seen_at: string | null;
  talent_last_seen_at: string | null;
  latest_message_at: string;
  latest_message_seen_at: string | null;
  latest_message_seen_status: 'seen' | 'unseen' | string;
  created_at: string;
  updated_at: string;
  accepted_request_id: string;
  recruiter: UserProfile;
  talent: UserProfile;
  conversation_partner: UserProfile;
  latest_message: Message;
}

export interface ConversationInboxResponse {
  status: string;
  message: string;
  data: {
    threads: Thread[];
    pagination: Pagination;
  };
}



export type ThreadOrRequest = MessageRequest | Thread;