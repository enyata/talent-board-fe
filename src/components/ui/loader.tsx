import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

const loaderVariants = cva(
  "rounded-full bg-white shadow-2xl flex items-center justify-center",
  {
    variants: {
      size: {
        default: "h-16 w-16",
        base: "h-10 w-10",
        sm: "h-5 w-5",
        md: "h-24 w-24",
        lg: "h-32 w-32",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface LoaderProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof loaderVariants> {}

function Loader({ size, className, ...props }: LoaderProps) {
  return (
    <div className={cn(loaderVariants({ size }), className)} {...props}>
      <svg
        className="motion-safe:animate-spin h-[65%] w-[65%] "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-0"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="5"
        ></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

export { Loader, loaderVariants };
