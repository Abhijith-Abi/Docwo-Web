import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
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

export function AppointmentsListView({
    appointments,
}: {
    appointments: any[];
}) {
    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden animate-in fade-in duration-300 shadow-sm mt-3">
            <Table className="min-w-[1000px] xl:min-w-full">
                <TableHeader className="bg-blue-50/50 hover:bg-blue-50/50">
                    <TableRow className="border-b-border/60">
                        <TableHead className="font-bold text-foreground h-[52px] text-sm pl-6 w-[20%]">
                            Time Schedule
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm w-[18%]">
                            Patient name
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm w-[12%]">
                            Age/ Gender
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm w-[18%]">
                            Contact
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm w-[20%]">
                            Doctor
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm pr-6 w-[12%]">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!appointments || appointments.length === 0 ? (
                        <TableRow className="hover:bg-transparent border-none">
                            <TableCell
                                colSpan={6}
                                className="h-[300px] text-center align-middle"
                            >
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                        <Clock
                                            className="h-6 w-6 text-muted-foreground"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <span className="text-[15px] font-semibold text-foreground mb-1">
                                        No appointments found
                                    </span>
                                    <span className="text-[13px] text-muted-foreground ">
                                        We couldn't find any appointments
                                        matching your current filters.
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        appointments.map((appointment, index) => {
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
                                appointment?.patients?.date_of_birth ||
                                appointment?.date_of_birth;
                            const age = dob
                                ? differenceInYears(new Date(), new Date(dob))
                                : "N/A";
                            const gender =
                                appointment?.patients?.gender || "N/A";
                            const doctorName =
                                appointment?.doctor_name || "N/A";
                            const specialtyName =
                                appointment?.specialty_name || "";
                            const doctorDisplay = specialtyName
                                ? `${doctorName} - ${specialtyName}`
                                : doctorName;
                            const contactEmail =
                                appointment?.email ||
                                appointment?.patients?.email ||
                                "N/A";
                            const contactNumber =
                                appointment?.patients?.phone_number || "N/A";
                            const tokenNumber =
                                appointment?.token_number
                                    ?.toString()
                                    .padStart(2, "0") || "N/A";
                            const status = appointment?.status || "pending";
                            const statusConfig = getStatusConfig(status);

                            return (
                                <TableRow
                                    key={`list-${appointment?.appointment_id || index}-${index}`}
                                    className="border-b-border/50 bg-background hover:bg-background even:bg-muted/30 even:hover:bg-muted/30 h-[88px]"
                                >
                                    <TableCell className="py-4 pl-6 align-top">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-1.5 text-[14px] font-medium text-foreground/90">
                                                <Clock className="h-[14px] w-[14px] text-muted-foreground" />
                                                {time}
                                            </div>
                                            <div>
                                                <Badge
                                                    variant="outline"
                                                    className="font-bold text-[12px] rounded-[4px] px-2 py-0.5 border-none shadow-sm gap-1 bg-background"
                                                >
                                                    TKN{" "}
                                                    <span className="text-emerald-500">
                                                        {tokenNumber}
                                                    </span>
                                                </Badge>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 align-top">
                                        <div>
                                            <div className="font-medium text-[14px] text-foreground/90">
                                                {patientName}
                                            </div>
                                            <div className="text-[13px] text-muted-foreground mt-0.5">
                                                {patientId}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-[14px] font-medium text-foreground/80 capitalize align-top">
                                        {age === "N/A" && gender === "N/A"
                                            ? "N/A"
                                            : `${age}/${gender}`}
                                    </TableCell>
                                    <TableCell className="py-4 align-top">
                                        <div className="text-[14px] font-medium text-foreground/90">
                                            {contactNumber}
                                        </div>
                                        <div
                                            className="text-[13px] text-muted-foreground mt-0.5 max-w-[150px] truncate"
                                            title={contactEmail}
                                        >
                                            {contactEmail}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 align-top">
                                        <div
                                            className="text-[14px] font-medium text-foreground/80 max-w-[200px] xl: truncate"
                                            title={doctorDisplay}
                                        >
                                            {doctorDisplay}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 pr-6 align-top">
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "font-semibold text-[11px] px-2.5 py-0.5 rounded-[4px]",
                                                statusConfig.className,
                                            )}
                                        >
                                            {statusConfig.label}
                                        </Badge>
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
