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
                dotClass: "bg-green-500",
                badgeClass: "bg-[#a7f3d0] text-[#059669]",
            };
        case "active":
            return {
                label: "Active",
                dotClass: "bg-green-500",
                badgeClass: "bg-blue-100 text-blue-700",
            };
        case "completed":
            return {
                label: "Completed",
                dotClass: "bg-gray-400",
                badgeClass: "bg-gray-100 text-gray-600",
            };
        case "cancelled":
            return {
                label: "Cancelled",
                dotClass: "bg-red-500",
                badgeClass: "bg-red-100 text-red-700",
            };
        case "scheduled":
            return {
                label: "Scheduled",
                dotClass: "bg-blue-500",
                badgeClass: "bg-blue-100 text-blue-700",
            };
        default:
            return {
                label: status || "Active",
                dotClass: "bg-green-500",
                badgeClass: "bg-blue-100 text-blue-700",
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
        <div className="bg-card border border-border/60 rounded-[4px] p-5 shadow-sm flex flex-col gap-4 animate-in fade-in duration-300">
            {/* Header: Day + Edit */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-[18px] font-medium text-foreground tracking-tight leading-tight flex items-center gap-2">
                        {formattedDay}
                    </h3>
                    <p className="text-[14px] text-muted-foreground mt-1">
                        {formattedDate}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground -mt-1 -mr-1"
                    onClick={() => {
                        router.push(
                            `/doctor-portal/schedule/slots/${formattedDay}`,
                        );
                    }}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </div>

            {/* Time & Patients */}
            <div className="flex flex-col gap-2.5 mt-1">
                <div className="flex items-center gap-3 text-[14px] text-foreground/90">
                    <Clock
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.5}
                    />
                    <span>
                        {startTime} - {endTime}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-foreground/90">
                    <Users
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.5}
                    />
                    <span>
                        {bookedPatients}/{totalPatients}{" "}
                        {isTokens ? "tokens" : "patients"}
                    </span>
                </div>
            </div>

            {/* Progress */}
            <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex items-center justify-between">
                    <span className="text-[12px] text-muted-foreground font-medium">
                        Bookings
                    </span>
                    <span
                        className={cn(
                            "text-[12px] font-semibold",
                            bookingPercentage >= 80
                                ? "text-emerald-500"
                                : "text-blue-500",
                        )}
                    >
                        {bookingPercentage}%
                    </span>
                </div>
                <Progress
                    value={bookingPercentage}
                    className={cn(
                        "h-2 rounded-full bg-muted/50",
                        bookingPercentage >= 80
                            ? "[&>div]:bg-emerald-500"
                            : "[&>div]:bg-blue-500",
                    )}
                />
            </div>

            {/* Footer: Status + Slots */}
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-transparent">
                <div className="flex items-center gap-2">
                    <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                        <span
                            className={cn(
                                "absolute inline-flex h-full w-full rounded-full opacity-20",
                                bookingPercentage >= 80
                                    ? "bg-emerald-500"
                                    : "bg-blue-500",
                            )}
                        />
                        <span
                            className={cn(
                                "relative inline-flex rounded-full h-2 w-2",
                                bookingPercentage >= 80
                                    ? "bg-emerald-500"
                                    : "bg-blue-500",
                            )}
                        />
                    </div>
                    <span className="text-[14px] font-medium text-foreground">
                        {statusConfig.label}
                    </span>
                </div>
                <Button
                    variant="outline"
                    className="h-9 px-6 text-[14px] font-medium border-orange-400 text-foreground hover:bg-orange-50 hover:text-orange-600 transition-colors rounded-[4px]"
                    onClick={() => onViewSlots?.(session)}
                >
                    Slots
                </Button>
            </div>
        </div>
    );
}
