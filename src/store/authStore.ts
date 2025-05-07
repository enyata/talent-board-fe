import { create } from 'zustand';

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string | null;
    provider: string;
    profile_completed: boolean;
};

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    setUser: (user: User) => void;
    setAccessToken: (token: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    refreshToken:null,
    loading: false,
    setUser: (user) => set({ user }),
    setAccessToken: (token) => set({ accessToken: token }),
    setRefreshToken: (refreshToken) => set({ refreshToken: refreshToken }),
    setLoading: (loading) => set({ loading }),
    logout: () => set({ user: null, accessToken: null }),
}));
