"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";
import { Range, inRange } from "@/components/admin/dashboard/range-toggle";
import {
  ACTIVITY_TYPE_LABELS,
  ActivityType,
  getUserActivity,
  UserActivity,
} from "./data";
import { formatActivityDate } from "./format";
import { LogToolbar } from "./log-toolbar";
import { TablePagination } from "./table-pagination";

const PAGE_SIZE = 6;

const actionOptions = Object.entries(ACTIVITY_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

function ActivityItem({ item, last }: { item: UserActivity; last: boolean }) {
  const meta = [formatActivityDate(item.timestamp), `IP: ${item.ip}`, item.device, item.location];

  return (
    <li className="flex gap-2">
      <div className="flex shrink-0 flex-col items-center gap-px">
        <span className="flex size-[38px] items-center justify-center rounded-full border border-[#E7E0FB] bg-[#FBFAFF]">
          <Image src="/assets/icons/admin/activity-check.svg" alt="" width={24} height={24} />
        </span>
        {!last && <span className="w-px flex-1 bg-[#E7E0FB]" />}
      </div>
      <div className="flex min-w-0 flex-col gap-1.5 pb-2">
        <p className="text-[14px] leading-[21px] font-semibold text-black">{item.title}</p>
        <p className="text-[14px] leading-[18px] text-[#61666B]">{item.description}</p>
        <p className="flex flex-wrap items-center gap-x-2 text-[12px] leading-8 font-medium text-[#9DA1A6]">
          {meta.map((m, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="size-1.5 rounded-full bg-[#9DA1A6]" />}
              {m}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
}

export function UserActivityLog({ userId }: { userId: string }) {
  const activity = useMemo(() => getUserActivity(userId), [userId]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"all" | ActivityType>("all");
  const [range, setRange] = useState<Range>("7d");
  const [page, setPage] = useState(1);
  const query = useDebounce(search.trim().toLowerCase());

  const filtered = useMemo(
    () =>
      activity.filter(
        (a) =>
          (type === "all" || a.type === type) &&
          inRange(a.timestamp, range) &&
          (!query || `${a.title} ${a.description}`.toLowerCase().includes(query)),
      ),
    [activity, type, range, query],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const items = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div>
      <LogToolbar
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        action={type}
        onActionChange={(v) => {
          setType(v as typeof type);
          setPage(1);
        }}
        actionOptions={actionOptions}
        range={range}
        onRangeChange={(v) => {
          setRange(v);
          setPage(1);
        }}
      />
      <div className="bg-[#FEFEFE] p-4">
        {items.length ? (
          <ol className="flex flex-col">
            {items.map((item, i) => (
              <ActivityItem key={item.id} item={item} last={i === items.length - 1} />
            ))}
          </ol>
        ) : (
          <p className="py-16 text-center text-[14px] text-[#888D93]">
            No activity matches your filters.
          </p>
        )}
        <div className="mt-2">
          <TablePagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
