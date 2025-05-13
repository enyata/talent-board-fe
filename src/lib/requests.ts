/* eslint-disable @typescript-eslint/no-explicit-any */

import API from "./axiosInstance";

export const GET = async <T = any>(url: string, params?: any) => {
  const res = await API.get<T>(url, { params });
  return res.data;
};

export const POST = async <T = any>(url: string, data?: any) => {
  const res = await API.post<T>(url, data);
  return res.data;
};

export const PATCH = async <T = any>(url: string, data?: any) => {
  const res = await API.patch<T>(url, data);
  return res.data;
};

export const DEL = async <T = any>(url: string) => {
  const res = await API.delete<T>(url);
  return res.data;
};

