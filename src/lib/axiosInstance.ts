import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { env } from "./env";

axios.defaults.withCredentials = true

const API = axios.create({
  baseURL: env("apiUrl"),
  withCredentials: true,
});

// Request interceptor
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  console.log('token at API', token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
API.interceptors.response.use(
  (response) => {
    const newToken = response.headers["x-access-token"];
    if (newToken) {
      useAuthStore.getState().setAccessToken(newToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
