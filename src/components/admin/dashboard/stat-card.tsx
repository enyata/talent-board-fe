import Image from "next/image";
import Link from "next/link";
import { Trend, TrendIndicator } from "./trend-indicator";

export type Stat = {
  label: string;
  value: string;
  trend: Trend;
  caption: string;
  href?: string;
};

export function StatCard({ label, value, trend, caption, href }: Stat) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-[12px] border border-[#E9EAEA] bg-[#F6F7F7] p-2">
      <div className="flex items-center justify-between gap-2">
        <p className="flex-1 text-[12px] text-[#252C32]">
          {label}
        </p>
        {href && (
          <Link href={href} aria-label={`View ${label.toLowerCase()}`}>
            <Image
              src="/assets/icons/admin/arrow-outward.svg"
              alt=""
              width={17}
              height={17}
              className="-scale-y-100 rotate-180"
            />
          </Link>
        )}
      </div>
      <div className="flex w-full flex-col gap-2 rounded-[8px] border border-[#E9EAEA] bg-[#FEFEFE] p-2.5">
        <p className="text-[24px] leading-[28.8px] font-bold text-[#252C32]">
          {value}
        </p>
        <TrendIndicator trend={trend} caption={caption} />
      </div>
    </div>
  );
}
