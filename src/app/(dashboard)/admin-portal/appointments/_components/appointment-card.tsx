import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "./data";
import { cn } from "@/lib/utils";

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
    return (
        <Card className="rounded-[10px] shadow-sm border border-border/80">
            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
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
                                <span className="text-emerald-500 ml-1">
                                    01
                                </span>
                            </Badge>
                        </div>
                    </div>
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
                </div>

                <div className="mb-4">
                    <h3 className="text-[15px] font-bold tracking-tight text-foreground/90">
                        {appointment.patientName}
                    </h3>
                    <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">
                        {appointment.patientId}
                    </p>
                </div>

                <div className="space-y-3 mt-1 px-0.5">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground/90 font-medium text-[12px]">
                            Age/Gender
                        </span>
                        <span className="font-semibold text-foreground text-[12px]">
                            {appointment.age}/{appointment.gender}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground/90 font-medium text-[12px]">
                            Doctor
                        </span>
                        <span className="font-semibold text-foreground text-[12px]">
                            {appointment.doctorName}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 mt-5">
                    <Button
                        variant="outline"
                        className="h-[36px] flex-1 min-w-0 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold rounded-md border-border/80 shadow-none px-1.5 sm:px-2 text-foreground/80 hover:text-foreground hover:bg-muted/40"
                    >
                        <Mail className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                        <span className="truncate">
                            {appointment.contactEmail}
                        </span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-[36px] shrink-0 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold rounded-md border-border/80 shadow-none px-2 sm:px-2.5 text-foreground/80 hover:text-foreground hover:bg-muted/40"
                    >
                        <Phone className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                        <span>{appointment.contactNumber}</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
