import { Skeleton } from "@/components/ui/skeleton"

export default function TalentCardSkeleton() {
    return (
        <div className="border border-[#E4E7EC] rounded-xl">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row justify-between border-b border-[#E4E7EC] p-4 md:items-center">
                <div className="flex gap-6 items-center">
                    <div className="rounded-lg overflow-hidden relative max-w-[109px] w-full h-[140px]">
                        <Skeleton className="w-full h-full" />
                        <span className="absolute bottom-1 w-[101px] flex items-center justify-center h-5 left-1/2 -translate-x-1/2 rounded-full bg-[#FFFFFFCC]">
                            <Skeleton className="w-[80px] h-[10px]" />
                        </span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div>
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-3 w-[180px] mt-1" />
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                            <Skeleton className="h-3 w-3 rounded-full" />
                            <Skeleton className="h-3 w-[100px]" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-2 md:mt-0">
                    <Skeleton className="h-[28px] w-[96px] rounded-[3px]" />
                    <Skeleton className="h-[28px] w-[60px] rounded-[3px]" />
                </div>
            </div>

            {/* Body Skeleton */}
            <div className="flex flex-col md:flex-row">
                <div className="max-w-[521px] w-full p-4 md:border-r border-[#E4E7EC] flex flex-col gap-8">
                    {/* Bio */}
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-[40px]" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-4/5" />
                    </div>

                    {/* Skills */}
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-[50px]" />
                        <div className="flex gap-2 flex-wrap">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-[24px] w-[60px] rounded-[3px]" />
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-[70px]" />
                        <Skeleton className="h-3 w-[50px]" />
                    </div>

                    {/* Resume */}
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-[60px]" />
                        <div className="flex gap-4 items-center justify-between max-w-[361px] w-full">
                            <Skeleton className="w-[48px] h-[60px]" />
                            <div className="flex-1 flex justify-between items-center ml-2">
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-3 w-[120px]" />
                                    <Skeleton className="h-3 w-[60px]" />
                                </div>
                                <Skeleton className="h-[28px] w-[94px] rounded-[3px]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="max-w-[430px] w-full p-4">
                    <div className="p-4 flex flex-col gap-3 rounded-xl border border-[#E4E7EC]">
                        <Skeleton className="h-4 w-[120px]" />
                        <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-[28px] w-[117px] rounded-[3px]" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
