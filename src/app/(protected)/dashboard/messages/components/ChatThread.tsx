import { cn } from "@/lib/utils";
import { ThreadType } from "../page";
import { CheckCheck } from "lucide-react";

const ChatThread = ({
  isActive,
  isLastIndex,
  thread,
  selectThread,
}: {
  isActive: boolean;
  isLastIndex: boolean;
  thread: ThreadType;
  selectThread: () => void;
}) => {
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
        <img
          src={thread.avatar}
          alt={thread.name}
          className="h-[48px] w-[48px] rounded-full object-cover"
        />

        {/* online status indicator */}
        <span
          className={`absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full border-2 border-background ${
            thread.online ? "bg-success" : "bg-muted-foreground/80"
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-medium">{thread.name}</h3>

          <span className="shrink-0 text-[10px] text-muted-foreground">
            {thread.time}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="flex min-w-0 items-center gap-2 truncate text-[10px] text-muted-foreground">
            <span className="truncate">{thread.message}</span>
          </p>

          {thread.isAccepted ? (
            thread.unreadCount && thread.unreadCount > 0 ? (
              <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-[#7654D8] px-2 text-xs text-white">
                {thread.unreadCount}
              </span>
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
