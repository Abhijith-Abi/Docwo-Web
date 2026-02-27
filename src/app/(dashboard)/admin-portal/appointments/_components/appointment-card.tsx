import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, differenceInYears } from "date-fns";

const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
        case "pending":
            return {
                label: "Pending",
                className: "bg-amber-100 text-amber-700 hover:bg-amber-100/80",
            };
        case "no_show":
            return {
                label: "No Show",
                className: "bg-slate-100 text-slate-700 hover:bg-slate-100/80",
            };
        case "cancelled_by_patient":
            return {
                label: "Cancelled by Patient",
                className: "bg-red-100 text-red-700 hover:bg-red-100/80",
            };
        case "confirmed":
            return {
                label: "Confirmed",
                className: "bg-blue-100 text-blue-700 hover:bg-blue-100/80",
            };
        case "completed":
            return {
                label: "Completed",
                className: "bg-[#a7f3d0] text-[#059669] hover:bg-[#a7f3d0]/80",
            };
        case "cancelled":
            return {
                label: "Cancelled",
                className: "bg-[#fecaca] text-[#dc2626] hover:bg-[#fecaca]/80",
            };
        case "ongoing":
            return {
                label: "Ongoing",
                className: "bg-[#bfdbfe] text-[#2563eb] hover:bg-[#bfdbfe]/80",
            };
        case "scheduled":
            return {
                label: "Scheduled",
                className: "bg-blue-100 text-blue-700 hover:bg-blue-100/80",
            };
        default:
            return {
                label: status || "Unknown",
                className:
                    "bg-gray-100 text-gray-700 hover:bg-gray-100/80 capitalize",
            };
    }
};

export function AppointmentCard({ appointment }: { appointment: any }) {
    const startSlot =
        appointment?.doctor_slots?.slot_timestamp ||
        appointment?.slot_timestamp;
    const endSlot =
        appointment?.doctor_slots?.slot_end_timestamp ||
        appointment?.slot_end_timestamp;

    let time = "N/A";
    if (startSlot && endSlot) {
        time = `${format(new Date(startSlot), "hh:mm a")} - ${format(new Date(endSlot), "hh:mm a")}`;
    } else if (startSlot) {
        time = format(new Date(startSlot), "hh:mm a");
    }
    const patientName =
        appointment?.patient_name ||
        `${appointment?.first_name || ""} ${appointment?.last_name || ""}`.trim() ||
        "N/A";
    const patientId = appointment?.patients?.user_id
        ? `PT-${appointment.patients.user_id.toString().padStart(4, "0")}`
        : "N/A";
    const dob =
        appointment?.patients?.date_of_birth || appointment?.date_of_birth;
    const age = dob ? differenceInYears(new Date(), new Date(dob)) : "N/A";
    const gender = appointment?.patients?.gender || "N/A";
    const doctorName = appointment?.doctor_name || "N/A";
    const specialtyName = appointment?.specialty_name || "";
    const doctorDisplay = specialtyName
        ? `${doctorName} - ${specialtyName}`
        : doctorName;
    const contactEmail =
        appointment?.email || appointment?.patients?.email || "N/A";
    const contactNumber = appointment?.patients?.phone_number || "N/A";
    const tokenNumber =
        appointment?.token_number?.toString().padStart(2, "0") || "N/A";
    const status = appointment?.status || "pending";
    const statusConfig = getStatusConfig(status);

    return (
        <Card className="rounded-[10px] shadow-sm border border-border/80">
            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-[14px] font-medium text-foreground">
                            <Clock className="h-[14px] w-[14px] text-muted-foreground" />
                            {time}
                        </div>
                        <div>
                            <Badge
                                variant="outline"
                                className="font-bold text-[12px] rounded-[4px] px-2 py-0.5 border-none shadow-sm gap-1 bg-background"
                            >
                                TKN{" "}
                                <span className="text-emerald-500 ml-1">
                                    {tokenNumber}
                                </span>
                            </Badge>
                        </div>
                    </div>
                    <Badge
                        variant="secondary"
                        className={cn(
                            "font-semibold text-[11px] px-2.5 py-0.5 rounded-[4px]",
                            statusConfig.className,
                        )}
                    >
                        {statusConfig.label}
                    </Badge>
                </div>

                <div className="mb-4">
                    <h3 className="text-[14px] font-medium text-foreground truncate">
                        {patientName}
                    </h3>
                    <p className="text-[14px] font-medium text-foreground mt-0.5 truncate">
                        {patientId}
                    </p>
                </div>

                <div className="space-y-3 mt-1 px-0.5">
                    <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium text-[14px] shrink-0">
                            Age/Gender
                        </span>
                        <span className="font-medium text-foreground text-[14px] capitalize truncate pl-2">
                            {age === "N/A" && gender === "N/A"
                                ? "N/A"
                                : `${age}/${gender}`}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium text-[14px] shrink-0">
                            Doctor
                        </span>
                        <span className="font-medium text-foreground text-[14px] truncate pl-2">
                            {doctorDisplay}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 mt-5">
                    <Button
                        variant="outline"
                        className="h-[36px] flex-1 min-w-0 gap-1.5 sm:gap-2 text-[13px] font-medium rounded-md border-border/80 shadow-none px-1.5 sm:px-2 text-foreground hover:bg-muted/40"
                    >
                        <Mail className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                        <span className="truncate">{contactEmail}</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-[36px] shrink-0 gap-1.5 sm:gap-2 text-[13px] font-medium rounded-md border-border/80 shadow-none px-2 sm:px-2.5 text-foreground hover:bg-muted/40"
                    >
                        <Phone className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                        <span>{contactNumber}</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
