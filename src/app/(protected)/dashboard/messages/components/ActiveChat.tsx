import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess } from "@/lib/Alerts";
import { ArrowLeft } from "lucide-react";
import { ThreadOrRequest } from "@/types/APIResponseTypes";
import { capitalizeText, formatTimestamp, isThread } from "@/lib/helpers";
import { useAuthStore, UserRole } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useAcceptMessageRequest,
  useDeclineMessageRequest,
  useGetMessageThread,
  useReplyMessageRequest,
} from "@/hooks/mutations/messages";
import { ButtonWithLoader } from "@/components/ui/button-with-loader";
import CustomPrompts from "@/components/utils/custom-prompts";

// Helper to extract UI data consistently across both payload types
const getThreadData = (item: ThreadOrRequest, userRole: UserRole) => {
  const isAccepted = isThread(item);

  // 1. Determine partner details
  const conversation_partner =
    userRole === "recruiter" ? item.talent : item.recruiter;
  const partner = isThread(item)
    ? item.conversation_partner
    : conversation_partner; // adjust logic if current user can be talent or recruiter

  const name = `${partner.first_name} ${partner.last_name}`;
  const role = partner.role;
  const avatar = partner.avatar;
  const id = item.id;

  // 2. Extract preview message
  const message = isThread(item)
    ? (item.latest_message?.body ?? "")
    : item.intro_note;

  // 3. Format time/date
  const rawDate = isThread(item) ? item.latest_message_at : item.created_at;
  const time = new Date(rawDate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // 4. Read status / unread state
  const isUnseen = isThread(item) && item.latest_message_seen_status !== "seen";

  return {
    id,
    name,
    avatar,
    role,
    message,
    time,
    isAccepted,
    isUnseen,
  };
};

const ActiveChat = ({
  thread,
  closeThread,
}: {
  thread: ThreadOrRequest;
  closeThread: () => void;
}) => {
  let intro_note = "";
  const { user } = useAuthStore();
  const [text, setText] = useState("");
  const { name, avatar, role, isAccepted, id } = getThreadData(
    thread,
    user?.role || "talent",
  );
  const currentUserId = user?.id;

  console.log(name, id);

  const { data: allMessages } = useGetMessageThread(id);

  const { mutate: replyMessage } = useReplyMessageRequest(id);

  console.log(allMessages, "hhdhhd");

  {
    //@ts-expect-error HDHHD
    allMessages?.data?.messages?.map((msg) => {
      const isSelf = msg.source_request_id === null;
      const Bubble = isSelf ? SelfChatBubble : PeerChatBubble;

      return (
        <Bubble
          key={msg.id}
          message={msg.body || "No messages yet"}
          avatar={
            msg.sender?.avatar
              ? `/${msg.sender.avatar}`
              : "/assets/images/Rusty.jpg"
          }
          name={`${msg.sender?.first_name ?? ""} ${msg.sender?.last_name ?? ""}`.trim()}
          time={new Date(msg.created_at).toLocaleString()}
        />
      );
    });
  }

  if (thread && "intro_note" in thread) {
    intro_note = thread.intro_note;
  }

  const sendText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text?.trim()) return;

    replyMessage(
      { body: text }, // Omit<ReplyMessageRequestBody, "thread_id"> — adjust field name
      {
        onSuccess: () => {
          setText("");
          showSuccess("Text sent");
        },
      },
    );
  };
  return (
    <div className="relative flex flex-col h-full w-full">
      {/* top bar */}
      <div className="sticky -top-2 z-10 bg-background">
        <div className="flex justify-between items-center px-[10px] md:px-[24px] py-[9px] border-b">
          <div className="flex items-center gap-[10px] text-left transition-colors hover:bg-muted/50">
            <button type="button" className="lg:hidden" onClick={closeThread}>
              <ArrowLeft className="size-5" />
            </button>
            <div className="relative shrink-0">
              <Avatar className="h-[32px] w-[32px]">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="uppercase">
                  {name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {/* <img
                src={avatar}
                alt={name}
                className="h-[32px] w-[32px] rounded-full object-cover"
              /> */}

              {/* online status indicator */}
              {/* <span
                className={`absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full border-2 border-background ${
                  online ? "bg-success" : "bg-muted-foreground/80"
                }`}
              /> */}
            </div>

            <div className="min-w-0 flex-1 flex flex-col gap-0">
              <h3 className="truncate capitalize font-medium">{name}</h3>
              {/* <span
                className={cn(
                  "text-[10px] text-muted-foreground font-semibold",
                  online && "text-primary",
                )}
              >
                {online ? "Online" : "Offline"}
              </span> */}
            </div>
          </div>
          <Button className="bg-[#F6F7F7] h-[32px] w-[32px] p-0 hover:bg-muted-foreground/30">
            <img
              src={"/assets/icons/search-normal.svg"}
              alt={"search"}
              className="h-[16px] w-[16px]"
            />
          </Button>
        </div>
      </div>
      {/* content */}
      <section className="flex-1 overflow-y-auto pt-10 px-[10px] md:px-[24px]">
        {/* user */}
        <div className="flex flex-col items-center mt-[80px]">
          <div className="relative shrink-0">
            <Avatar className="h-[48px] w-[48px]">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="uppercase">
                {name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            {/* online status indicator */}
            {/* <span
              className={`absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full border-2 border-background ${
                online ? "bg-success" : "bg-muted-foreground/80"
              }`}
            /> */}
          </div>
          <h3 className="font-bold capitalize mt-[10px] mb-[5px]">{name}</h3>
          <p className="text-xs capitalize text-muted-foreground">{role}</p>
        </div>
        {/* chats */}
        <div className="flex flex-col gap-[15px] mt-[32px]">
          {!isAccepted ? (
            <PeerChatBubble
              message={intro_note}
              avatar={avatar}
              name={name}
              time={formatTimestamp(thread.updated_at)}
            />
          ) : //@ts-expect-error HDHHD
          allMessages?.data?.messages?.length ? (
            //@ts-expect-error HDHHD
            allMessages.data.messages.map((msg) =>
              msg.sender?.id === currentUserId ? (
                <SelfChatBubble
                  key={msg.id}
                  message={msg.body}
                  time={formatTimestamp(msg.created_at)}
                />
              ) : (
                <PeerChatBubble
                  key={msg.id}
                  message={msg.body}
                  avatar={
                    msg.sender?.avatar
                      ? `/${msg.sender.avatar}`
                      : "/assets/images/Rusty.jpg"
                  }
                  name={`${msg.sender?.first_name ?? ""} ${msg.sender?.last_name ?? ""}`.trim()}
                  time={formatTimestamp(msg.created_at)}
                />
              ),
            )
          ) : (
            <p className="text-center text-[14px] text-muted-foreground">
              No messages yet
            </p>
          )}
        </div>
        {!isAccepted && (
          <MessageRequest
            name={capitalizeText(name)}
            userRole={user?.role || "recruiter"}
            requestId={thread.id}
          />
        )}
      </section>
      {/* message input box */}
      {isAccepted && (
        <div className="w-full shrink-0 bg-background">
          <form onSubmit={sendText}>
            <div className="px-[12px] py-[12px]">
              <div className="relative w-full">
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button
                    type="submit"
                    variant={"ghost"}
                    className="text-primary h-[32px] w-[32px] p-0 hover:bg-muted-foreground/30"
                    aria-label="submit"
                    disabled={!text}
                  >
                    <img
                      src={"/assets/icons/send.svg"}
                      alt={"search"}
                      className="h-[16px] w-[16px]"
                    />
                  </Button>
                </div>
                <Input
                  className={`w-full rounded-[8px] h-[42px] text-[14px] pr-10 pl-3`}
                  placeholder="Type here..."
                  value={text ?? ""}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const MessageRequest = ({
  name,
  userRole,
  requestId,
}: {
  name: string;
  userRole: UserRole;
  requestId: string;
}) => {
  const [showDeclinePrompt, setShowDeclinePrompt] = useState(false);
  const isTalent = userRole === "talent";

  const { mutate: acceptRequest, isPending: isAcceptRequestLoading } =
    useAcceptMessageRequest();
  const { mutate: declineRequest, isPending: isDeclineRequestLoading } =
    useDeclineMessageRequest();
  const handleAcceptMessageRequest = () => {
    acceptRequest(requestId, {
      onSuccess: () => {
        showSuccess("Message request accepted!");
      },
    });
  };

  const handleDeclineMessageRequest = () => {
    declineRequest(requestId, {
      onSuccess: () => {
        showSuccess("Message request declined!");
        setShowDeclinePrompt(false);
      },
    });
  };

  return (
    <div className="w-full px-6 py-6 text-center mt-[32px]">
      <h2 className="text-xl font-bold text-foreground">
        {isTalent
          ? `Accept message request from ${name}?`
          : `Message request sent to ${name}`}
      </h2>

      <p className="mx-auto mt-3 max-w-[550px] text-base leading-6 text-muted-foreground">
        {isTalent
          ? "If you accept, they will also be able to call you and see info such as your activity status and when you've read messages."
          : `${name} needs to accept your message request before you can start chatting.`}
      </p>

      {isTalent && (
        <div className="mt-5 grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-[42px] text-base font-semibold"
            onClick={() => setShowDeclinePrompt(true)}
          >
            Decline
          </Button>

          <ButtonWithLoader
            type="button"
            className="h-[42px] bg-[#7654D8] text-base font-semibold text-white hover:bg-[#6848c7]"
            onClick={handleAcceptMessageRequest}
            isLoading={isAcceptRequestLoading}
          >
            Accept
          </ButtonWithLoader>
        </div>
      )}

      <CustomPrompts
        variant="destructive"
        isOpen={showDeclinePrompt}
        onClose={() => setShowDeclinePrompt(false)}
        primaryBtnAction={handleDeclineMessageRequest}
        isActionLoading={isDeclineRequestLoading}
        title="Decline request"
        desc={`Are you sure you want to decline message request from ${capitalizeText(name)}`}
      />
    </div>
  );
};

const PeerChatBubble = ({
  avatar,
  name,
  message,
  time,
}: {
  avatar: string;
  name: string;
  message: string;
  time: string;
}) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-end gap-2">
        {/* Avatar */}
        <Avatar className="h-[16px] w-[16px] border-1 border-[#7654D8]">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="uppercase">
            {name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        {/* Message bubble */}
        <div className="relative w-fit max-w-[80%] break-words rounded-[20px] bg-muted px-[12px] py-[7px] text-sm leading-[1.4] text-[#383639]">
          {/* Bubble tail */}
          <div className="absolute bottom-[-7px] left-[-1px] h-6 w-8 overflow-hidden">
            <img
              src={"/assets/icons/Shape.svg"}
              alt={"bubble tail"}
              // className="h-[32px] w-[32px] rounded-full object-cover"
            />
          </div>
          <span className="relative">{message} </span>
        </div>
      </div>

      {/* Timestamp */}
      <span className="ml-0 mt-[8px] text-[10px] text-muted-foreground">
        {time}
      </span>
    </div>
  );
};

const SelfChatBubble = ({
  message,
  time,
}: {
  message: string;
  time: string;
}) => {
  return (
    <div className="flex flex-col items-end">
      {/* Message bubble */}
      <div className="relative w-fit max-w-[80%] break-words rounded-[20px] bg-primary px-[12px] py-[7px] text-sm leading-[1.4] text-white">
        {/* Bubble tail */}
        <div className="absolute bottom-[-7px] right-[-20px] h-6 w-8 overflow-hidden">
          <img src={"/assets/icons/Shape2.svg"} alt={"bubble tail"} />
        </div>
        <span className="relative">{message}</span>
      </div>

      {/* Timestamp */}
      <span className="mr-0 mt-[8px] text-[10px] text-muted-foreground">
        {time}
      </span>
    </div>
  );
};

export default ActiveChat;
