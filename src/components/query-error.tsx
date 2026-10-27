"use client";

import { AlertCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Shown when a query fails, so a failed request doesn't look like "no data". */
export function QueryError({
  title = "We couldn't load this",
  description = "Something went wrong while fetching your data. Check your connection and try again.",
  onRetry,
  isRetrying,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-4 py-16 text-center",
        className,
      )}
    >
      <AlertCircle className="size-8 text-[#CC2129]" strokeWidth={1.5} />
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-[#101828]">{title}</p>
        <p className="max-w-[340px] text-[13px] text-[#5F5F5F]">{description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} disabled={isRetrying}>
          <RotateCw className={cn(isRetrying && "animate-spin")} />
          Try again
        </Button>
      )}
    </div>
  );
}
