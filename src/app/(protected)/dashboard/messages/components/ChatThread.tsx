import React from "react";
import { CheckCheck } from "lucide-react"; // or your icon library
import { cn } from "@/lib/utils"; // or your classnames utility
import { ThreadOrRequest } from "@/types/APIResponseTypes";
import { isThread } from "@/lib/helpers";
import { useAuthStore, UserRole } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Helper to extract UI data consistently across both payload types
const getThreadData = (item: ThreadOrRequest, userRole: UserRole) => {
  const isAccepted = isThread(item);

  // 1. Determine partner details
  const whoIsPartner = userRole === "recruiter" ? item.talent : item.recruiter;
  const partner = isThread(item) ? item.conversation_partner : whoIsPartner; // adjust logic if current user can be talent or recruiter

  const name = `${partner.first_name} ${partner.last_name}`;
  const avatar = partner.avatar;

  // 2. Extract preview message
  const message = isThread(item)
    ? (item.latest_message?.body ?? "")
    : item.intro_note;

  // 3. Format time/date
  const rawDate = isThread(item) ? item.latest_message_at : item.created_at;
  const time = new Date(rawDate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // 4. Read status / unread state
  const isUnseen = isThread(item) && item.latest_message_seen_status !== "seen";

  return {
    name,
    avatar,
    message,
    time,
    isAccepted,
    isUnseen,
  };
};

const ChatThread = ({
  isActive,
  isLastIndex,
  thread,
  selectThread,
}: {
  isActive: boolean;
  isLastIndex: boolean;
  thread: ThreadOrRequest;
  selectThread: () => void;
}) => {
  const { user } = useAuthStore();
  const { name, avatar, message, time, isAccepted, isUnseen } = getThreadData(
    thread,
    user?.role || "talent",
  );

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-4 px-4 py-4 text-left transition-colors border-l-2 border-l-background hover:bg-muted/50",
        isActive && "border-l-primary bg-primary/5 hover:bg-primary/5",
        !isLastIndex && "border-b",
      )}
      onClick={selectThread}
    >
      <div className="relative shrink-0">
        <Avatar className="h-[48px] w-[48px]">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="uppercase">
            {name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        {/* Online status indicator (Remove or tie to real online presence data if available) */}
        {/* <span
          className={cn(
            "absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full border-2 border-background bg-muted-foreground/80",
          )}
        /> */}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-medium capitalize">{name} </h3>

          <span className="shrink-0 text-[10px] text-muted-foreground">
            {time}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="flex min-w-0 items-center gap-2 truncate text-[10px] text-muted-foreground">
            <span className="truncate">{message}</span>
          </p>

          {isAccepted ? (
            isUnseen ? (
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#7654D8]" />
            ) : (
              <CheckCheck className="size-4 shrink-0 text-muted-foreground" />
            )
          ) : (
            <span className="shrink-0 rounded-sm font-semibold border border-amber-200 bg-amber-50 px-1 text-xs text-amber-600">
              Request
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatThread;
