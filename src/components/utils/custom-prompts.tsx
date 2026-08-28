"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { ButtonWithLoader } from "../ui/button-with-loader";
import { Info, Trash2, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Input } from "../ui/input";

type variant_type = "default" | "destructive" | "info" | "warning" | "primary";

interface PromptProps {
  variant?: variant_type;
  isOpen: boolean;
  onClose: (open: boolean) => void;
  title?: string;
  isActionLoading?: boolean;
  primaryBtnAction: () => void;
  desc: string;
  isDel?: boolean;
  confirmString?: string;
  primaryButtonLabel?: string;
  cancelButtonLabel?: string;
  cancelBtnAction?: () => void;
}

const VARIANT_META: Record<
  variant_type,
  {
    buttonClass: string;
    iconClass: string;
    icon: ReactNode;
  }
> = {
  primary: {
    buttonClass:
      "bg-primary/10 text-primary hover:bg-primary/20 focus-visible:border-primary/40 focus-visible:ring-primary/20",
    iconClass: "bg-primary/10 text-primary",
    icon: <Info className="size-5" />,
  },
  destructive: {
    buttonClass:
      "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
    iconClass: "bg-destructive/10 text-destructive",
    icon: <TriangleAlert className="size-5" />,
  },
  info: {
    buttonClass:
      "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 focus-visible:border-blue-500/40 focus-visible:ring-blue-500/20",
    iconClass: "bg-blue-500/10 text-blue-500",
    icon: <Info className="size-5" />,
  },
  warning: {
    buttonClass:
      "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 focus-visible:border-yellow-500/40 focus-visible:ring-yellow-500/20",
    iconClass: "bg-yellow-500/10 text-yellow-500",
    icon: <TriangleAlert className="size-5" />,
  },
  default: {
    buttonClass:
      "bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/20 focus-visible:border-zinc-500/40 focus-visible:ring-zinc-500/20",
    iconClass: "bg-zinc-500/10 text-zinc-500",
    icon: <TriangleAlert className="size-5" />,
  },
};

const CustomPrompts = ({
  isOpen,
  onClose,
  title,
  isActionLoading,
  desc,
  primaryBtnAction,
  variant = "default",
  isDel,
  confirmString,
  primaryButtonLabel,
  cancelButtonLabel,
  cancelBtnAction,
}: PromptProps) => {
  const [confirmText, setConfirmText] = useState("");
  const isBtnEnabled = confirmString ? confirmString === confirmText : true;

  const closeAction = (state: boolean) => {
    setConfirmText("");
    onClose(state);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeAction}>
      <AlertDialogContent className="w-[320px] p-0 overflow-hidden border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl rounded-xl">
        {/* CONTENT */}
        <div className="px-6 pt-6 pb-1 text-center">
          {/* ICON */}
          <div
            className={cn(
              "mx-auto mb-3 flex size-10 items-center justify-center rounded-md",
              VARIANT_META[variant].iconClass,
            )}
          >
            {/* <Trash2 className="size-5 text-destructive" /> */}
            {isDel ? <Trash2 className="size-5" /> : VARIANT_META[variant].icon}
          </div>

          <AlertDialogHeader className="space-y-0">
            <AlertDialogTitle className="text-base font-semibold text-center">
              {title}
            </AlertDialogTitle>

            <AlertDialogDescription
              className="text-sm text-muted-foreground leading-relaxed text-center"
              dangerouslySetInnerHTML={{ __html: desc }}
            ></AlertDialogDescription>
          </AlertDialogHeader>

          {confirmString ? (
            <>
              {/* DIVIDER */}
              <div className="h-px bg-border/60 mt-4" />

              {/* Name & Description */}
              <div className="flex flex-col gap-1.5 text-left mt-5">
                <label className="text-xs font-bold text-foreground">
                  To confirm, type &quot;{confirmString}&quot; in the box below
                </label>
                <Input
                  value={confirmText}
                  name="name"
                  onChange={({ target }) => setConfirmText(target.value)}
                  placeholder="Enter text to continue"
                  className="h-8 text-xs"
                  autoComplete="off"
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        {/* FOOTER */}
        <AlertDialogFooter className="flex-row border-t justify-center gap-3 px-4 py-4 bg-muted/60">
          <ButtonWithLoader
            variant="outline"
            onClick={() => {
              if (cancelBtnAction) {
                cancelBtnAction();
              } else {
                closeAction(false);
              }
            }}
            className={cn(
              "flex-1 h-8 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted",
              cancelBtnAction && isActionLoading ? "hidden" : "",
            )}
          >
            {cancelButtonLabel || "Cancel"}
          </ButtonWithLoader>

          <ButtonWithLoader
            onClick={primaryBtnAction}
            className={cn(
              "flex-1 h-8 rounded-lg font-medium text-sm px-2.5",
              VARIANT_META[variant].buttonClass,
              cancelBtnAction && isActionLoading ? "w-full" : "",
            )}
            isLoading={isActionLoading}
            disabled={!isBtnEnabled}
          >
            {isDel ? "Delete" : primaryButtonLabel || "Continue"}
          </ButtonWithLoader>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomPrompts;
