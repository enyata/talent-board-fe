import { cn } from "@/lib/utils";
import type { AdminUserStatus } from "./data";

export function UserStatusBadge({ status }: { status: AdminUserStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[4px] border px-1 py-[3px] text-[12px] leading-none capitalize",
        status === "active"
          ? "border-[#D4EFDF] bg-[#F3FFF8] text-[#27AE60]"
          : "border-[#FED6D6] bg-[#FFECEC] text-[#CC2129]",
      )}
    >
      {status}
    </span>
  );
}
