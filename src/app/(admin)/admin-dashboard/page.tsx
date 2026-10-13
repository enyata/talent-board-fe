"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/components/admin/dashboard/stat-card";
import { PipelineFunnelCard } from "@/components/admin/dashboard/pipeline-funnel-card";
import { UserRetentionCard } from "@/components/admin/dashboard/user-retention-card";
import { SchedulingCard } from "@/components/admin/dashboard/scheduling-card";
import { keyMetrics, overviewStats } from "@/components/admin/dashboard/data";

const PERIODS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
];

const AdminDashboardPage = () => {
  const router = useRouter();
  const [period, setPeriod] = useState("today");

  return (
    <div className="flex w-full flex-col gap-5 px-4 pt-4 pb-[80px] md:px-[32px]">
      <div className="flex items-center justify-between">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="gap-2 rounded-[8px] border-[#E9EAEA] bg-white py-1.5 pr-1.5 pl-2 text-[14px] text-[#252C32] shadow-none data-[size=default]:h-[30px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PERIODS.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-2 rounded-[8px] px-2 text-[14px] font-normal text-[#252C32]"
          onClick={() => router.refresh()}
        >
          Refresh
          <Image src="/assets/icons/admin/refresh.svg" alt="" width={16} height={16} />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="grid gap-2.5 md:grid-cols-3">
          {overviewStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <section className="flex flex-col gap-2 rounded-[12px] border border-[#E9EAEA] bg-[#FEFEFE] p-2">
          <h2 className="text-[16px] leading-[19.2px] font-bold text-[#333]">
            Key metrics
          </h2>
          <div className="grid gap-2.5 md:grid-cols-3">
            {keyMetrics.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row">
        <PipelineFunnelCard />
        <div className="flex flex-col gap-4 xl:w-[368px] xl:shrink-0">
          <UserRetentionCard />
          <SchedulingCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
