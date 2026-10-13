"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { useAdminUsersStore } from "@/store/adminUsersStore";
import { AdminUser, fullName } from "./data";
import { formatTableDate } from "./format";
import { copyEmail } from "./copy-email";
import { TablePagination } from "./table-pagination";
import { UserActionsMenu } from "./user-actions-menu";
import { UserStatusBadge } from "./user-status-badge";
import { useStatusDialogs } from "./user-dialogs";

const PAGE_SIZE = 16;

type SortKey = "joinedAt" | "lastActiveAt";

const filterTrigger =
  "h-11 data-[size=default]:h-11 gap-2 rounded-[8px] border-[#E9EAEA] bg-white px-3 text-[14px] font-medium text-[#252C32] shadow-none lg:pr-4 lg:pl-6";

const compact = new Intl.NumberFormat("en", { notation: "compact" });

function exportCsv(users: AdminUser[]) {
  const header = ["Name", "Email", "Role", "Status", "Join date", "Last active"];
  const rows = users.map((u) => [
    fullName(u),
    u.email,
    u.role,
    u.status,
    u.joinedAt,
    u.lastActiveAt,
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "users.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export type Sort<K extends string> = { key: K; dir: "asc" | "desc" };

export function SortableHeader<K extends string>({
  label,
  sortKey,
  sort,
  onSort,
}: {
  label: string;
  sortKey: K;
  sort: Sort<K>;
  onSort: (key: K) => void;
}) {
  const active = sort.key === sortKey;
  return (
    <th
      aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
      className="p-3 font-normal"
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="flex cursor-pointer items-center gap-2"
      >
        {label}
        <span className="flex size-6 items-center justify-center">
          <Image
            src="/assets/icons/admin/sort.svg"
            alt=""
            width={5}
            height={8.5}
            className={cn(active && sort.dir === "asc" && "rotate-180")}
          />
        </span>
      </button>
    </th>
  );
}

/** Desc first; clicking the active column again flips it. */
export const nextSort = <K extends string>(prev: Sort<K>, key: K): Sort<K> => ({
  key,
  dir: prev.key === key && prev.dir === "desc" ? "asc" : "desc",
});

export function UsersTable() {
  const router = useRouter();
  const users = useAdminUsersStore((s) => s.users);
  const { toggleStatus, dialogs } = useStatusDialogs();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<Sort<SortKey>>({ key: "joinedAt", dir: "desc" });
  const [page, setPage] = useState(1);
  const query = useDebounce(search.trim().toLowerCase());

  const filtered = useMemo(() => {
    const result = users.filter(
      (u) =>
        (role === "all" || u.role === role) &&
        (status === "all" || u.status === status) &&
        (!query ||
          fullName(u).toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)),
    );
    const dir = sort.dir === "asc" ? 1 : -1;
    return result.sort((a, b) => a[sort.key].localeCompare(b[sort.key]) * dir);
  }, [users, role, status, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetPage = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  const handleSort = (key: SortKey) => setSort((prev) => nextSort(prev, key));

  return (
    <section className="flex flex-col gap-2 rounded-[16px] border border-[#F3F3F3] bg-[#FAFAFA] px-2 pt-4 pb-2">
      <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap lg:justify-between">
        <h2 className="text-[16px] leading-[21.6px] font-bold whitespace-nowrap text-[#3A374B]">
          All users({compact.format(users.length).toLowerCase()})
        </h2>

        <div className="relative order-last w-full lg:order-none lg:max-w-[640px] lg:flex-1">
          <Image
            src="/assets/icons/admin/search.svg"
            alt=""
            width={16}
            height={16}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
          />
          <Input
            type="text"
            value={search}
            onChange={(e) => resetPage(setSearch)(e.target.value)}
            placeholder="Search by name or email"
            aria-label="Search users"
            className="h-11 rounded-[8px] border-[#E9EAEA] bg-[#FEFEFE] pl-10 text-[14px] text-[#252C32] shadow-none placeholder:text-[#9DA1A6]"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Select value={role} onValueChange={resetPage(setRole)}>
            <SelectTrigger className={filterTrigger} aria-label="Filter by role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="talent">Talent</SelectItem>
              <SelectItem value="recruiter">Recruiter</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={resetPage(setStatus)}>
            <SelectTrigger className={filterTrigger} aria-label="Filter by status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <button
            type="button"
            onClick={() => exportCsv(filtered)}
            className="flex h-11 cursor-pointer items-center gap-2 rounded-[8px] bg-primary px-3 text-[14px] lg:pr-4 lg:pl-6 font-medium text-[#FEFEFE] hover:bg-primary/90"
          >
            Export
            <Image src="/assets/icons/admin/export.svg" alt="" width={14} height={14} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[8px] border border-[#F6F7F7] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] table-fixed border-collapse text-left">
            <colgroup>
              <col />
              <col className="w-[231px]" />
              <col />
              <col className="w-[102px]" />
              <col />
              <col />
              <col className="w-[87px]" />
            </colgroup>
            <thead className="bg-[#F6F7F7] text-[12px] text-[#252C32]">
              <tr className="h-12">
                <th className="p-3 font-normal">Name</th>
                <th className="p-3 font-normal">Email</th>
                <th className="p-3 font-normal">Role</th>
                <th className="p-3 font-normal">Status</th>
                <SortableHeader label="Join date" sortKey="joinedAt" sort={sort} onSort={handleSort} />
                <SortableHeader label="Last active" sortKey="lastActiveAt" sort={sort} onSort={handleSort} />
                <th className="p-3 font-normal">
                  <span className="flex items-center gap-2">
                    Actions
                    <ChevronDown className="size-3.5 text-[#888D93]" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="text-[14px] leading-[21px] text-[#252C32]">
              {rows.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => router.push(`/user-management/${user.id}`)}
                  className="h-12 cursor-pointer border-t border-[#F6F7F7] transition-colors hover:bg-[#F4F1FD]"
                >
                  <td className="px-3">
                    <span className="flex items-center gap-2">
                      <Avatar className="size-5">
                        <AvatarImage src={user.avatar} alt="" />
                        <AvatarFallback className="bg-[#E9EAEA] text-[8px]">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{fullName(user)}</span>
                    </span>
                  </td>
                  <td className="px-3">
                    <span className="flex items-center gap-2">
                      <span className="truncate">{user.email}</span>
                      <button
                        type="button"
                        aria-label={`Copy ${user.email}`}
                        className="shrink-0 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyEmail(user.email);
                        }}
                      >
                        <Image src="/assets/icons/admin/copy.svg" alt="" width={13.5} height={13.5} />
                      </button>
                    </span>
                  </td>
                  <td className="px-3 capitalize">{user.role}</td>
                  <td className="px-3">
                    <UserStatusBadge status={user.status} />
                  </td>
                  <td className="px-3 whitespace-nowrap">{formatTableDate(user.joinedAt)}</td>
                  <td className="px-3 whitespace-nowrap">{formatTableDate(user.lastActiveAt)}</td>
                  <td className="px-3">
                    <UserActionsMenu user={user} onToggleStatus={toggleStatus} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#888D93]">
                    No users match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <TablePagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {dialogs}
    </section>
  );
}
