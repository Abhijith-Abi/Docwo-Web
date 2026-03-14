"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface UpcomingSessionCardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: any;
    onViewSlots?: (session: any) => void;
    onEdit?: (session: any) => void;
}

function getStatusConfig(status: string) {
    switch (status?.toLowerCase()) {
        case "ongoing":
            return {
                label: "Ongoing",
                dotClass: "bg-emerald-500",
                badgeClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
            };
        case "active":
            return {
                label: "Active",
                dotClass: "bg-blue-500",
                badgeClass: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
            };
        case "completed":
            return {
                label: "Completed",
                dotClass: "bg-muted-foreground/40",
                badgeClass: "bg-muted text-muted-foreground dark:bg-muted/20",
            };
        case "cancelled":
            return {
                label: "Cancelled",
                dotClass: "bg-destructive",
                badgeClass: "bg-destructive/10 text-destructive",
            };
        case "scheduled":
            return {
                label: "Scheduled",
                dotClass: "bg-primary",
                badgeClass: "bg-primary/10 text-primary",
            };
        default:
            return {
                label: status || "Active",
                dotClass: "bg-primary",
                badgeClass: "bg-primary/10 text-primary",
            };
    }
}

export function UpcomingSessionCard({
    session,
    onViewSlots,
}: UpcomingSessionCardProps) {
    const router = useRouter();
    const statusConfig = getStatusConfig(session?.status || "active");

    // Parse date
    const sessionDate =
        session?.date || session?.session_date || session?.start_date;
    const isToday = session?.isToday;
    const formattedDay = isToday
        ? "Today"
        : session?.dayLabel ||
          (sessionDate ? format(new Date(sessionDate), "EEEE") : "—");
    const formattedDate = sessionDate
        ? format(new Date(sessionDate), "MMM dd, yyyy")
        : "—";

    // Parse time
    const formatTime = (time: string) => {
        if (!time) return "";
        if (
            time.toLowerCase().includes("am") ||
            time.toLowerCase().includes("pm")
        )
            return time;
        const parts = time.split(":");
        if (parts.length < 2) return time;
        const date = new Date();
        date.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10));
        return format(date, "hh:mm a");
    };
    const startTime = formatTime(
        session?.start_time || session?.from_time || "09:00",
    );
    const endTime = formatTime(
        session?.end_time || session?.to_time || "17:00",
    );

    // Parse patients/tokens
    const totalPatients =
        session?.total_tokens ??
        session?.total_patients ??
        session?.max_patients ??
        40;
    const bookedPatients =
        session?.booked_tokens ??
        session?.booked_patients ??
        session?.total_bookings ??
        0;
    const bookingPercentage =
        session?.booking_percentage ??
        (totalPatients > 0
            ? Math.round((bookedPatients / totalPatients) * 100)
            : 0);

    const isTokens = session?.total_tokens !== undefined;

    return (
        <div className="bg-card border border-border/80 rounded-lg p-5 shadow-sm flex flex-col gap-4 animate-in fade-in duration-300">
            {/* Header: Day + Edit */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-foreground tracking-tight leading-tight flex items-center gap-2">
                        {formattedDay}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {formattedDate}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground -mt-1 -mr-1 rounded-md"
                    onClick={() => {
                        let url = `/doctor-portal/schedule/slots/${formattedDay}`;
                        if (sessionDate) {
                            const dateStr = format(new Date(sessionDate), "yyyy-MM-dd");
                            url += `?date=${dateStr}`;
                        } else if (isToday) {
                            const dateStr = format(new Date(), "yyyy-MM-dd");
                            url += `?date=${dateStr}`;
                        }
                        router.push(url);
                    }}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </div>

            {/* Time & Patients */}
            <div className="flex flex-col gap-3 mt-1">
                <div className="flex items-center gap-3 text-sm text-foreground/90">
                    <Clock
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        strokeWidth={2}
                    />
                    <span>
                        {startTime} - {endTime}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/90">
                    <Users
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        strokeWidth={2}
                    />
                    <span>
                        {bookedPatients}/{totalPatients}{" "}
                        {isTokens ? "tokens" : "patients"}
                    </span>
                </div>
            </div>

            {/* Progress */}
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        Bookings
                    </span>
                    <span
                        className={cn(
                            "text-xs font-bold",
                            bookingPercentage >= 80
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-primary",
                        )}
                    >
                        {bookingPercentage}%
                    </span>
                </div>
                <Progress
                    value={bookingPercentage}
                    className="h-1.5 rounded-full bg-muted"
                />
            </div>

            {/* Footer: Status + Slots */}
            <div className="flex items-center justify-between pt-4 mt-1 border-t border-border/50">
                <div className="flex items-center gap-2.5">
                    <div className="relative flex h-2 w-2 items-center justify-center">
                        <span
                            className={cn(
                                "absolute inline-flex h-full w-full rounded-full opacity-30 animate-ping",
                                statusConfig.dotClass,
                            )}
                        />
                        <span
                            className={cn(
                                "relative inline-flex rounded-full h-2 w-2",
                                statusConfig.dotClass,
                            )}
                        />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                        {statusConfig.label}
                    </span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-4 text-xs font-bold border-primary/20 text-primary hover:bg-primary/5 hover:text-primary transition-colors rounded-md"
                    onClick={() => {
                        let url = `/doctor-portal/schedule/slots/months`;
                        if (sessionDate) {
                            const dateStr = format(new Date(sessionDate), "yyyy-MM-dd");
                            url += `?date=${dateStr}`;
                        } else if (isToday) {
                            const dateStr = format(new Date(), "yyyy-MM-dd");
                            url += `?date=${dateStr}`;
                        }
                        router.push(url);
                    }}
                >
                    Manage Slots
                </Button>
            </div>
        </div>
    );
}
