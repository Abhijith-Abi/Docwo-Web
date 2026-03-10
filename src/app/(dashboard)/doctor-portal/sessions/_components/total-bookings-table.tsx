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

const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
        case "completed":
            return {
                label: "Completed",
                className: "bg-[#a7f3d0] text-[#059669] hover:bg-[#a7f3d0]/80",
            };
        case "upcoming":
            return {
                label: "Upcoming",
                className: "bg-blue-100 text-blue-700 hover:bg-blue-100/80",
            };
        case "skip":
        case "no_show":
            return {
                label: "Skip",
                className: "bg-slate-100 text-slate-700 hover:bg-slate-100/80",
            };
        default:
            return {
                label: status || "Unknown",
                className:
                    "bg-gray-100 text-gray-700 hover:bg-gray-100/80 capitalize",
            };
    }
};

export default function TotalBookingsListView({
    bookings,
}: {
    bookings: any[];
}) {
    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden animate-in fade-in duration-300 shadow-sm mt-3">
            <Table className="min-w-[1000px] xl:min-w-full">
                <TableHeader className="bg-blue-50/50 hover:bg-blue-50/50">
                    <TableRow className="border-b-border/60">
                        <TableHead className="font-bold text-foreground h-[52px] text-[14.5px] pl-8 w-[20%]">
                            Time Schedule
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-[14.5px] w-[20%]">
                            Patient name
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-[14.5px] w-[15%]">
                            Age/ Gender
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-[14.5px] w-[25%]">
                            Contact
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-[14.5px] pr-6 w-[20%] text-right">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map((booking) => {
                        const statusConfig = getStatusConfig(booking.status);
                        return (
                            <TableRow
                                key={booking.id}
                                className="border-b-border/50 bg-background hover:bg-muted/40 even:bg-muted/20 transition-colors h-[100px]"
                            >
                                <TableCell className="py-5 pl-8 align-top">
                                    <div className="flex flex-col gap-2.5">
                                        <div className="flex items-center gap-2 text-[14px] font-semibold text-foreground/90 bg-muted/50 w-fit px-2.5 py-1 rounded-md border border-border/50">
                                            <Clock className="h-[14px] w-[14px] text-blue-500" />
                                            {booking.time}
                                        </div>
                                        <div className="">
                                            <Badge
                                                variant="outline"
                                                className="font-bold text-[11px] uppercase tracking-wider rounded-[6px] px-2 py-0.5 border-border shadow-sm gap-1 bg-background"
                                            >
                                                TKN{" "}
                                                <span className="text-emerald-500">
                                                    {booking.token}
                                                </span>
                                            </Badge>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5 align-top">
                                    <div className="flex flex-col gap-0.5 pt-0.5">
                                        <div className="font-bold text-[14.5px] text-foreground/90">
                                            {booking.name}
                                        </div>
                                        <div className="text-[13px] text-muted-foreground font-medium">
                                            {booking.patientId}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5 align-top">
                                    <div className="pt-2 text-[14px] font-medium text-foreground/80">
                                        {booking.age} / {booking.gender}
                                    </div>
                                </TableCell>
                                <TableCell className="py-5 align-top">
                                    <div className="flex flex-col gap-1 pt-1.5">
                                        <div className="text-[14px] font-semibold text-foreground/90">
                                            {booking.phone}
                                        </div>
                                        <div
                                            className="text-[13px] text-muted-foreground font-medium max-w-[150px] truncate"
                                            title={booking.email}
                                        >
                                            {booking.email}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5 pr-6 align-top text-right">
                                    <div className="pt-1.5">
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "font-bold text-[11.5px] px-3 py-1 rounded-md shadow-sm border border-black/5 dark:border-white/5 whitespace-nowrap",
                                                statusConfig.className,
                                            )}
                                        >
                                            {statusConfig.label}
                                        </Badge>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
