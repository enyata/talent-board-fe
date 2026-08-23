import axios, { isAxiosError } from "axios";
import { showError } from "./Alerts";
import { MessageRequest, Thread } from "@/types/APIResponseTypes";

export const capitalizeFirstText = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeText = (str: string) => {
  if (str === undefined) {
    return "";
  }

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const checkEmptyFields = (fields: Record<string, unknown>) => {
  let err = false;
  Object.keys(fields).forEach((key) => {
    if (
      fields[key] === "" ||
      fields[key] === undefined ||
      fields[key] === null
    ) {
      showError(capitalizeFirstText(`${key?.replace(/_/g, " ")} is required`));
      err = true;
    }
  });

  return err;
};

export const getApiErrorMessage = (err: unknown, fallback: string) => {
  if (isAxiosError(err)) {
    return err.response?.data?.message ?? fallback;
  }

  return fallback;
};

const capsRegex = new RegExp(/[A-Z]/);
const numberRegex = new RegExp(/\d/);
const specialCharRegex = new RegExp(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/);
export const testPasswordRegex = (password: string) => {
  if (!capsRegex.test(password)) return false;

  if (!numberRegex.test(password)) return false;

  if (!specialCharRegex.test(password)) return false;

  return true;
};

export const handleAxiosErr = (
  error: unknown,
  defaultMessage?: string,
  itemLabel?: string,
) => {
  let message =
    defaultMessage || "Something went wrong. Please try again in a moment.";

  if (axios.isAxiosError(error)) {
    message = error?.response?.data?.error || error.message;
    console.log("Axios error: ", error?.response?.data);
  } else if (error instanceof Error) {
    message = error.message;
    console.log("Axios errorx: ", error);
  }

  if (itemLabel && message.includes("not found")) {
    message = `${itemLabel} not found`;
  }
  showError(message);
};

// turns "2026-08-18T09:44:53.323Z" to "today 09:44" or "18 Aug 09:44" (if run on a different day this year)
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (isSameDay(date, now)) {
    return `today ${time}`;
  }

  if (isSameDay(date, yesterday)) {
    return `yesterday ${time}`;
  }

  const sameYear = date.getFullYear() === now.getFullYear();

  const datePart = date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: sameYear ? undefined : "numeric",
  });

  return `${datePart} ${time}`;
}

// Define a discriminating helper or type check
export function isThread(item: MessageRequest | Thread): item is Thread {
  return "latest_message" in item;
}
