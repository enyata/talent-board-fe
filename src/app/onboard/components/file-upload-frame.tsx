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
    const onUpload = React.useCallback(
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
                // Process each file individually
                const uploadPromises = files.map(async (file) => {
                    try {
                        // Simulate file upload with progress
                        const totalChunks = 10;
                        let uploadedChunks = 0;

                        // Simulate chunk upload with delays
                        for (let i = 0; i < totalChunks; i++) {
                            // Simulate network delay (100-300ms per chunk)
                            await new Promise((resolve) =>
                                setTimeout(resolve, Math.random() * 200 + 100),
                            );

                            // Update progress for this specific file
                            uploadedChunks++;
                            const progress = (uploadedChunks / totalChunks) * 100;
                            onProgress(file, progress);
                        }

                        // Simulate server processing delay
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        onSuccess(file);
                    } catch (error) {
                        onError(
                            file,
                            error instanceof Error ? error : new Error("Upload failed"),
                        );
                    }
                });

                // Wait for all uploads to complete
                await Promise.all(uploadPromises);
            } catch (error) {
                // This handles any error that might occur outside the individual upload processes
                console.error("Unexpected error during upload:", error);
            }
        },
        [],
    );

    return (
        <div>
            <Controller
                name="data.resume"
                control={control}
                render={({ field }) => (
                    <FileUpload
                        onUpload={onUpload}
                        value={field.value}
                        onValueChange={field.onChange}
                        // accept="image/*"
                        maxFiles={1}
                        maxSize={5 * 1024 * 1024}
                        onFileReject={(_, message) => {
                            setError("data.resume", {
                                message,
                            });
                        }}
                    >
                        <FileUploadDropzone>
                            <div className="flex flex-col items-center justify-center gap-2 w-full bg-gradient-to-b from-[#A1A2A22E] to-transparent h-[160px]">
                                <div className="flex items-center justify-center">
                                    <FileUp className="size-6 text-[#2D2D2D]" />
                                </div>
                                <p className="font-medium text-sm text-[#2D2D2D]">Click to upload or drag & drop here</p>
                                <p className="text-[#71717A] text-xs">
                                    Max 2mb file size (.pdf)
                                </p>
                            </div>
                        </FileUploadDropzone>
                        <FileUploadList>
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