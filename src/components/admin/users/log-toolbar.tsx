"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Range, RangeToggle } from "@/components/admin/dashboard/range-toggle";

export const LOG_RANGES: Range[] = ["7d", "30d", "all"];

/** Search + "Actions: All" filter + 7 days / 30 days / All time, shared by the activity and admin-action tabs. */
export function LogToolbar({
  search,
  onSearchChange,
  action,
  onActionChange,
  actionOptions,
  range,
  onRangeChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  action: string;
  onActionChange: (value: string) => void;
  actionOptions: { value: string; label: string }[];
  range: Range;
  onRangeChange: (value: Range) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-[#E9EAEA] bg-[#FEFEFE] p-4">
      <div className="relative min-w-[220px] flex-1">
        <Image
          src="/assets/icons/admin/search.svg"
          alt=""
          width={16}
          height={16}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
        />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          aria-label="Search"
          className="h-11 rounded-[8px] border-[#E9EAEA] bg-[#FEFEFE] pl-10 text-[14px] text-[#252C32] shadow-none placeholder:text-[#9DA1A6]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={action} onValueChange={onActionChange}>
          <SelectTrigger
            aria-label="Filter by action"
            className="h-11 gap-2 rounded-[8px] border-[#E9EAEA] bg-white pr-4 pl-6 text-[14px] font-medium text-[#252C32] shadow-none data-[size=default]:h-11"
          >
            <span className="text-[#888D93]">Actions:</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {actionOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <RangeToggle
          value={range}
          onChange={onRangeChange}
          ranges={LOG_RANGES}
          size="lg"
          className="h-11 rounded-[8px] [&>button]:rounded-[6px]"
        />
      </div>
    </div>
  );
}
