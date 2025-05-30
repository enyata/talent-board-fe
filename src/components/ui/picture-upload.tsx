"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Image from "next/image";

type UploadAvatarProps = React.InputHTMLAttributes<HTMLInputElement> & {
    subText?: string;
    className?: string;
    src?: string;
};

const UploadAvatar = React.forwardRef<HTMLInputElement, UploadAvatarProps>(
    ({ className, accept = "image/*", src = "", ...props }, ref) => {
        return (
            <div
                className={cn(
                    "relative border-[6.45px] border-[#E0E0E0] rounded-full size-[134px] flex items-center justify-center overflow-hidden mx-auto group",
                    className
                )}
            >
                {src ? (
                    <Avatar className="size-full">
                        <AvatarImage
                            src={src}
                            alt="uploaded-photo"
                            className="object-cover"
                        />
                        <AvatarFallback className="">DP</AvatarFallback>
                    </Avatar>
                ) : (
                    <Avatar className="size-full">
                        <AvatarFallback className="bg-white">DP</AvatarFallback>
                    </Avatar>
                )}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <Image
                        src="/assets/icons/user-edit.svg"
                        alt="upload-icon"
                        height={24}
                        width={24}
                        className="text-white w-6 h-6"
                    />
                </div>

                <input
                    ref={ref}
                    type="file"
                    accept={accept}
                    className="absolute rounded-full inset-0 w-full h-full opacity-0 cursor-pointer appearance-none z-20"
                    {...props}
                />
            </div>
        );
    }
);

UploadAvatar.displayName = "UploadAvatar";

export { UploadAvatar };
