import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    const refreshToken = useAuthStore.getState().refreshToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (refreshToken) {
        config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
});

export default API;
