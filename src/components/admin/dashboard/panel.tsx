import { cn } from "@/lib/utils";
import type { BreakdownItem } from "./data";
import { TrendPill } from "./trend-indicator";

/** Grey outer shell with a header row and a white inner body, shared by the side panels. */
export function Panel({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-[16px] border border-[#EBEBEB] bg-[#F6F7F7] px-2 pb-2",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2 border-b border-[#F5F5F5] px-2 py-2 md:px-4">
        <h2 className="text-[16px] leading-[19.2px] font-bold whitespace-nowrap text-[#252C32]">
          {title}
        </h2>
        {action}
      </header>
      <div className="flex flex-col gap-[15px] rounded-[12px] border border-[#E9EAEA] bg-[#FEFEFE] px-2 py-4">
        {children}
      </div>
    </section>
  );
}

/** "54% • 5,761,687 Users" line under a breakdown label. */
export function FunFact({ percent, users }: Pick<BreakdownItem, "percent" | "users">) {
  return (
    <p className="flex items-start gap-1.5 text-[12px] font-medium whitespace-nowrap text-[#9DA1A6]">
      <span>{percent}</span>
      <span aria-hidden>•</span>
      <span>
        <span className="font-bold">{users}</span> Users
      </span>
    </p>
  );
}

export function BreakdownRow({
  item,
  bordered,
  marker,
  labelClassName,
}: {
  item: BreakdownItem;
  bordered?: boolean;
  marker?: React.ReactNode;
  labelClassName?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-1.5 px-2">
      <div className="flex min-w-0 flex-col gap-1">
        <p className={cn("flex items-center gap-1.5 text-[#252C32]", labelClassName)}>
          {marker}
          {item.label}
        </p>
        <FunFact percent={item.percent} users={item.users} />
      </div>
      <TrendPill trend={item.trend} bordered={bordered} />
    </div>
  );
}
