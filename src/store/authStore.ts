import { create } from "zustand";
import { devtools } from "zustand/middleware";

type profile = {
  bio?: string;
  job_title?: string;
  skills?: string[];
};

export type UserRole = "talent" | "recruiter";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  role: UserRole | null;
  provider: string;
  profile_completed: boolean;
  country?: string;
  state?: string;
  profile?: profile;
};

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  is_authenticated: boolean;
  resetAuth: () => void;
  set_isAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User) => void;
  setAccessToken: (token: string | undefined) => void;
  setRefreshToken: (refreshToken: string | undefined) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      is_authenticated: false,
      resetAuth: () => set({ user: null, accessToken: undefined }),
      set_isAuthenticated: (isAuthenticated) =>
        set({ is_authenticated: isAuthenticated }),
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (refreshToken) => set({ refreshToken: refreshToken }),
      setLoading: (loading) => set({ loading }),
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          is_authenticated: false,
        });
        window.location.href = "/";
      },
    }),
    { name: "authStore", enabled: process.env.NODE_ENV !== "production" },
  ),
);
