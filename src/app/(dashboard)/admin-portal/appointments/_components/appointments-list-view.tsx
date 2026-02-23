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
import { Appointment } from "./data";
import { cn } from "@/lib/utils";

export function AppointmentsListView({
    appointments,
}: {
    appointments: Appointment[];
}) {
    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden animate-in fade-in duration-300 shadow-sm mt-3">
            <Table>
                <TableHeader className="bg-muted/30 hover:bg-muted/30">
                    <TableRow className="border-b-border/60">
                        <TableHead className="font-bold text-foreground h-[52px] text-sm pl-6">
                            Time Schedule
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Patient name
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Age/ Gender
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Contact
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Doctor
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm pr-6">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map((appointment, index) => (
                        <TableRow
                            key={`list-${appointment.id}-${index}`}
                            className="border-b-border/50 hover:bg-muted/10 h-[88px]"
                        >
                            <TableCell className="py-4 pl-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-1.5 text-[13px] font-semibold text-foreground/80">
                                        <Clock className="h-[14px] w-[14px] text-muted-foreground" />
                                        {appointment.time}
                                    </div>
                                    <div>
                                        <Badge
                                            variant="outline"
                                            className="font-bold text-[11px] rounded-[4px] px-2 py-0.5 border-none shadow-sm gap-1 bg-background"
                                        >
                                            TKN{" "}
                                            <span className="text-emerald-500">
                                                01
                                            </span>
                                        </Badge>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="py-4">
                                <div>
                                    <div className="font-bold text-[13px] text-foreground/90">
                                        {appointment.patientName}
                                    </div>
                                    <div className="text-[12px] text-muted-foreground mt-0.5">
                                        {appointment.patientId}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="py-4 text-[13px] text-muted-foreground/80">
                                {appointment.age}/{appointment.gender}
                            </TableCell>
                            <TableCell className="py-4">
                                <div className="text-[12px] text-muted-foreground/80">
                                    {appointment.contactNumber}
                                </div>
                                <div className="text-[12px] text-muted-foreground/60 mt-0.5">
                                    {appointment.contactEmail}
                                </div>
                            </TableCell>
                            <TableCell className="py-4">
                                <div className="text-[13px] text-foreground/80">
                                    {appointment.doctorName} -{" "}
                                    {appointment.doctorSpecialty}
                                </div>
                            </TableCell>
                            <TableCell className="py-4 pr-6">
                                <Badge
                                    variant="secondary"
                                    className={cn(
                                        "capitalize font-semibold text-[11px] px-2.5 py-0.5 rounded-[4px]",
                                        appointment.status === "completed" &&
                                            "bg-[#a7f3d0] text-[#059669] hover:bg-[#a7f3d0]/80",
                                        appointment.status === "cancelled" &&
                                            "bg-[#fecaca] text-[#dc2626] hover:bg-[#fecaca]/80",
                                        appointment.status === "ongoing" &&
                                            "bg-[#bfdbfe] text-[#2563eb] hover:bg-[#bfdbfe]/80",
                                    )}
                                >
                                    {appointment.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
