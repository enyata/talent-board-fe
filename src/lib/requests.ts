import API from "./axiosInstance";

// `T` is the response body type; it defaults to `unknown` so callers have to
// say what they expect (usually `ApiEnvelope<...>`) before reading fields.

export const GET = async <T = unknown>(url: string, params?: object) => {
  const res = await API.get<T>(url, { params });
  return res.data;
};

export const POST = async <T = unknown>(url: string, data?: unknown) => {
  const res = await API.post<T>(url, data);
  return res.data;
};

export const PATCH = async <T = unknown>(url: string, data?: unknown) => {
  const res = await API.patch<T>(url, data);
  return res.data;
};

export const DEL = async <T = unknown>(url: string) => {
  const res = await API.delete<T>(url);
  return res.data;
};
