"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

import { format, differenceInYears } from "date-fns";

const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
        case "completed":
            return {
                label: "Completed",
                className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 hover:bg-emerald-50/80",
            };
        case "upcoming":
        case "confirmed":
        case "pending":
            return {
                label: status === "confirmed" ? "Confirmed" : status === "pending" ? "Pending" : "Upcoming",
                className: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-50/80",
            };
        case "skip":
        case "no_show":
        case "cancelled":
        case "cancelled_by_patient":
            return {
                label: status === "no_show" ? "No Show" : status.includes("cancelled") ? "Cancelled" : "Skip",
                className: "bg-muted text-muted-foreground hover:bg-muted/80",
            };
        default:
            return {
                label: status || "Unknown",
                className: "bg-muted text-muted-foreground hover:bg-muted/80 capitalize",
            };
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BookingCard({ booking }: { booking: any }) {
    const status = booking.status || "pending";
    const statusConfig = getStatusConfig(status);

    // Patient details from nested object
    const patient = booking.patient || {};
    const patientName = patient.name || "—";
    const patientCode = patient.patient_code || "—";
    const patientGender = patient.gender || "—";
    const patientPhone = patient.phone_number || "—";
    const patientEmail = patient.email || "—";
    
    // Age calculation
    let age = "—";
    if (patient.date_of_birth) {
        try {
            age = differenceInYears(new Date(), new Date(patient.date_of_birth)).toString();
        } catch (e) {
            console.error("Age calculation error", e);
        }
    }

    // Extract time
    let timeStr = booking.slot?.formatted_time;
    if (!timeStr) {
        const startSlot = booking.slot?.slot_timestamp || booking.slot_timestamp;
        const endSlot = booking.slot?.slot_end_timestamp || booking.slot_end_timestamp;
        if (startSlot && endSlot) {
            timeStr = `${format(new Date(startSlot), "hh:mm a")} - ${format(new Date(endSlot), "hh:mm a")}`;
        } else if (startSlot) {
            timeStr = format(new Date(startSlot), "hh:mm a");
        }
    }
    if (!timeStr) timeStr = "—";

    // Token
    const token = booking.token_number ?? "—";

    return (
        <Card className="rounded-xl shadow-sm border border-border/80 hover:border-primary/20 hover:shadow-md transition-all group overflow-hidden bg-card">
            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-5">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                            <Clock className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                            {timeStr}
                        </div>
                        <div>
                            <Badge
                                variant="outline"
                                className="font-bold text-[10px] uppercase tracking-widest rounded-md px-2 py-0.5 border-border/50 shadow-sm gap-1 bg-muted/30 text-muted-foreground"
                            >
                                TKN{" "}
                                <span className="text-primary ml-0.5">
                                    {token}
                                </span>
                            </Badge>
                        </div>
                    </div>
                    <Badge
                        variant="secondary"
                        className={cn(
                            "font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm border border-black/5 dark:border-white/5 whitespace-nowrap",
                            statusConfig.className,
                        )}
                    >
                        {statusConfig.label}
                    </Badge>
                </div>

                <div className="mb-5">
                    <h3 className="text-base font-bold text-foreground truncate tracking-tight">
                        {patientName}
                    </h3>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 truncate">
                        {patientCode}
                    </p>
                </div>

                <div className="space-y-3 mt-1 px-0.5">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">
                            Age / Gender
                        </span>
                        <span className="font-bold text-foreground">
                            {age} / {patientGender}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2.5 mt-6 pt-5 border-t border-border/50">
                    <div className="flex items-center gap-3 text-xs text-foreground/90 font-semibold">
                        <Phone className="h-3.5 w-3.5 text-primary/60" />
                        <span>{patientPhone}</span>
                    </div>
                    <div
                        className="flex items-center gap-3 text-xs text-foreground/90 font-semibold truncate"
                        title={patientEmail}
                    >
                        <Mail className="h-3.5 w-3.5 text-primary/60" />
                        <span className="truncate">{patientEmail}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TotalBookingsGridView({ bookings }: { bookings: any[] }) {
    if (bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-border/80 shadow-sm mt-3 w-full min-h-[300px]">
                <span className="text-muted-foreground">No bookings found</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {bookings.map((booking, index) => (
                <BookingCard key={booking.appointment_id || booking.id || index} booking={booking} />
            ))}
        </div>
    );
}
