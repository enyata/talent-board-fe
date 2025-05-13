"use client";

import { Button } from "@/components/ui/button";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadItemProgress,
    FileUploadList,
} from "@/components/ui/file-upload";
import { Controller, useFormContext } from 'react-hook-form';
import { FileUp, X } from "lucide-react";
import * as React from "react";;

export function FileUploadFrame() {
    const { setError, control } = useFormContext();

    const createOnUpload = (onChange: (value: File[]) => void) =>
        async (
            files: File[],
            {
                onProgress,
                onSuccess,
                onError,
            }: {
                onProgress: (file: File, progress: number) => void;
                onSuccess: (file: File) => void;
                onError: (file: File, error: Error) => void;
            },
        ) => {
            try {
                const latestFile = files[files.length - 1]; // get last uploaded file

                const totalChunks = 10;
                let uploadedChunks = 0;

                for (let i = 0; i < totalChunks; i++) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, Math.random() * 200 + 100),
                    );

                    uploadedChunks++;
                    const progress = (uploadedChunks / totalChunks) * 100;
                    onProgress(latestFile, progress);
                }

                await new Promise((resolve) => setTimeout(resolve, 500));

                // Replace any existing file with only the new one
                onChange([latestFile]);

                onSuccess(latestFile);
            } catch (error) {
                onError(
                    files[0],
                    error instanceof Error ? error : new Error("Upload failed"),
                );
            }
        };


    return (
        <div>
            <Controller
                name="data.resume"
                control={control}
                render={({ field }) => (
                    <FileUpload
                        onUpload={createOnUpload(field.onChange)}
                        value={field.value}
                        onValueChange={field.onChange}
                        accept="application/pdf"
                        maxFiles={2}
                        maxSize={5 * 1024 * 1024}
                        onFileReject={(_, message) => {
                            setError("data.resume", {
                                message,
                            });
                        }}
                    >
                        <FileUploadDropzone className={`border-[1px] ${field.value?.length ? "border-primary " : ""}`}>
                            <div
                                className={`flex flex-col items-center justify-center gap-2 w-full h-[160px] rounded-md text-[#2D2D2D]
                                        ${field.value?.length
                                        ? "bg-gradient-to-b from-primary/20 to-transparent border-primary"
                                        : "bg-gradient-to-b from-[#A1A2A22E] to-transparent border-muted"}`}
                            >
                                {field.value?.length > 0 ? (
                                    <p className="text-sm font-medium truncate max-w-[80%]">
                                        {field.value[0]?.name}{" "}
                                        <span className="text-xs text-muted-foreground">
                                            (
                                            {field.value[0].size < 1024 * 1024
                                                ? `${(field.value[0].size / 1024).toFixed(1)} KB`
                                                : `${(field.value[0].size / (1024 * 1024)).toFixed(2)} MB`}
                                            )
                                        </span>
                                    </p>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-center">
                                            <FileUp className="size-6 text-[#2D2D2D]" />
                                        </div>
                                        <p className="font-medium text-sm">Click to upload or drag & drop here</p>
                                        <p className="text-[#71717A] text-xs">Max 2mb file size (.pdf)</p>
                                    </>
                                )}
                            </div>
                        </FileUploadDropzone>

                        <FileUploadList className="hidden">
                            {field?.value?.map((file: File, index: number) => (
                                <FileUploadItem key={index} value={file}>
                                    <FileUploadItemPreview>
                                        <FileUploadItemProgress variant="fill" />
                                    </FileUploadItemPreview>
                                    <FileUploadItemMetadata />
                                    <FileUploadItemDelete asChild>
                                        <Button variant="ghost" size="icon" className="size-7">
                                            <X />
                                        </Button>
                                    </FileUploadItemDelete>
                                </FileUploadItem>
                            ))}
                        </FileUploadList>
                    </FileUpload>
                )}
            />


        </div>
    );
}