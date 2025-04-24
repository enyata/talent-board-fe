"use client";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { ReactNode } from "react";

interface FormContextProps {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
}

export function FormContext({ children, form }: FormContextProps) {
  return <FormProvider {...form}>{children}</FormProvider>;
}
