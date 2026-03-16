import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Clock, Phone, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { format, differenceInYears } from "date-fns";

export interface AppointmentCarouselProps {
    currentPatient: any | null;
    nextPatient: any | null;
    remainingQueue: any[];
}

export function ConsultingCard({ booking }: { booking: any }) {
    const patient = booking?.patient || {};
    const name = patient.name || booking?.patient_name || "—";
    const dob = patient.date_of_birth || booking?.date_of_birth;
    const age = dob ? differenceInYears(new Date(), new Date(dob)) : "—";
    const gender = patient.gender || booking?.gender || "—";
    const token = booking?.token_number || "—";
    const phone = patient.phone_number || "—";

    const startSlot = booking?.slot?.slot_timestamp || booking?.slot_timestamp;
    const endSlot = booking?.slot?.slot_end_timestamp || booking?.slot_end_timestamp;
    const time = startSlot && endSlot 
        ? `${format(new Date(startSlot), "hh:mm a")} - ${format(new Date(endSlot), "hh:mm a")}`
        : startSlot ? format(new Date(startSlot), "hh:mm a") : "—";

    return (
        <Card className="bg-primary/10 border-primary/20 shadow-md min-w-[320px] relative overflow-hidden group rounded-xl">
            <div className="absolute top-4 right-4">
                <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground border-none font-bold">
                    Token No : {token}
                </Badge>
            </div>
            <CardContent className="p-8 space-y-6">
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                        Now Consulting
                    </h3>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-foreground font-semibold">
                        <User className="w-5 h-5 text-primary/60" />
                        <span>
                            {name} . {age} . {gender}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground font-semibold">
                        <Clock className="w-5 h-5 text-primary/60" />
                        <span>{time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground font-semibold">
                        <Phone className="w-5 h-5 text-primary/60" />
                        <span>{phone}</span>
                    </div>
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-none shadow-sm font-bold py-6 text-lg rounded-xl">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Mark as Done
                </Button>
            </CardContent>
        </Card>
    );
}

export function UpcomingCard({ booking, label = "Upcoming" }: { booking: any, label?: string }) {
    const patient = booking?.patient || {};
    const name = patient.name || booking?.patient_name || "—";
    const dob = patient.date_of_birth || booking?.date_of_birth;
    const age = dob ? differenceInYears(new Date(), new Date(dob)) : "—";
    const gender = patient.gender || booking?.gender || "—";
    const token = booking?.token_number || "—";
    const status = booking?.status || "Upcoming";

    const startSlot = booking?.slot?.slot_timestamp || booking?.slot_timestamp;
    const endSlot = booking?.slot?.slot_end_timestamp || booking?.slot_end_timestamp;
    const time = startSlot && endSlot 
        ? `${format(new Date(startSlot), "hh:mm a")} - ${format(new Date(endSlot), "hh:mm a")}`
        : startSlot ? format(new Date(startSlot), "hh:mm a") : "—";

    const isCompleted = status?.toLowerCase() === "completed";

    return (
        <Card
            className={cn(
                "min-w-[280px] border-border/80 shadow-sm group hover:scale-[1.01] transition-all rounded-xl h-full",
                isCompleted ? "opacity-60 bg-muted/30" : "bg-card",
            )}
        >
            <CardContent className="p-6 relative">
                <div className="flex justify-between items-start mb-6">
                    <span
                        className={cn(
                            "text-xs font-bold uppercase tracking-wider",
                            isCompleted ? "text-muted-foreground" : "text-primary",
                        )}
                    >
                        {label || status}
                    </span>
                    <Badge
                        variant="outline"
                        className={cn(
                            "border-primary/20",
                            isCompleted
                                ? "bg-muted text-muted-foreground"
                                : "bg-primary/5 text-primary",
                        )}
                    >
                        Token No : {token}
                    </Badge>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-foreground font-medium">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>
                            {name} . {age} . {gender}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground/60" />
                        <span>{time}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function AppointmentCarousel({ 
    currentPatient, 
    nextPatient, 
    remainingQueue 
}: AppointmentCarouselProps) {
    if (!currentPatient && !nextPatient && (!remainingQueue || remainingQueue.length === 0)) {
        return null;
    }

    return (
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
            {currentPatient && (
                <div className="snap-start shrink-0">
                    <ConsultingCard booking={currentPatient} />
                </div>
            )}
            {nextPatient && (
                <div className="snap-start shrink-0">
                    <UpcomingCard booking={nextPatient} label="Next Patient" />
                </div>
            )}
            {remainingQueue?.map((booking: any, index: number) => (
                <div key={booking.appointment_id || index} className="snap-start shrink-0">
                    <UpcomingCard booking={booking} />
                </div>
            ))}
        </div>
    );
}
