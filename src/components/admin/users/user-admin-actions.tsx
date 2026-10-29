"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserAdminActions } from "@/store/adminUsersStore";
import { Range, inRange } from "@/components/admin/dashboard/range-toggle";
import { ADMIN_ACTION_TYPES, AdminAction } from "./data";
import { formatTableDate } from "./format";
import { copyEmail } from "./copy-email";
import { LogToolbar } from "./log-toolbar";
import { TablePagination } from "./table-pagination";
import { nextSort, Sort, SortableHeader } from "./users-table";

const PAGE_SIZE = 15;

type SortKey = "timestamp" | "note";

const actionOptions = ADMIN_ACTION_TYPES.map((a) => ({ value: a, label: a }));

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function UserAdminActions({ userId }: { userId: string }) {
  const actions = useUserAdminActions(userId);
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("all");
  const [range, setRange] = useState<Range>("7d");
  const [sort, setSort] = useState<Sort<SortKey>>({ key: "timestamp", dir: "desc" });
  const [page, setPage] = useState(1);
  const query = useDebounce(search.trim().toLowerCase());

  const filtered = useMemo(() => {
    const result = actions.filter(
      (a) =>
        (action === "all" || a.action === action) &&
        inRange(a.timestamp, range) &&
        (!query ||
          `${a.admin.name} ${a.admin.email} ${a.action} ${a.note ?? ""}`
            .toLowerCase()
            .includes(query)),
    );
    const dir = sort.dir === "asc" ? 1 : -1;
    return result.sort((a, b) => (a[sort.key] ?? "").localeCompare(b[sort.key] ?? "") * dir);
  }, [actions, action, range, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetPage = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  return (
    <div>
      <LogToolbar
        search={search}
        onSearchChange={resetPage(setSearch)}
        action={action}
        onActionChange={resetPage(setAction)}
        actionOptions={actionOptions}
        range={range}
        onRangeChange={resetPage(setRange)}
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] table-fixed border-collapse text-left">
          <colgroup>
            <col />
            <col />
            <col className="w-[231px]" />
            <col />
            <col />
          </colgroup>
          <thead className="bg-[#F6F7F7] text-[12px] text-[#252C32]">
            <tr className="h-12">
              <SortableHeader
                label="Timestamp"
                sortKey="timestamp"
                sort={sort}
                onSort={(k) => setSort((p) => nextSort(p, k))}
              />
              <th className="p-3 font-normal">Admin</th>
              <th className="p-3 font-normal">Email</th>
              <th className="p-3 font-normal">Action</th>
              <SortableHeader
                label="Note"
                sortKey="note"
                sort={sort}
                onSort={(k) => setSort((p) => nextSort(p, k))}
              />
            </tr>
          </thead>
          <tbody className="text-[14px] leading-[21px] text-[#252C32]">
            {rows.map((row: AdminAction) => (
              <tr key={row.id} className="h-12 border-t border-[#F6F7F7] bg-white">
                <td className="px-3 whitespace-nowrap">{formatTableDate(row.timestamp)}</td>
                <td className="px-3">
                  <span className="flex items-center gap-2">
                    <Avatar className="size-5">
                      <AvatarImage src={row.admin.avatar} alt="" />
                      <AvatarFallback className="bg-[#E9EAEA] text-[8px]">
                        {initials(row.admin.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{row.admin.name}</span>
                  </span>
                </td>
                <td className="px-3">
                  {row.admin.email ? (
                    <span className="flex items-center gap-2">
                      <span className="truncate">{row.admin.email}</span>
                      <button
                        type="button"
                        aria-label={`Copy ${row.admin.email}`}
                        className="shrink-0 cursor-pointer"
                        onClick={() => copyEmail(row.admin.email)}
                      >
                        <Image src="/assets/icons/admin/copy.svg" alt="" width={13.5} height={13.5} />
                      </button>
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-3">{row.action}</td>
                <td className="truncate px-3" title={row.note}>
                  {row.note || "-"}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-16 text-center text-[#888D93]">
                  No admin actions match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
