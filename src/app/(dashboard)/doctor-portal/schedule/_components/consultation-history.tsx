"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Clock,
    ExternalLink,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { SharedPagination } from "@/components/customize-components/shared-pagination";

// ─── Status config ────────────────────────────────────────────────────────────
const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
        case "completed":
            return {
                label: "Completed",
                dotClass: "bg-[#059669]",
                className:
                    "bg-[#a7f3d0] text-[#059669] hover:bg-[#a7f3d0]/80 pr-3 pl-2 py-1",
                icon: (
                    <CheckCircle
                        className="h-[13px] w-[13px] text-white"
                        strokeWidth={3}
                    />
                ),
            };
        case "no_show":
        case "incompleted":
        case "incomplete":
            return {
                label: "Incompleted",
                dotClass: "bg-red-500",
                className:
                    "bg-red-100 text-red-600 hover:bg-red-100/80 pr-3 pl-2 py-1",
                icon: (
                    <XCircle
                        className="h-[13px] w-[13px] text-white"
                        strokeWidth={3}
                    />
                ),
            };
        case "cancelled":
        case "cancelled_by_patient":
            return {
                label: "Cancelled",
                dotClass: "bg-red-500",
                className: "bg-[#fecaca] text-[#dc2626] hover:bg-[#fecaca]/80",
                icon: null,
            };
        case "pending":
            return {
                label: "Pending",
                dotClass: "bg-amber-400",
                className: "bg-amber-100 text-amber-700 hover:bg-amber-100/80",
                icon: null,
            };
        case "confirmed":
            return {
                label: "Confirmed",
                dotClass: "bg-blue-500",
                className: "bg-blue-100 text-blue-700 hover:bg-blue-100/80",
                icon: null,
            };
        case "ongoing":
            return {
                label: "Ongoing",
                dotClass: "bg-blue-500",
                className: "bg-[#bfdbfe] text-[#2563eb] hover:bg-[#bfdbfe]/80",
                icon: null,
            };
        default:
            return {
                label: status || "Unknown",
                dotClass: "bg-gray-400",
                className:
                    "bg-gray-100 text-gray-700 hover:bg-gray-100/80 capitalize",
                icon: null,
            };
    }
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface ConsultationHistoryTableProps {
    appointments: any;
    pagination?: any;
    currentPage: number;
    onPageChange: (page: number) => void;
    onViewDetails?: (appointment: any) => void;
    totalCount: number;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ConsultationHistoryTable({
    appointments,
    pagination,
    currentPage,
    onPageChange,
    onViewDetails,
    totalCount,
}: ConsultationHistoryTableProps) {
    return (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pl-1">
                <span className="text-[15px] font-semibold text-foreground">
                    Consultation History ({totalCount})
                </span>
            </div>

            <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <Table className="min-w-[800px] xl:min-w-full">
                        <TableHeader className="bg-blue-50/50 hover:bg-blue-50/50">
                            <TableRow className="border-b-border/60">
                                <TableHead className="font-bold text-foreground h-[60px] text-[14.5px] pl-8 w-[20%]">
                                    Date
                                </TableHead>
                                <TableHead className="font-bold text-foreground h-[60px] text-[14.5px] w-[25%]">
                                    Schedule Time
                                </TableHead>
                                <TableHead className="font-bold text-foreground h-[60px] text-[14.5px] text-center w-[20%]">
                                    Patients seen
                                </TableHead>
                                <TableHead className="font-bold text-foreground h-[60px] text-[14.5px] w-[20%]">
                                    Status
                                </TableHead>
                                <TableHead className="font-bold text-foreground h-[60px] text-[14.5px] pr-8 w-[15%]">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!appointments || appointments.length === 0 ? (
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableCell
                                        colSpan={5}
                                        className="h-[300px] text-center align-middle"
                                    >
                                        <div className="flex flex-col items-center justify-center h-full gap-3">
                                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                                <Calendar
                                                    className="h-6 w-6 text-muted-foreground"
                                                    strokeWidth={1.5}
                                                />
                                            </div>
                                            <div>
                                                <span className="text-[15px] font-semibold text-foreground block mb-1">
                                                    No consultation history
                                                </span>
                                                <span className="text-[13px] text-muted-foreground">
                                                    Past consultations will
                                                    appear here.
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                appointments?.[0]?.appointments?.map(
                                    (apt: any, index: number) => {
                                        const slot = apt?.slot;
                                        const startSlot =
                                            slot?.slot_timestamp ||
                                            apt?.doctor_slots?.slot_timestamp ||
                                            apt?.slot_timestamp;
                                        const endSlot =
                                            slot?.slot_end_timestamp ||
                                            apt?.doctor_slots
                                                ?.slot_end_timestamp ||
                                            apt?.slot_end_timestamp;

                                        let dateStr =
                                            apt?.booking_timestamp ||
                                            apt?.appointment_date ||
                                            apt?.date;
                                        let date = "—";
                                        if (dateStr) {
                                            date = format(
                                                new Date(dateStr),
                                                "MMM d, yyyy",
                                            );
                                        } else if (startSlot) {
                                            date = format(
                                                new Date(startSlot),
                                                "MMM d, yyyy",
                                            );
                                        }

                                        let time =
                                            apt?.formatted_time ||
                                            apt?.schedule_time ||
                                            slot?.formatted_time ||
                                            "";
                                        if (!time && startSlot && endSlot) {
                                            time = `${format(new Date(startSlot), "hh:mm a")} - ${format(new Date(endSlot), "hh:mm a")}`;
                                        } else if (!time && startSlot) {
                                            time = format(
                                                new Date(startSlot),
                                                "hh:mm a",
                                            );
                                        }
                                        if (!time) time = "—";

                                        const patientsSeen =
                                            apt?.patient_name ??
                                            apt?.patients_seen ??
                                            apt?.total_patients ??
                                            "—";

                                        const status = apt?.status || "pending";
                                        const cfg = getStatusConfig(status);

                                        return (
                                            <TableRow
                                                key={`ch-${apt?.appointment_id || index}-${index}`}
                                                className="border-b-border/50 bg-background hover:bg-muted/40 even:bg-muted/20 transition-colors h-[88px]"
                                            >
                                                <TableCell className="py-5 pl-8 align-top">
                                                    <div className="flex flex-col gap-1 pt-0.5">
                                                        <span className="text-[14.5px] font-semibold text-foreground/90">
                                                            {date}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="py-5 align-top">
                                                    <div className="flex items-center gap-2 text-[14.5px] font-semibold text-foreground/90 bg-muted/50 w-fit px-3 py-1.5 rounded-md border border-border/50">
                                                        <Clock className="h-[14px] w-[14px] text-blue-500 shrink-0" />
                                                        {time}
                                                    </div>
                                                </TableCell>

                                                <TableCell className="py-5 text-[15px] font-semibold text-foreground/90 align-top text-center">
                                                    <div className="pt-1.5">
                                                        {patientsSeen}
                                                    </div>
                                                </TableCell>

                                                <TableCell className="py-5 align-top">
                                                    <div className="flex items-center pt-1.5">
                                                        {!cfg.icon && (
                                                            <span
                                                                className={cn(
                                                                    "h-2 w-2 rounded-full shrink-0 mr-2",
                                                                    cfg.dotClass,
                                                                )}
                                                            />
                                                        )}
                                                        <Badge
                                                            variant="secondary"
                                                            className={cn(
                                                                "font-bold text-[11.5px] rounded-full shadow-sm border-none gap-2 flex items-center w-fit",
                                                                !cfg.icon &&
                                                                    "px-3 py-1",
                                                                cfg.className,
                                                            )}
                                                        >
                                                            {cfg.icon && (
                                                                <div>
                                                                    {cfg.icon}
                                                                </div>
                                                            )}
                                                            {cfg.label}
                                                        </Badge>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="py-5 pr-8 align-top">
                                                    <div className="pt-0.5">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 text-[12.5px] font-semibold px-3 shadow-sm border-border/60 gap-1.5"
                                                            onClick={() =>
                                                                onViewDetails?.(
                                                                    apt,
                                                                )
                                                            }
                                                        >
                                                            <ExternalLink className="h-3.5 w-3.5" />
                                                            View Details
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    },
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {pagination && pagination.totalPages > 1 && (
                <div className="pt-2">
                    <SharedPagination
                        currentPage={currentPage}
                        totalPages={pagination.totalPages}
                        hasNextPage={pagination.hasNextPage}
                        hasPrevPage={pagination.hasPrevPage}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
}
