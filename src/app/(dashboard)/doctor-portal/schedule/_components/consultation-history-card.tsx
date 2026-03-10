import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
        case "completed":
            return {
                label: "Completed",
                dotClass: "bg-[#059669]",
                className: "bg-[#a7f3d0] text-[#059669] pr-3 pl-2 py-1",
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
                className: "bg-red-100 text-red-600 pr-3 pl-2 py-1",
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
                className: "bg-[#fecaca] text-[#dc2626]",
                icon: null,
            };
        case "pending":
            return {
                label: "Pending",
                dotClass: "bg-amber-400",
                className: "bg-amber-100 text-amber-700",
                icon: null,
            };
        case "confirmed":
            return {
                label: "Confirmed",
                dotClass: "bg-blue-500",
                className: "bg-blue-100 text-blue-700",
                icon: null,
            };
        case "ongoing":
            return {
                label: "Ongoing",
                dotClass: "bg-blue-500",
                className: "bg-[#bfdbfe] text-[#2563eb]",
                icon: null,
            };
        default:
            return {
                label: status || "Unknown",
                dotClass: "bg-gray-400",
                className: "bg-gray-100 text-gray-700 capitalize",
                icon: null,
            };
    }
};

export function ConsultationHistoryCard({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appointment: apt,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onViewDetails,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appointment: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onViewDetails?: (apt: any) => void;
}) {
    // ── Slot timestamps ─────────────────────
    const slot = apt?.slot;
    const startSlot =
        slot?.slot_timestamp ||
        apt?.doctor_slots?.slot_timestamp ||
        apt?.slot_timestamp;
    const endSlot =
        slot?.slot_end_timestamp ||
        apt?.doctor_slots?.slot_end_timestamp ||
        apt?.slot_end_timestamp;

    // ── Date ────────────────────────────────
    let dateStr = apt?.booking_timestamp || apt?.appointment_date || apt?.date;
    let date = "—";
    if (dateStr) {
        date = format(new Date(dateStr), "MMM d, yyyy");
    } else if (startSlot) {
        date = format(new Date(startSlot), "MMM d, yyyy");
    }

    // ── Time range ──────────────────────────
    let time =
        apt?.formatted_time || apt?.schedule_time || slot?.formatted_time || "";
    if (!time && startSlot && endSlot) {
        time = `${format(new Date(startSlot), "hh:mm a")} - ${format(new Date(endSlot), "hh:mm a")}`;
    } else if (!time && startSlot) {
        time = format(new Date(startSlot), "hh:mm a");
    }
    if (!time) time = "—";

    // ── Patients seen ───────────────────────
    const patientsSeen =
        apt?.patient_name ?? apt?.patients_seen ?? apt?.total_patients ?? "—";
    const totalVisitsCount = apt?.total_appointments ?? "—";

    // ── Status ──────────────────────────────
    const status = apt?.status || "pending";
    const cfg = getStatusConfig(status);

    return (
        <div className="flex flex-col p-5 bg-card border border-border/60 rounded-[12px] shadow-sm hover:shadow-md transition-shadow gap-4">
            {/* Header: Status and Date */}
            <div className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-1.5 pt-0.5">
                    <span className="text-[13px] text-muted-foreground font-medium uppercase tracking-wider">
                        Date
                    </span>
                    <span className="text-[15px] font-bold text-foreground/90">
                        {date}
                    </span>
                </div>
                <Badge
                    variant="secondary"
                    className={cn(
                        "font-bold text-[11.5px] rounded-full shadow-sm border-none gap-2 flex items-center w-fit",
                        !cfg.icon && "px-3 py-1",
                        cfg.className,
                    )}
                >
                    {cfg.icon ? (
                        <div
                            className={cn(
                                "flex items-center justify-center rounded-full shrink-0 h-[18px] w-[18px]",
                                cfg.dotClass,
                            )}
                        >
                            {cfg.icon}
                        </div>
                    ) : (
                        <span
                            className={cn(
                                "h-2 w-2 rounded-full shrink-0 -ml-1",
                                cfg.dotClass,
                            )}
                        />
                    )}
                    {cfg.label}
                </Badge>
            </div>

            {/* Time Box */}
            <div className="flex flex-col gap-2">
                <span className="text-[13px] text-muted-foreground font-medium uppercase tracking-wider">
                    Schedule Time
                </span>
                <div className="flex items-center gap-2 text-[14.5px] font-semibold text-foreground/90 bg-muted/40 w-full px-3 py-2 rounded-md border border-border/50">
                    <Clock className="h-[15px] w-[15px] text-blue-500 shrink-0" />
                    {time}
                </div>
            </div>

            {/* Patients statistics row */}
            <div className="grid grid-cols-2 gap-4 my-2">
                <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-muted-foreground font-medium uppercase tracking-wider">
                        Patients Seen
                    </span>
                    <span className="text-[18px] font-bold text-foreground">
                        {patientsSeen}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-muted-foreground font-medium uppercase tracking-wider">
                        Total Capacity
                    </span>
                    <span className="text-[18px] font-bold text-foreground">
                        {totalVisitsCount}
                    </span>
                </div>
            </div>

            {/* Action button */}
            <div className="mt-1 pt-4 border-t border-border/50">
                <Button
                    variant="outline"
                    className="w-full text-[13px] font-semibold h-10 shadow-sm gap-2"
                    onClick={() => onViewDetails?.(apt)}
                >
                    <ExternalLink className="h-4 w-4" />
                    View Details
                </Button>
            </div>
        </div>
    );
}
