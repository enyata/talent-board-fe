"use client";

import Link from "next/link";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AdminUser } from "./data";
import { copyEmail } from "./copy-email";

export function UserActionsMenu({
  user,
  onToggleStatus,
}: {
  user: AdminUser;
  onToggleStatus: (user: AdminUser) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Actions for ${user.firstName}`}
        className="flex size-6 cursor-pointer items-center justify-center rounded-sm text-[#A4A3A7] hover:bg-black/5 hover:text-[#252C32]"
        onClick={(e) => e.stopPropagation()}
      >
        <Ellipsis className="size-[13.5px]" strokeWidth={1.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem asChild>
          <Link href={`/user-management/${user.id}`}>View profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => copyEmail(user.email)}>
          Copy email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.status === "active" ? (
          <DropdownMenuItem variant="destructive" onSelect={() => onToggleStatus(user)}>
            Suspend user
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onSelect={() => onToggleStatus(user)}>
            Reactivate user
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
