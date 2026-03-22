"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

import { format, differenceInYears } from "date-fns";

const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
        case "in_consult":
        case "consulting":
            return {
                label: "In Consult",
                className: "bg-primary text-primary-foreground shadow-sm shadow-primary/20 animate-pulse-bg border-none",
            };
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

export default function TotalBookingsListView({
    bookings,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bookings: any[];
}) {
    return (
        <div className="rounded-xl border border-border/80 bg-card overflow-hidden animate-in fade-in duration-300 shadow-sm mt-3">
            <Table className="min-w-[1000px] xl:min-w-full">
                <TableHeader className="bg-muted/40 hover:bg-muted/40">
                    <TableRow className="border-b-border/80">
                        <TableHead className="font-bold text-foreground h-[60px] text-[14.5px] pl-8 w-[20%]">
                            Time Schedule
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[60px] text-[14.5px] w-[20%]">
                            Patient name
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[60px] text-[14.5px] w-[15%] text-center">
                            Age/ Gender
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[60px] text-[14.5px] w-[25%]">
                            Contact
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[60px] text-[14.5px] pr-8 w-[20%] text-right">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                No bookings found
                            </TableCell>
                        </TableRow>
                    ) : (
                        bookings.map((booking, index) => {
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
                                <TableRow
                                    key={booking.appointment_id || booking.id || index}
                                    className="border-b-border/50 bg-background hover:bg-muted/40 even:bg-muted/20 transition-colors h-[100px]"
                                >
                                    <TableCell className="py-5 pl-8 align-top">
                                        <div className="flex flex-col gap-2.5">
                                            <div className="flex items-center gap-2 text-xs font-bold text-foreground bg-muted/50 w-fit px-3 py-1.5 rounded-md border border-border/50 shadow-sm">
                                                <Clock className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                                                {timeStr}
                                            </div>
                                            <div className="">
                                                <Badge
                                                    variant="outline"
                                                    className="font-bold text-[10px] uppercase tracking-widest rounded-md px-2.5 py-1 border-border/50 shadow-sm gap-1 bg-background text-muted-foreground"
                                                >
                                                    TKN{" "}
                                                    <span className="text-primary">
                                                        {token}
                                                    </span>
                                                </Badge>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5 align-top">
                                        <div className="flex flex-col gap-0.5 pt-0.5">
                                            <div className="font-bold text-[14.5px] text-foreground/90">
                                                {patientName}
                                            </div>
                                            <div className="text-[13px] text-muted-foreground font-medium">
                                                {patientCode}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5 align-top text-center">
                                        <div className="pt-2 text-[14px] font-medium text-foreground/80">
                                            {age} / {patientGender}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5 align-top">
                                        <div className="flex flex-col gap-1 pt-1.5">
                                            <div className="text-[14px] font-semibold text-foreground/90">
                                                {patientPhone}
                                            </div>
                                            <div
                                                className="text-[13px] text-muted-foreground font-medium max-w-[150px] truncate"
                                                title={patientEmail}
                                            >
                                                {patientEmail}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5 pr-8 align-top text-right">
                                        <div className="pt-1.5">
                                            <Badge
                                                variant="secondary"
                                                className={cn(
                                                    "font-bold text-[11.5px] px-3 py-1 rounded-md shadow-sm border border-black/5 dark:border-white/5 whitespace-nowrap uppercase tracking-wider",
                                                    statusConfig.className,
                                                )}
                                            >
                                                {statusConfig.label}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
