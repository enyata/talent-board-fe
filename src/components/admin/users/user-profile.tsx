"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getProxiedImageUrl } from "@/lib/proxy-image";
import { getSkillLabelByValue } from "@/lib/skills_sort";
import skillsLibrary from "../../../../public/skills_library.json";
import { AdminUser, fullName } from "./data";
import { displayUrl, formatLongDate } from "./format";
import { copyEmail } from "./copy-email";
import { UserStatusBadge } from "./user-status-badge";
import { useStatusDialogs } from "./user-dialogs";
import { UserActivityLog } from "./user-activity-log";
import { UserAdminActions } from "./user-admin-actions";

const TABS = ["About", "User activity log", "Admin actions"] as const;
type Tab = (typeof TABS)[number];

const headerButton =
  "h-11 gap-2 rounded-[8px] border-[#E9EAEA] bg-[#FEFEFE] px-4 text-[14px] font-normal text-[#252C32] shadow-none";

const smallButton =
  "h-auto gap-1 rounded-[3px] border-[0.5px] border-[#B9B9B9] px-2 py-1.5 text-[12px] leading-[1.2] font-medium text-[#5F5F5F] shadow-none";

function Icon({ name, size }: { name: string; size: number }) {
  return <Image src={`/assets/icons/admin/${name}.svg`} alt="" width={size} height={size} />;
}

function InfoRow({
  value,
  label,
  action,
}: {
  value: string;
  label: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-col">
        <p className="truncate text-[14px] leading-[21px] text-[#252C32]">{value}</p>
        <p className="text-[12px] text-[#74737A]">{label}</p>
      </div>
      {action}
    </div>
  );
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function AboutTab({ user }: { user: AdminUser }) {
  const summary = [
    ["Active connections", user.activity.connections],
    ["Interviewing", user.activity.interviewing],
    ["Contacted", user.activity.contacted],
    ["Hired", user.activity.hired],
  ] as const;

  const handleDownloadResume = () => {
    if (!user.resumeUrl) return;
    const link = document.createElement("a");
    link.href = user.resumeUrl;
    link.download = `${user.firstName}-resume.pdf`;
    link.click();
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex shrink-0 flex-col gap-4 border-[#E4E7EC] p-4 lg:w-[422px] lg:border-r">
        <div className="flex flex-col gap-4 rounded-[8px] border border-[#E4E7EC] p-4">
          <p className="text-[14px] font-semibold text-[#252C32]">Contact Information:</p>
          <InfoRow value={formatLongDate(user.joinedAt)} label="Join date" />
          <InfoRow value={formatLongDate(user.lastActiveAt)} label="Last active" />
          <InfoRow
            value={user.email}
            label="Email"
            action={
              <Button variant="outline" className={smallButton} onClick={() => copyEmail(user.email)}>
                <Icon name="copy-outline" size={14} />
                Copy email
              </Button>
            }
          />
          {user.portfolioUrl && (
            <InfoRow
              value={displayUrl(user.portfolioUrl)}
              label="Portfolio"
              action={
                <Button variant="outline" className={smallButton} onClick={() => openExternal(user.portfolioUrl!)}>
                  <Icon name="external-link" size={12} />
                  Visit Portfolio
                </Button>
              }
            />
          )}
          {user.linkedinUrl && (
            <InfoRow
              value={displayUrl(user.linkedinUrl)}
              label="LinkedIn"
              action={
                <Button variant="outline" className={smallButton} onClick={() => openExternal(user.linkedinUrl!)}>
                  <Icon name="external-link" size={12} />
                  Visit LinkedIn
                </Button>
              }
            />
          )}
        </div>

        <div className="flex flex-col gap-3 rounded-[8px] border border-[#E4E7EC] p-4 text-[14px] text-[#252C32]">
          <p className="font-semibold">Activity summary:</p>
          {summary.map(([label, count]) => (
            <div key={label} className="flex items-center justify-between leading-[21px]">
              <span>{label}</span>
              <span>{count || "-"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-9 p-4 text-[#5F5F5F]">
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-semibold text-[#252C32]">Bio:</p>
          <p className="text-[13px] leading-[1.3]">{user.bio || "No bio available."}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[12px] leading-[1.3] font-semibold">Skills:</p>
          <div className="flex flex-wrap gap-1">
            {user.skills.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="rounded-[3px] border-[0.5px] border-[#696969] bg-[#F5F5F5] p-1.5 text-[12px] leading-none font-semibold"
              >
                {getSkillLabelByValue(skill, skillsLibrary)}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[12px] leading-[1.3] font-semibold text-[#252C32]">Experience:</p>
          <p className="text-[13px] capitalize">{user.experience}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-semibold text-[#252C32]">Resume:</p>
          <div className="flex w-full max-w-[361px] items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/assets/images/pdfholder.png" alt="" width={50} height={62} />
              <div className="flex flex-col gap-0.5 text-[11px] leading-[1.3]">
                <p className="text-[#9E9E9E]">{fullName(user)}&apos;s resume</p>
                <p className="font-medium">108.3kb</p>
              </div>
            </div>
            <Button
              variant="outline"
              className={smallButton}
              disabled={!user.resumeUrl}
              onClick={handleDownloadResume}
            >
              <Icon name="download" size={16} />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UserProfile({ user }: { user: AdminUser }) {
  const [tab, setTab] = useState<Tab>("About");
  const { toggleStatus, dialogs } = useStatusDialogs();
  const suspended = user.status === "suspended";

  return (
    <div className="rounded-[16px] border border-[#F3F3F3] bg-[#FAFAFA] p-2">
      <div className="overflow-hidden rounded-[16px] border border-[#E9EAEA] bg-white">
        <div className="flex flex-col gap-4 border-b border-[#E4E7EC] p-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-6">
            <div className="relative flex h-24 w-[87px] shrink-0 items-end justify-center overflow-hidden rounded-[12.735px] bg-[#F6F7F7] p-1">
              <Image
                src={getProxiedImageUrl(user.avatar) || "/assets/images/placeholder-img.svg"}
                alt={fullName(user)}
                fill
                sizes="87px"
                className="object-cover"
              />
              {user.availableToWork && (
                <span className="relative flex items-center gap-0.5 rounded-full bg-[#F3FFF8] p-1 text-[8px] font-medium text-[#27AE60] shadow-[0px_1px_30.5px_rgba(0,0,0,0.25)] backdrop-blur-[10px]">
                  <span className="size-[5px] rounded-full bg-[#27AE60]" />
                  Available to work
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <p className="text-[20px] leading-none font-semibold text-[#070707]">{fullName(user)}</p>
                <UserStatusBadge status={user.status} />
              </div>
              <p className="text-[14px] leading-none text-[#5F5F5F] capitalize">
                {user.role}, {user.jobTitle}
              </p>
              <p className="flex items-center gap-1 py-0.5 text-[12px] leading-none whitespace-pre text-[#5F5F5F]">
                <Image src="/assets/icons/admin/location.svg" alt="" width={10.33} height={12.67} className="mx-[2px]" />
                {user.location}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className={headerButton}>
              <a href={`mailto:${user.email}`}>
                <Icon name="email" size={18} />
                Send email
              </a>
            </Button>
            {/* TODO: wire to connections/reports views once they exist. */}
            <Button variant="outline" className={headerButton}>
              <Image src="/assets/icons/admin/eye.svg" alt="" width={23} height={22} />
              View connections
            </Button>
            <Button variant="outline" className={headerButton}>
              <Icon name="report" size={18} />
              View reports
            </Button>
            <Button
              className={cn(
                "h-11 gap-2 rounded-[8px] px-4 text-[14px] font-normal shadow-none",
                suspended
                  ? "bg-primary text-[#FEFEFE] hover:bg-primary/90"
                  : "bg-[#FFECEC] text-[#CC2129] hover:bg-[#FED6D6]",
              )}
              onClick={() => toggleStatus(user)}
            >
              {suspended ? (
                <Image src="/assets/icons/admin/reactivate.svg" alt="" width={21} height={21} />
              ) : (
                <span className="flex size-[18px] items-center justify-center">
                  <Image src="/assets/icons/admin/user-blocked.svg" alt="" width={16.125} height={16.125} />
                </span>
              )}
              {suspended ? "Reactivate account" : "Suspend account"}
            </Button>
          </div>
        </div>

        <div role="tablist" className="flex gap-8 overflow-x-auto border-b border-[#E9EAEA] bg-[#FAFAFA] px-4">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "flex cursor-pointer flex-col gap-3 pt-3 text-[16px] leading-[18px] font-semibold whitespace-nowrap",
                tab === t ? "text-primary" : "text-[#252C32]",
              )}
            >
              {t}
              <span className={cn("h-0.5 w-full bg-primary", tab !== t && "opacity-0")} />
            </button>
          ))}
        </div>

        {tab === "About" && <AboutTab user={user} />}
        {tab === "User activity log" && <UserActivityLog userId={user.id} />}
        {tab === "Admin actions" && <UserAdminActions userId={user.id} />}
      </div>

      {dialogs}
    </div>
  );
}
