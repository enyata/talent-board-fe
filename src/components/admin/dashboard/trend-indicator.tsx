import Image from "next/image";
import { cn } from "@/lib/utils";

export type Trend = {
  value: string;
  direction: "up" | "down";
};

export function TrendIcon({ direction }: { direction: Trend["direction"] }) {
  return (
    <Image
      src={
        direction === "up"
          ? "/assets/icons/admin/trend-up.svg"
          : "/assets/icons/admin/trend-down.svg"
      }
      alt=""
      width={12}
      height={12}
      className="shrink-0"
    />
  );
}

/** Arrow + percentage, followed by an optional muted caption ("since yesterday"). */
export function TrendIndicator({
  trend,
  caption,
  className,
}: {
  trend: Trend;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 text-[10px]", className)}>
      <span className="flex items-center gap-0.5">
        <TrendIcon direction={trend.direction} />
        <span
          className={cn(
            "font-semibold",
            trend.direction === "up" ? "text-[#27AE60]" : "text-[#CC2129]",
          )}
        >
          {trend.value}
        </span>
      </span>
      {caption && <span className="text-[#888D93]">{caption}</span>}
    </div>
  );
}

/** Pill variant used in list rows (User retention, Scheduling). */
export function TrendPill({
  trend,
  bordered,
}: {
  trend: Trend;
  bordered?: boolean;
}) {
  const isUp = trend.direction === "up";
  return (
    <span
      className={cn(
        "flex shrink-0 items-center gap-1 rounded-[12px] px-2 py-0.5 text-[10px] font-semibold",
        isUp ? "bg-[#F3FFF8] text-[#27AE60]" : "bg-[#FFECEC] text-[#CC2129]",
        bordered && "border",
        bordered && (isUp ? "border-[#D4EFDF]" : "border-[#FED6D6]"),
      )}
    >
      <TrendIcon direction={trend.direction} />
      {trend.value}
    </span>
  );
}
