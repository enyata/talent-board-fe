import SkeletonTalentCard from "@/components/skeleton-talent-card";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecruiterDashboardSkeleton() {
    return (
        <div className="w-full">
            {/* Greeting Card */}
            <Card className="shadow-none outline-px md:mt-[36px] mt-[16px]">
                <div className="px-[16px] py-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Skeleton className="rounded-full size-[64px]" />
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-[20px] w-[120px]" />
                                <Skeleton className="h-[14px] w-[200px]" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-[160px] rounded-md" />
                    </div>
                </div>
            </Card>

            {/* Recommended for You */}
            <Card className="shadow-none outline-px md:mt-[36px] mt-[24px] px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-[20px] w-[160px]" />
                    <Skeleton className="h-[36px] w-[120px] rounded-md" />
                </div>
                <div className="flex flex-col md:flex-row gap-4 overflow-x-auto w-full">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <SkeletonTalentCard key={i} width="max-w-[423px]" />
                    ))}
                </div>
            </Card>

            {/* Bookmarked Talents */}
            <Card className="shadow-none outline-px md:mt-[36px] mt-[24px] px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-[20px] w-[180px]" />
                    <Skeleton className="h-[36px] w-[120px] rounded-md" />
                </div>
                <div className="flex flex-col md:flex-row gap-4 overflow-x-auto">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <SkeletonTalentCard key={i} width="max-w-[371px]" />
                    ))}
                </div>
            </Card>

            {/* Talent Cards Grid */}
            <div className="w-full mt-[24px] gap-4 grid md:grid-cols-2 grid-cols-1">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonTalentCard key={i} width="max-w-[453px]" />
                ))}
            </div>

            {/* Notifications Card */}
            <Card className="shadow-none outline-px  w-full mt-4 px-[16px] py-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <Skeleton className="h-[18px] w-[160px]" />
                        <Skeleton className="h-[14px] w-[220px] mt-1" />
                    </div>
                    <Skeleton className="size-[40px] rounded-lg" />
                </div>

                {/* Individual Notification */}
                <div className="flex flex-col gap-[12px] mt-[24px]">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <Card
                            key={i}
                            className="relative w-full p-[16px] border-none shadow-none"
                        >
                            <div className="flex gap-4">
                                <Skeleton className="size-[10px] rounded-full mt-2" />
                                <div className="flex flex-col gap-2 w-full">
                                    <Skeleton className="h-[14px] w-[280px]" />
                                    <Skeleton className="size-[32px] rounded-full" />
                                    <Skeleton className="h-[12px] w-[100px] mt-2" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
}
