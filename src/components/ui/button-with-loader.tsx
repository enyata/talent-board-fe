"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { Loader } from "./loader";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonWithLoaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: "default" | "outline" | "link";
}

function ButtonWithLoader({ children, isLoading = false, disabled, ...props }: ButtonWithLoaderProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={disabled || isLoading || pending}
      type="submit"
      {...props}
    >
      {isLoading || pending ? <Loader className="shadow-none bg-transparent" size="sm" /> : children}
    </Button>
  );
}

export { ButtonWithLoader };
