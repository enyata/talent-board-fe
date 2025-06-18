"use client";

import axios from "axios";
import { env } from "./env";
import { useAuthStore } from "@/store/authStore";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: env("apiUrl"),
  withCredentials: true,
  timeout: 30_000,
});
API.interceptors.request.use((config) => {
  const { accessToken, refreshToken } = useAuthStore.getState();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  if (refreshToken) config.headers["x-refresh-token"] = refreshToken;
  return config;
});


API.interceptors.response.use(
  (res) => {
    const newToken = res.headers["x-access-token"];
    if (newToken) useAuthStore.getState().setAccessToken(newToken);
    return res;
  },
  // async (error) => {
  //   if (error.code === "ECONNABORTED") {
  //     window.location.href = "/";
  //     return;
  //   }
  //   if (error.response?.status === 504) {
  //     window.location.href = "/";
  //     return;
  //   }

  //   return Promise.reject(error);
  // }
);

export default API;
