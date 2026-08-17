import React, { ChangeEvent, useState } from "react";
import { ThreadType } from "../page";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess } from "@/lib/Alerts";

const ActiveChat = ({ thread }: { thread: ThreadType }) => {
  const [text, setText] = useState("");

  const sendText = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setText("");
    showSuccess("Text sent");
  };
  return (
    <div className="relative flex flex-col py-2 h-[650px] overflow-y-auto">
      {/* top bar */}
      <div className="sticky -top-2 z-10 bg-background">
        <div className="flex justify-between items-center px-[24px] py-[9px] border-b">
          <div className="flex items-center gap-[10px] text-left transition-colors hover:bg-muted/50">
            <div className="relative shrink-0">
              <img
                src={thread.avatar}
                alt={thread.name}
                className="h-[32px] w-[32px] rounded-full object-cover"
              />

              {/* online status indicator */}
              <span
                className={`absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full border-2 border-background ${
                  thread.online ? "bg-success" : "bg-muted-foreground/80"
                }`}
              />
            </div>

            <div className="min-w-0 flex-1 flex flex-col gap-0">
              <h3 className="truncate font-medium">{thread.name}</h3>
              <span
                className={cn(
                  "text-[10px] text-muted-foreground font-semibold",
                  thread.online && "text-primary",
                )}
              >
                {thread.online ? "Online" : "Offline"}
              </span>
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
      <section className="flex-1 overflow-y-auto pt-10 px-[24px]">
        {/* user */}
        <div className="flex flex-col items-center mt-[80px]">
          <div className="relative shrink-0">
            <img
              src={thread.avatar}
              alt={thread.name}
              className="h-[48px] w-[48px] rounded-full object-cover"
            />

            {/* online status indicator */}
            <span
              className={`absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full border-2 border-background ${
                thread.online ? "bg-success" : "bg-muted-foreground/80"
              }`}
            />
          </div>
          <h3 className="font-bold mt-[10px] mb-[5px]">{thread.name}</h3>
          <p className="text-xs text-muted-foreground">Recruiter, Google</p>
        </div>
        {/* chats */}
        <div className="flex flex-col gap-[15px] mt-[32px]">
          <PeerChatBubble
            message={
              "Strong agree! Thanks for the engagement and patronage! 🚑"
            }
            avatar={"/assets/images/Rusty.jpg"}
            time={"Today 11:56"}
          />
          <SelfChatBubble message={"Oh! Ok, Thanks 👍🏾"} time={"Today 11:56"} />
        </div>
        {!thread.isAccepted && <MessageRequest name={thread.name} />}
      </section>
      {/* message input box */}
      {thread.isAccepted && (
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

const MessageRequest = ({ name }: { name: string }) => {
  return (
    <div className="w-full px-6 py-6 text-center mt-[32px]">
      <h2 className="text-xl font-bold text-foreground">
        Accept message request from {name}?
      </h2>

      <p className="mx-auto mt-3 max-w-[550px] text-base leading-6 text-muted-foreground">
        If you accept, they will also be able to call you and see info such as
        your activity status and when you've read messages.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="h-[42px] text-base font-semibold"
        >
          Decline
        </Button>

        <Button
          type="button"
          className="h-[42px] bg-[#7654D8] text-base font-semibold text-white hover:bg-[#6848c7]"
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

const PeerChatBubble = ({
  avatar,
  message,
  time,
}: {
  avatar: string;
  message: string;
  time: string;
}) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-end gap-2">
        {/* Avatar */}
        <img
          src={avatar}
          alt=""
          className="h-[16px] w-[16px] rounded-full border-1 border-[#7654D8] object-cover"
        />

        {/* Message bubble */}
        <div className="relative max-w-[80%] rounded-[20px] bg-muted px-[12px] py-[7px] text-sm leading-[1.4] text-[#383639]">
          {/* Bubble tail */}
          <div className="absolute bottom-[-7px] left-[-1px] h-6 w-8 overflow-hidden">
            <img
              src={"/assets/icons/Shape.svg"}
              alt={"bubble tail"}
              // className="h-[32px] w-[32px] rounded-full object-cover"
            />
          </div>
          <span className="relative">{message}</span>
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
      {/* <div className="flex items-end gap-2">
      </div> */}
      {/* Message bubble */}
      <div className="relative max-w-[80%] rounded-[20px] bg-primary px-[12px] py-[7px] text-sm leading-[1.4] text-white">
        {/* Bubble tail */}
        <div className="absolute bottom-[-7px] right-[-20px] h-6 w-8 overflow-hidden">
          <img
            src={"/assets/icons/Shape2.svg"}
            alt={"bubble tail"}
            // className="h-[32px] w-[32px] rounded-full object-cover"
          />
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
