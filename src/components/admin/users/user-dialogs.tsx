"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/lib/Alerts";
import { useAdminUsersStore } from "@/store/adminUsersStore";
import { useAuthStore } from "@/store/authStore";
import { AdminUser, fullName, SUSPENSION_REASONS } from "./data";

const footerButton =
  "h-auto flex-1 rounded-[6px] px-4 py-3 text-[16px] leading-[18px] font-semibold";

function CloseButton({ className }: { className?: string }) {
  return (
    <DialogClose
      aria-label="Close"
      className={cn("cursor-pointer rounded-sm opacity-80 hover:opacity-100", className)}
    >
      <Image src="/assets/icons/admin/close.svg" alt="" width={18} height={18} />
    </DialogClose>
  );
}

/** The signed-in admin, recorded against each status change. */
function useCurrentAdmin() {
  const user = useAuthStore((s) => s.user);
  return {
    name: user ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || "Admin" : "Admin",
    email: user?.email ?? "",
  };
}

type DialogProps = {
  user: AdminUser | null;
  onOpenChange: (open: boolean) => void;
};

export function SuspendUserDialog({ user, onOpenChange }: DialogProps) {
  const setStatus = useAdminUsersStore((s) => s.setStatus);
  const admin = useCurrentAdmin();
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setReason("");
      setNotes("");
    }
    onOpenChange(open);
  };

  const handleSuspend = () => {
    if (!user || !reason) return;
    // TODO: call the suspend endpoint with { reason, notes } once available.
    setStatus(user.id, "suspended", {
      admin,
      note: notes.trim() ? `${reason}: ${notes.trim()}` : reason,
    });
    showSuccess(`${fullName(user)} has been suspended.`);
    handleOpenChange(false);
  };

  return (
    <Dialog open={!!user} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-6 rounded-[16px] border-0 p-6 sm:max-w-[521px]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[24px] leading-[28.8px] font-bold text-[#252C32]">
              Suspend user?
            </DialogTitle>
            <CloseButton />
          </div>
          <DialogDescription className="text-[14px] leading-[21px] text-[#475467]">
            This will log the{" "}
            <span className="font-bold text-[#252C32]">
              {user && fullName(user)}
            </span>{" "}
            out and block them from signing back in. It also hides their profile
            from everyone else&apos;s search and pipeline views, until you
            reactivate the account.
          </DialogDescription>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] leading-6 text-[#050505]">
            Reason for suspension<span className="text-[#CC2129]">*</span>
          </label>
          <Select value={reason} onValueChange={setReason}>
            <SelectTrigger className="w-full rounded-[8px] border-[#D0D5DD] px-3.5 text-[14px] text-[#2D2D2D] data-[placeholder]:text-[#667085] [&>svg]:size-5 [&>svg]:opacity-100">
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent className="rounded-[8px] border-[#F2F4F7] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]">
              {SUSPENSION_REASONS.map((r) => (
                <SelectItem
                  key={r}
                  value={r}
                  className="px-3.5 py-2.5 text-[14px] leading-[22px] text-[#2D2D2D] focus:bg-[#F9FAFB] data-[state=checked]:bg-[#F9FAFB] [&_svg]:!text-primary"
                >
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="suspend-notes" className="text-[14px] leading-6 text-[#050505]">
            Additional notes(Optional)
          </label>
          <Textarea
            id="suspend-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Start typing..."
            className="min-h-[60px] rounded-[8px] bg-[#FEFEFE] p-2.5 text-[14px] text-[#252C32] shadow-none placeholder:text-[#B4B7BB]"
          />
        </div>

        <div className="flex gap-1">
          <Button
            type="button"
            variant="outline"
            className={cn(footerButton, "border-[#E9EAEA] text-[#252C32] shadow-none")}
            onClick={() => handleOpenChange(false)}
          >
            No, don&apos;t suspend
          </Button>
          <Button
            type="button"
            disabled={!reason}
            className={cn(footerButton, "bg-[#CC2129] text-[#FEFEFE] hover:bg-[#CC2129]/90")}
            onClick={handleSuspend}
          >
            Yes, suspend
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ReactivateUserDialog({ user, onOpenChange }: DialogProps) {
  const setStatus = useAdminUsersStore((s) => s.setStatus);
  const admin = useCurrentAdmin();

  const handleReactivate = () => {
    if (!user) return;
    // TODO: call the reactivate endpoint once available.
    setStatus(user.id, "active", { admin });
    showSuccess(`${fullName(user)} has been reactivated.`);
    onOpenChange(false);
  };

  return (
    <Dialog open={!!user} onOpenChange={onOpenChange}>
      <DialogContent className="items-center justify-items-center gap-6 rounded-[16px] border-0 p-6 sm:max-w-[521px]">
        <CloseButton className="absolute top-5 right-[27px]" />
        <Image
          src="/assets/icons/admin/reactivate-badge.svg"
          alt=""
          width={60}
          height={60}
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <DialogTitle className="text-[24px] leading-[28.8px] font-bold text-[#252C32]">
            Reactivate user?
          </DialogTitle>
          <DialogDescription className="text-[14px] leading-[21px] text-[#475467]">
            Reactivating{" "}
            <span className="text-[#252C32]">{user && fullName(user)}</span>{" "}
            restores login and brings the profile back into search and pipeline
            views right away.
          </DialogDescription>
        </div>
        <div className="flex w-full gap-1">
          <Button
            type="button"
            variant="outline"
            className={cn(footerButton, "border-[#E9EAEA] text-[#252C32] shadow-none")}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className={cn(footerButton, "bg-primary text-[#FEFEFE] hover:bg-primary/90")}
            onClick={handleReactivate}
          >
            Reactivate user
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Opens whichever dialog fits the user's current status. */
export function useStatusDialogs() {
  const [suspendTarget, setSuspendTarget] = useState<AdminUser | null>(null);
  const [reactivateTarget, setReactivateTarget] = useState<AdminUser | null>(null);

  const toggleStatus = (user: AdminUser) =>
    user.status === "active" ? setSuspendTarget(user) : setReactivateTarget(user);

  const dialogs = (
    <>
      <SuspendUserDialog
        user={suspendTarget}
        onOpenChange={(open) => !open && setSuspendTarget(null)}
      />
      <ReactivateUserDialog
        user={reactivateTarget}
        onOpenChange={(open) => !open && setReactivateTarget(null)}
      />
    </>
  );

  return { toggleStatus, dialogs };
}
