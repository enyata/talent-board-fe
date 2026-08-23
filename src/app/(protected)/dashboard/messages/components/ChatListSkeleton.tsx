import { Skeleton } from "@/components/ui/skeleton";

export const ChatListSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-4 border-b px-4 py-4">
      {/* Avatar */}
      <Skeleton className="h-[48px] w-[48px] shrink-0 rounded-full" />

      {/* Thread details */}
      <div className="min-w-0 flex-1">
        {/* Name + time */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-[110px]" />
          <Skeleton className="h-3 w-[32px]" />
        </div>

        {/* Message + status */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <Skeleton className="h-3 w-[160px]" />
          <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
        </div>
      </div>
    </div>
  );
};
