"use client";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { AcceptedChatLists, NotAcceptedChatLists } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import ChatListEmptyState from "./components/ChatListEmptyState";
import ChatThread from "./components/ChatThread";
import TabButton from "./components/TabButton";
import ActiveChat from "./components/ActiveChat";

export type ThreadType = {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  online?: boolean;
  read?: boolean;
  isAccepted?: boolean;
  unreadCount?: number;
};
type Tab = "all" | "accepted" | "requests";

function threadMatchesTab(c: ThreadType, tab: Tab): boolean {
  switch (tab) {
    case "all":
      return true;
    case "accepted":
      return !!c?.isAccepted;
    case "requests":
      return !!!c?.isAccepted;
  }
}

const MessagesPage = () => {
  const [tab, setTab] = useState<Tab>("all");
  const [threadSearch, setThreadSearch] = useState("");
  const [selectedThread, setSelectedThread] = useState<ThreadType | null>(null);

  const rows = React.useMemo(() => {
    const q = threadSearch.trim().toLowerCase();
    const ALL_Threads: ThreadType[] = [
      ...NotAcceptedChatLists,
      ...AcceptedChatLists,
    ];
    return ALL_Threads.filter((c) => threadMatchesTab(c, tab)).filter((c) => {
      if (!q) return true;
      const hay = `${c.name} ${c.message}`.toLowerCase();
      return hay.includes(q);
    });
  }, [tab, threadSearch]);

  return (
    <div className="w-full px-4 md:px-[32px] mt-[24px] pb-[80px]">
      <div className=" w-full">
        <Card className="shadow-none outline-px md:mt-[36px] mt-[16px] py-0 grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          {/* chat list */}
          <div className="relative lg:border-r py-2 h-[650px] overflow-y-auto">
            <div className="sticky -top-2 z-10 bg-background">
              {/* ── Tabs ── */}
              <div className="flex flex-wrap justify-between items-center gap-1 border-b px-3">
                <TabButton active={tab === "all"} onClick={() => setTab("all")}>
                  All
                </TabButton>
                <TabButton
                  active={tab === "accepted"}
                  onClick={() => setTab("accepted")}
                >
                  Accepted
                </TabButton>
                <TabButton
                  active={tab === "requests"}
                  onClick={() => setTab("requests")}
                >
                  Requests({NotAcceptedChatLists.length})
                </TabButton>
              </div>

              {/* search input */}
              <div className="mx-[12px] py-[24px]">
                <div className="relative w-full">
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {threadSearch !== "" && (
                      <span
                        className="cursor-pointer text-black"
                        onClick={() => setThreadSearch("")}
                      >
                        <X strokeWidth={1} size={18} />
                      </span>
                    )}
                  </div>
                  {/* search */}
                  <span
                    className={`${
                      threadSearch !== "" ? "hidden" : "block"
                    } absolute left-3 top-1/2 -translate-y-1/2 text-[#AFAFAF]`}
                  >
                    <Search strokeWidth={1} size={18} />
                  </span>
                  <Input
                    className={`w-full rounded-[8px] h-[42px] text-[14px] pr-10 ${
                      threadSearch !== "" ? "pl-3" : "pl-8"
                    }`}
                    placeholder="Search"
                    value={threadSearch ?? ""}
                    onChange={(e) => setThreadSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              {!rows.length ? <ChatListEmptyState /> : ""}
              {rows.map((chat, idx) => {
                const isActive = selectedThread?.id === chat.id;
                return (
                  <ChatThread
                    thread={chat}
                    selectThread={() => setSelectedThread(chat)}
                    isActive={isActive}
                    isLastIndex={idx === rows.length - 1}
                  />
                );
              })}
            </div>
          </div>

          {/* chat */}
          {!selectedThread ? (
            <div className="flex justify-center items-center h-[650px] overflow-y-auto">
              <p className="text-muted-foreground text-sm">
                All messages will appear here
              </p>
            </div>
          ) : (
            <ActiveChat thread={selectedThread} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;
