"use client";

import { CalendarX2 } from "lucide-react";
import { UpcomingSessionCard } from "./upcoming-session-card";
import { UpcomingSessionsSkeleton } from "./schedule-skeletons";
import { DataErrorState } from "@/components/ui/data-state-view";

interface UpcomingSessionsSectionProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sessions: any[];
    isLoading: boolean;
    isError: boolean;
    onViewSlots?: (session: any) => void;
    onEdit?: (session: any) => void;
}

export function UpcomingSessionsSection({
    sessions,
    isLoading,
    isError,
}: UpcomingSessionsSectionProps) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-[17px] font-bold text-foreground tracking-tight">
                Upcoming Session
            </h2>

            {isError ? (
                <DataErrorState
                    title="Failed to load upcoming sessions"
                    className="max-w-md"
                />
            ) : isLoading ? (
                <UpcomingSessionsSkeleton />
            ) : sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-14 text-muted-foreground">
                    <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                        <CalendarX2
                            className="h-7 w-7 text-muted-foreground/50"
                            strokeWidth={1.5}
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-[15px] font-semibold text-foreground">
                            No upcoming sessions
                        </p>
                        <p className="text-[13px] text-muted-foreground mt-1">
                            You have no sessions scheduled for the upcoming
                            period.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sessions.map((session, index) => (
                        <UpcomingSessionCard
                            key={session?.schedule_id || session?.id || index}
                            session={session}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
