"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Bookmark,
  EllipsisVertical,
  FileText,
  Handshake,
  MapPinned,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { talentProp } from "@/types/user";
import { useAuthStore } from "@/store/authStore";
import { showError, showInfo, showSuccess } from "@/lib/Alerts";
import { getProxiedImageUrl } from "@/lib/proxy-image";
import skillsLibrary from "../../public/skills_library.json";
import { getSkillLabelByValue } from "@/lib/skills_sort";
import { getCountryNameByCode } from "@/lib/countryfromIsocode";
import { useSaveTalentMutation } from "@/hooks/mutations/talent";
import { useTruncateText } from "@/hooks/useTruncateText";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { useSendMessageRequest } from "@/hooks/mutations/messages";
import { ButtonWithLoader } from "./ui/button-with-loader";

interface TalentboardProps {
  width?: string;
  height?: string;
  bookmarked?: boolean;

  talent?: talentProp;
}

const MESSAGE_TEMPS = [
  {
    label: "Intro outreach",
    value:
      "your background caught my eye. Would you be open to a quick chat about a role I'm working on?",
  },
  {
    label: "Schedule an interview",
    value:
      "I'd love to schedule an interview to discuss a role that aligns with your experience. Are you available this week for a 30-minute call?",
  },
  {
    label: "Ask about availability",
    value:
      "I'm reaching out to check your availability for an upcoming project. Would you be open to sharing your current schedule and earliest start date?",
  },
];

const TalentCard = ({
  width = "max-w-[418px]",
  height = "md:h-[291px]",
  talent,
}: TalentboardProps) => {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(talent?.is_saved || false);
  const { user } = useAuthStore();
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [talentMessage, setTalentMessage] = useState("");

  const talentId = talent?.id || "";

  const { mutate: saveATalent, isPending: isSaving } = useSaveTalentMutation();

  const handleCardClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user && user?.role === "talent") {
      showInfo("You need a recruiter account to view this talent profile.");
      return;
    }
    if (user && user?.role === "recruiter") {
      router.push(`/dashboard/talents/${talent?.id}`);
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleMessageTalent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }
    if (user && user?.role === "talent") {
      showInfo("You need a recruiter account to senda message to this talent.");
      return;
    }

    setShowMessageDialog(true);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    stopPropagation(e);
    if (!user) {
      router.push("/login");
      return;
    }
    if (user && user?.role === "talent") {
      showInfo("You need a recruiter account to bookmark this talent profile.");
      return;
    }
    if (user && user?.role === "recruiter") {
      const wasBookmarked = bookmarked;
      setBookmarked((prev) => !prev);
      saveATalent(talentId, {
        onSuccess: () => {
          showSuccess(
            `Talent ${!wasBookmarked ? "bookmarked" : "removed from bookmarks"} successfully!`,
          );
        },
        onError: () => {
          setBookmarked(wasBookmarked);
          showError(
            `Failed to ${!wasBookmarked ? "bookmark" : "remove bookmark"} talent.`,
          );
        },
      });
    }
  };

  const handlePortfolioClick = (
    e: React.MouseEvent,
    portfolio: string = "",
  ) => {
    stopPropagation(e);
    if (!user) {
      router.push("/login");
    }
    if (user && user?.role === "talent") {
      showInfo("You need a recruiter account to access this profile.");
    }
    if (user && user?.role === "recruiter") {
      window.open(portfolio, "_blank");
    }
  };

  const { mutate: sendRequest, isPending: isSendRequestLoading } =
    useSendMessageRequest();
  const handleSendMessageRequest = () => {
    if (!user) {
      router.push("/login");
    }
    if (user && user?.role === "talent") {
      showInfo("You need a recruiter account to access this profile.");
    }

    if (!talentMessage) {
      showError("Provide an intro note");
      return;
    }
    if (user && user?.role === "recruiter") {
      sendRequest(
        { talent_id: talent?.id || "", intro_note: talentMessage },
        {
          onSuccess: () => {
            showSuccess(
              "Sent! You will be able to continue chatting when request is accepted.",
            );
            setShowMessageDialog(false);
          },
        },
      );
    }
  };

  const { displayText } = useTruncateText(talent?.bio ?? "", 160);

  return (
    <Card
      className={`${width} ${height} min-h-[291px] min-w-0 flex flex-col justify-between w-full p-[20px] shadow-none cursor-pointer hover:bg-[#fafafa]`}
    >
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center" onClick={handleCardClick}>
            <Avatar className="size-[48px]">
              <AvatarImage src={getProxiedImageUrl(talent?.avatar)} />
              <AvatarFallback>
                {talent
                  ? talent.first_name
                    ? talent.first_name.trim().charAt(0).toUpperCase()
                    : ""
                  : ""}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-[14px] capitalize">
                {talent?.first_name} {talent?.last_name}
              </p>
              <p className="font-medium text-[#5F5F5F] text-[13px]">
                {talent?.job_title}
              </p>
            </div>
          </div>

          <div className="flex gap-[8px]">
            <Button
              onClick={handleMessageTalent}
              variant="default"
              className="h-[28px] rounded-[8px]"
            >
              <img
                src={"/assets/icons/comment-01.svg"}
                alt={"message"}
                className="h-[14px] w-[14px]"
              />
              <span className="hidden md:inline">Message</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-[28px] rounded-[8px]">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                // side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    disabled={isSaving}
                    onClick={handleBookmark}
                    className="justify-between"
                  >
                    Save
                    <Bookmark />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-between">
                    Send offer
                    <FileText />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-between">
                    Express interest
                    <Handshake />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p
          className="mt-[8px] font-semibold text-[13px] text-[#5F5F5F] text-ellipsis break-words"
          onClick={handleCardClick}
        >
          {displayText}
        </p>

        <div
          className="mt-[16px] flex gap-2 flex-wrap"
          onClick={handleCardClick}
        >
          {talent?.skills?.slice(0, 3).map((skill, index) => (
            <Button
              key={index}
              onClick={stopPropagation}
              className="bg-[#F5F5F5] text-[#5F5F5F] h-[24px] rounded-[2px] border-[1px] border-[#696969] p-[6px] text-[12px] max-w-full shrink truncate"
            >
              {getSkillLabelByValue(skill, skillsLibrary)}
            </Button>
          ))}
        </div>

        <div
          className="flex items-center gap-1 text-[#5F5F5F] font-semibold text-[13px] mt-[24px]"
          onClick={handleCardClick}
        >
          <span>
            <MapPinned size={14} strokeWidth={3} />
          </span>
          <p>
            {talent?.state} {getCountryNameByCode(talent?.country || "")}
          </p>
        </div>
      </div>

      <div className="border-t-[2px] pt-[8px] border-[#E3E3E3] flex justify-end text-[#5F5F5F] text-[12px]">
        {talent?.portfolio_url ? (
          <div
            onClick={(e) => handlePortfolioClick(e, talent?.portfolio_url)}
            className="flex items-center font-semibold cursor-pointer"
          >
            Portfolio{" "}
            <span className="ml-2">
              <SquareArrowOutUpRightIcon size={12} strokeWidth={3} />
            </span>
          </div>
        ) : (
          <div
            onClick={stopPropagation}
            className="flex items-center font-medium text-[#A3A3A3] cursor-default italic"
          >
            No portfolio link yet
          </div>
        )}
      </div>

      {/* message-talent dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <form>
          <DialogContent className="max-w-[350px] md:max-w-[521px] rounded-[20px] gap-[24px] p-[16px]">
            <DialogHeader>
              <DialogTitle className="text-[24px] font-semibold">
                Message {talent?.first_name}
              </DialogTitle>
            </DialogHeader>

            <section>
              {/* Quick actions */}
              <div className="flex flex-wrap gap-2 mb-[8px]">
                {MESSAGE_TEMPS.map((temp) => (
                  <Button
                    key={temp.label}
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-[34px] rounded-lg px-3 text-xs md:text-sm font-normal hover:bg-primary/15",
                      talentMessage ===
                        `Hi ${talent?.first_name}, ${temp.value}` &&
                        " border-primary text-primary bg-primary/10",
                    )}
                    onClick={() =>
                      setTalentMessage(
                        `Hi ${talent?.first_name}, ${temp.value}`,
                      )
                    }
                  >
                    {temp.label}
                  </Button>
                ))}
              </div>
              <Textarea
                defaultValue={talentMessage}
                className="min-h-[74px] resize-none rounded-lg border-primary px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-primary"
              />
            </section>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="h-[42px]">
                  Cancel
                </Button>
              </DialogClose>
              <ButtonWithLoader
                type="submit"
                className="h-[42px]"
                isLoading={isSendRequestLoading}
                onClick={handleSendMessageRequest}
              >
                Send request
              </ButtonWithLoader>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </Card>
  );
};

export default TalentCard;
