import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonTalentCard({ width = 'w-full', height = 'h-auto' }) {
    return (
        <Card className={`${width} ${height} p-[20px] shadow-none`}>
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Skeleton className="size-[48px] rounded-full" />
                        <div className="space-y-1">
                            <Skeleton className="h-[14px] w-[150px]" />
                            <Skeleton className="h-[13px] w-[120px]" />
                        </div>
                    </div>
                    <Skeleton className="h-[28px] w-[75px] rounded-[2px]" />
                </div>
                <div className="flex items-center gap-2 mt-[24px]">
                    <Skeleton className="h-[14px] w-[14px] rounded-sm" />
                    <Skeleton className="h-[13px] w-[60px]" />
                </div>
                <Skeleton className="mt-[8px] h-[38px] w-full" />
                <div className="mt-[16px] flex gap-2 flex-wrap">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-[24px] w-[80px] rounded-[2px]" />
                    ))}
                </div>
            </div>
            <div className="pt-[8px] flex justify-between text-[12px] mt-4">
                <Skeleton className="h-[16px] w-[50px]" />
                <Skeleton className="h-[16px] w-[70px]" />
            </div>
        </Card>
    );
}
