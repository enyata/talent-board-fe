"use client";

import { cn } from "@/lib/utils";

export type Range = "7d" | "30d" | "90d" | "all";

const DEFAULT_RANGES: Range[] = ["7d", "30d", "90d"];

const SIZES = {
  lg: { wrapper: "gap-1", item: "px-3 py-2 text-[12px]" },
  md: { wrapper: "", item: "px-2 py-1 text-[12px]" },
  sm: { wrapper: "", item: "px-2 py-1 text-[10px]" },
};

function label(range: Range, short?: boolean) {
  if (range === "all") return "All time";
  const days = range.replace("d", "");
  return short ? `${days} d` : `${days} days`;
}

/** Segmented 7 / 30 / 90 day switch used in the dashboard panel headers. */
export function RangeToggle({
  value,
  onChange,
  size = "md",
  short,
  ranges = DEFAULT_RANGES,
  className,
}: {
  value: Range;
  onChange: (value: Range) => void;
  size?: keyof typeof SIZES;
  /** Render "7 d" instead of "7 days". */
  short?: boolean;
  ranges?: Range[];
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex shrink-0 items-stretch rounded-[12px] border border-[#E6E6E6] bg-[#F3F3F3] p-1",
        SIZES[size].wrapper,
        className,
      )}
    >
      {ranges.map((range) => {
        const active = range === value;
        return (
          <button
            key={range}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(range)}
            className={cn(
              "cursor-pointer rounded-[8px] border whitespace-nowrap transition-colors",
              SIZES[size].item,
              active
                ? "border-[#E6E6E6] bg-white text-[#333]"
                : "border-transparent text-[#807E7C] hover:text-[#333]",
            )}
          >
            {label(range, short)}
          </button>
        );
      })}
    </div>
  );
}

const DAY = 24 * 60 * 60 * 1000;

/** True when an ISO timestamp falls inside the selected range. */
export function inRange(iso: string, range: Range, now = Date.now()) {
  if (range === "all") return true;
  return now - new Date(iso).getTime() <= Number(range.replace("d", "")) * DAY;
}
