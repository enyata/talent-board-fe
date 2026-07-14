import { isAxiosError } from "axios";
import { showError } from "./Alerts";

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

export const checkEmptyFields = (fields: any) => {
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
