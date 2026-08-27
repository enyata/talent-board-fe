"use client";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import ChatListEmptyState from "./components/ChatListEmptyState";
import ChatThread from "./components/ChatThread";
import TabButton from "./components/TabButton";
import ActiveChat from "./components/ActiveChat";
import { useMessagesApi } from "@/hooks/useMessages";
import { useQuery } from "@tanstack/react-query";
import {
  MessageRequest,
  Thread,
  ThreadOrRequest,
} from "@/types/APIResponseTypes";
import { isThread } from "@/lib/helpers";
import { ChatListSkeleton } from "./components/ChatListSkeleton";
import { useAuthStore } from "@/store/authStore";

type Tab = "all" | "accepted" | "requests";

const MessagesPage = () => {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<Tab>("all");
  const [threadSearch, setThreadSearch] = useState("");
  const [selectedThread, setSelectedThread] = useState<ThreadOrRequest | null>(
    null,
  );

  const {
    fetchOutgoingMessageRequests,
    fetchIncomingMessageRequests,
    fetchActiveThreads,
  } = useMessagesApi();
  const { data: outgoingRequests, isLoading: isFetchOutgoingRequestsLoading } =
    useQuery({
      queryKey: ["outgoing-requests"],
      queryFn: fetchOutgoingMessageRequests,
      enabled: user?.role !== "talent",
    });
  const { data: incomingRequests, isLoading: isFetchIncomingRequestsLoading } =
    useQuery({
      queryKey: ["incoming-requests"],
      queryFn: fetchIncomingMessageRequests,
      enabled: user?.role !== "recruiter",
    });
  const { data: activeThreads, isLoading: isFetchActiveThreadsLoading } =
    useQuery({
      queryKey: ["active-threads"],
      queryFn: fetchActiveThreads,
    });

  console.log("incomingRequests", incomingRequests);
  console.log("outgoingRequests", outgoingRequests);
  console.log("activeThreads", activeThreads);
  const rows = React.useMemo(() => {
    // Extract and safely fallback to empty arrays if undefined
    const outgoing = outgoingRequests ?? [];
    const incoming = incomingRequests ?? [];
    const threads = activeThreads ?? [];

    const ALL_ITEMS: ThreadOrRequest[] = [...outgoing, ...incoming, ...threads];

    const q = threadSearch.trim().toLowerCase();

    return ALL_ITEMS.filter((t) => threadMatchesTab(t, tab)).filter((t) => {
      if (!q) return true;
      return getSearchableText(t).includes(q);
    });
  }, [tab, threadSearch, incomingRequests, outgoingRequests, activeThreads]);

  return (
    <div className="w-full px-4 md:px-[32px] mt-[24px] pb-[80px]">
      <div className=" w-full">
        <Card className="shadow-none outline-px md:mt-[36px] mt-[16px] py-0 grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          {/* chat list */}
          <div
            className={`
        relative h-[calc(100dvh-100px)] overflow-y-auto py-2 lg:border-r
        ${selectedThread ? "hidden lg:block" : "block"}
      `}
          >
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
                  Requests({incomingRequests?.length})
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
              {isFetchActiveThreadsLoading ||
              isFetchIncomingRequestsLoading ||
              isFetchOutgoingRequestsLoading ? (
                <>
                  <ChatListSkeleton />
                  <ChatListSkeleton />
                  <ChatListSkeleton />
                  <ChatListSkeleton />
                </>
              ) : (
                !rows.length && <ChatListEmptyState query={threadSearch} />
              )}
              {rows.map((chat, idx) => {
                const isActive = selectedThread?.id === chat.id;
                return (
                  <ChatThread
                    key={chat.id}
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
          <div
            className={`
        relative h-[calc(100dvh-100px)] overflow-y-auto py-2
        ${selectedThread ? "block" : "hidden lg:flex"}
      `}
          >
            {!selectedThread ? (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  All messages will appear here
                </p>
              </div>
            ) : (
              <ActiveChat
                thread={selectedThread}
                closeThread={() => setSelectedThread(null)}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

function threadMatchesTab(c: MessageRequest | Thread, tab: Tab): boolean {
  switch (tab) {
    case "all":
      return true;

    case "accepted":
      // Threads represent accepted connections
      // If it's a MessageRequest, check if status is explicitly 'accepted'
      if (isThread(c)) return true;
      return c.status === "accepted";

    case "requests":
      // MessageRequests with 'pending' (or non-accepted) status are pending requests
      if (isThread(c)) return false;
      return c.status === "pending";

    default:
      return true;
  }
}

// Helper to safely extract search text across both types
const getSearchableText = (item: ThreadOrRequest): string => {
  const noteOrMessage =
    "intro_note" in item ? item.intro_note : (item.latest_message?.body ?? "");
  const recruiterName = `${item.recruiter.first_name} ${item.recruiter.last_name}`;
  const talentName = `${item.talent.first_name} ${item.talent.last_name}`;
  const partnerName =
    "conversation_partner" in item
      ? `${item.conversation_partner.first_name} ${item.conversation_partner.last_name}`
      : "";

  return `${recruiterName} ${talentName} ${partnerName} ${noteOrMessage}`.toLowerCase();
};

export default MessagesPage;
