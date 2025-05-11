import { create } from 'zustand';

export type User = {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
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
    is_authenticated: boolean;
    resetAuth: () => void;
    set_isAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: User) => void;
    setAccessToken: (token: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    is_authenticated: false,
    resetAuth: () => set({ user: null, accessToken: null }),
    set_isAuthenticated: (isAuthenticated) => set({ is_authenticated: isAuthenticated }),
    setUser: (user) => set({ user }),
    setAccessToken: (token) => set({ accessToken: token }),
    setRefreshToken: (refreshToken) => set({ refreshToken: refreshToken }),
    setLoading: (loading) => set({ loading }),
    logout: () => set({ user: null, accessToken: null }),
}));
