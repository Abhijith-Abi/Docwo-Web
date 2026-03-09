"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function UpcomingSessionsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={`session-skeleton-${i}`}
                    className="bg-card border border-border/60 rounded-[12px] p-4 shadow-sm flex flex-col gap-3 animate-pulse"
                >
                    <div className="flex items-start justify-between">
                        <div className="space-y-1.5">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-7 w-7 rounded-md" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Skeleton className="h-3.5 w-3.5 rounded-full" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Skeleton className="h-3.5 w-3.5 rounded-full" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-8" />
                        </div>
                        <Skeleton className="h-1.5 w-full rounded-full" />
                    </div>
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                            <Skeleton className="h-2 w-2 rounded-full" />
                            <Skeleton className="h-3 w-14" />
                        </div>
                        <Skeleton className="h-7 w-16 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ConsultationHistorySkeleton() {
    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden shadow-sm animate-pulse">
            <div className="bg-blue-50/50 h-[52px] flex items-center px-6 gap-4">
                {[120, 150, 120, 100, 100].map((w, i) => (
                    <Skeleton key={i} className={`h-4 w-[${w}px]`} />
                ))}
            </div>
            <div className="flex flex-col">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={`ch-skeleton-${i}`}
                        className="flex items-center px-6 py-4 border-b border-border/40 last:border-b-0 gap-4 even:bg-muted/20"
                    >
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-24 rounded-full" />
                        <Skeleton className="h-8 w-24 rounded-md ml-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
}
