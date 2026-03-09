"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
    onEdit,
}: UpcomingSessionCardProps) {
    const statusConfig = getStatusConfig(session?.status || "active");

    // Parse date
    const sessionDate =
        session?.date || session?.session_date || session?.start_date;
    const formattedDay = sessionDate
        ? format(new Date(sessionDate), "EEEE")
        : "Monday";
    const formattedDate = sessionDate
        ? format(new Date(sessionDate), "MMM dd, yyyy")
        : "—";

    // Parse time
    const startTime = session?.start_time || session?.from_time || "9:00 AM";
    const endTime = session?.end_time || session?.to_time || "5:00 PM";

    // Parse patients
    const totalPatients =
        session?.total_patients || session?.max_patients || 40;
    const bookedPatients =
        session?.booked_patients || session?.total_bookings || 0;
    const bookingPercentage =
        totalPatients > 0
            ? Math.round((bookedPatients / totalPatients) * 100)
            : 0;

    return (
        <div className="bg-card border border-border/60 rounded-[12px] p-4 shadow-sm flex flex-col gap-3 animate-in fade-in duration-300 hover:shadow-md transition-shadow">
            {/* Header: Day + Edit */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[15px] font-bold text-foreground">
                        {formattedDay}
                    </p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                        {formattedDate}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={() => onEdit?.(session)}
                >
                    <Pencil className="h-3.5 w-3.5" />
                </Button>
            </div>

            {/* Time */}
            <div className="flex items-center gap-1.5 text-[13px] text-foreground/80">
                <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="font-medium">
                    {startTime} – {endTime}
                </span>
            </div>

            {/* Patients */}
            <div className="flex items-center gap-1.5 text-[13px] text-foreground/80">
                <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="font-medium">
                    {bookedPatients}/{totalPatients} patients
                </span>
            </div>

            {/* Progress */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                        Bookings
                    </span>
                    <span
                        className={cn(
                            "text-[11px] font-semibold",
                            bookingPercentage >= 80
                                ? "text-red-500"
                                : bookingPercentage >= 50
                                  ? "text-amber-500"
                                  : "text-blue-500",
                        )}
                    >
                        {bookingPercentage}%
                    </span>
                </div>
                <Progress
                    value={bookingPercentage}
                    className={cn(
                        "h-1.5 rounded-full",
                        bookingPercentage >= 80
                            ? "[&>div]:bg-red-500"
                            : bookingPercentage >= 50
                              ? "[&>div]:bg-amber-500"
                              : "[&>div]:bg-blue-500",
                    )}
                />
            </div>

            {/* Footer: Status + Slots */}
            <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                    <span
                        className={cn(
                            "h-2 w-2 rounded-full",
                            statusConfig.dotClass,
                        )}
                    />
                    <span className="text-[12px] font-semibold text-foreground/80">
                        {statusConfig.label}
                    </span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-[12px] px-3 shadow-sm border-border/70"
                    onClick={() => onViewSlots?.(session)}
                >
                    Slots
                </Button>
            </div>
        </div>
    );
}
