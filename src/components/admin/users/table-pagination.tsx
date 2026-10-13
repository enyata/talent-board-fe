"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/** 1 2 3 … 8 9 10 — collapses the middle (or both sides) once there are more than 7 pages. */
function pageItems(page: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3 || page >= total - 2) {
    return [1, 2, 3, "…", total - 2, total - 1, total];
  }
  return [1, "…", page - 1, page, page + 1, "…", total];
}

const navButton =
  "h-9 gap-2 rounded-[8px] border-[#E8E8E8] px-3.5 text-[14px] font-semibold text-[#070707] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]";

export function TablePagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <nav
      aria-label="pagination"
      className="flex items-center justify-between gap-2 border-t border-[#E3E3E3] px-3 pt-3 pb-4"
    >
      <Button
        variant="outline"
        className={navButton}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <Image src="/assets/icons/admin/arrow-left.svg" alt="" width={20} height={20} />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <ul className="flex items-center gap-0.5">
        {pageItems(page, Math.max(totalPages, 1)).map((item, i) => (
          <li key={`${item}-${i}`}>
            {item === "…" ? (
              <span className="flex size-10 items-center justify-center text-[13px] font-medium text-[#5F5F5F]">
                ...
              </span>
            ) : (
              <button
                type="button"
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}
                className={cn(
                  "flex size-10 cursor-pointer items-center justify-center rounded-[8px] border",
                  item === page
                    ? "border-[#E3E3E3] bg-[#F5F5F5] text-[14px] font-semibold text-[#070707]"
                    : "border-transparent text-[13px] font-medium text-[#5F5F5F] hover:bg-[#F5F5F5]",
                )}
              >
                {item}
              </button>
            )}
          </li>
        ))}
      </ul>

      <Button
        variant="outline"
        className={navButton}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <span className="hidden sm:inline">Next</span>
        <Image src="/assets/icons/admin/arrow-right.svg" alt="" width={20} height={20} />
      </Button>
    </nav>
  );
}
