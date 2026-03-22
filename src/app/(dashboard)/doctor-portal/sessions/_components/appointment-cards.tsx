import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    User as UserIcon,
    Clock,
    Phone,
    CheckCircle2,
    XCircle,
    Timer,
    Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, differenceInYears } from "date-fns";
import useCreateMutation from "@/hooks/api/useCreateMutation";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export interface AppointmentCarouselProps {
    currentPatient: any | null;
    nextPatient: any | null;
    remainingQueue: any[];
    doctorId?: string;
    clinicId?: string;
    date?: string;
}

export function ConsultingCard({
    booking,
    doctorId,
    clinicId,
    date,
}: {
    booking: any;
    doctorId?: string;
    clinicId?: string;
    date?: string;
}) {
    const patient = booking?.patient || {};
    const name = patient.name || booking?.patient_name || "—";
    const dob = patient.date_of_birth || booking?.dob || booking?.date_of_birth;
    const age = dob ? differenceInYears(new Date(), new Date(dob)) : "—";
    const gender = patient.gender || booking?.gender || "—";
    const token = booking?.token_number || "—";
    const phone =
        patient.phone_number || booking?.phone || booking?.phone_number || "—";
    const appointmentId = booking?.appointment_id;

    const [consultationTime, setConsultationTime] = useState("00:00");

    useEffect(() => {
        const startTimeStr =
            booking?.actual_start_time ||
            booking?.slot?.slot_timestamp ||
            booking?.slot_timestamp;

        if (startTimeStr) {
            const startTime = new Date(startTimeStr).getTime();
            const timer = setInterval(() => {
                const now = new Date().getTime();
                const diff = Math.max(0, now - startTime);
                const minutes = Math.floor(diff / 60000);
                const seconds = Math.floor((diff % 60000) / 1000);
                setConsultationTime(
                    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
                );
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [booking]);

    const completeMutation = useCreateMutation({
        method: "post",
        endpoint: API_ENDPOINTS.ADVANCE_QUEUE,
        submitData: {
            // appointmentId: appointmentId,
            doctorId: doctorId,
            clinicId: clinicId,
            date: date,
        },
        invalidateQueries: ["doctor-queue"],
        isToast: true,
    });

    const skipMutation = useCreateMutation({
        method: "post",
        endpoint: API_ENDPOINTS.SKIP_QUEUE,
        submitData: {
            // appointmentId: appointmentId,
            doctorId: doctorId,
            clinicId: clinicId,
            date: date,
        },
        invalidateQueries: ["doctor-queue"],
        isToast: true,
    });

    const startSlot = booking?.slot?.slot_timestamp || booking?.slot_timestamp;
    const time = startSlot ? format(new Date(startSlot), "hh:mm a") : "—";

    return (
        <Card className="relative bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] min-w-[340px] max-w-[380px] h-[220px] overflow-hidden group rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-emerald-200/60">
            {/* Emerald Left Accent */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/80" />

            <CardContent className="px-5 pt-3.5 pb-2.5 h-full flex flex-col justify-between relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 rounded-md border border-emerald-100/50">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider">
                                Now Consulting
                            </span>
                        </div>
                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-[10px] shadow-md shadow-emerald-600/20">
                            {token}
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <h4 className="text-2xl font-bold text-slate-900 tracking-tight leading-none transition-colors group-hover:text-emerald-700">
                            {name}
                        </h4>
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                            <span className="capitalize">{gender}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-200" />
                            <span className="flex items-center gap-1.5">
                                <Phone className="w-3 h-3 opacity-40 shrink-0" />
                                {phone}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-tighter">
                                DOB:
                            </span>
                            <span className="text-[10px] font-bold text-slate-700">
                                {dob
                                    ? format(new Date(dob), "dd MMM yyyy")
                                    : "—"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 justify-end items-center pt-1 mt-auto">
                    <Button
                        onClick={() => skipMutation.mutate()}
                        disabled={
                            skipMutation.isPending || completeMutation.isPending
                        }
                        variant="ghost"
                        className="h-8 px-3 text-[9px] font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors uppercase tracking-widest rounded-lg"
                    >
                        Skip
                    </Button>
                    <Button
                        onClick={() => completeMutation.mutate()}
                        disabled={
                            completeMutation.isPending || skipMutation.isPending
                        }
                        className="h-8 px-5 text-[9px] font-black bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all active:scale-[0.98] uppercase tracking-widest rounded-lg"
                    >
                        Mark as Done
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export function UpcomingCard({ booking }: { booking: any }) {
    const patient = booking?.patient || {};
    const name = patient.name || booking?.patient_name || "—";
    const dob = patient.date_of_birth || booking?.dob || booking?.date_of_birth;
    const gender = patient.gender || booking?.gender || "—";
    const token = booking?.token_number || "—";
    const phone =
        patient.phone_number || booking?.phone || booking?.phone_number || "—";

    const startSlot = booking?.slot?.slot_timestamp || booking?.slot_timestamp;
    const time = startSlot ? format(new Date(startSlot), "hh:mm a") : "—";

    return (
        <Card className="relative bg-white border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] min-w-[300px] max-w-[340px] h-[220px] overflow-hidden group rounded-2xl transition-all duration-300 hover:border-blue-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            {/* Subtle Slate Left Accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 group-hover:bg-blue-200 transition-colors" />

            <CardContent className="px-5 pt-3.5 pb-2.5 h-full flex flex-col justify-between">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Badge
                            variant="secondary"
                            className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-widest"
                        >
                            Upcoming
                        </Badge>
                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-50 text-slate-400 font-bold text-[10px] border border-slate-100">
                            {token}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-xl font-semibold text-slate-800 tracking-tight leading-none group-hover:text-blue-600 transition-colors truncate">
                            {name}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
                            <span className="capitalize">{gender}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-200" />
                            <span className="tracking-wide text-[10px]">
                                {phone}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50/50 rounded-lg border border-slate-100/50">
                            <Calendar className="w-3 h-3 text-slate-300" />
                            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-tighter">
                                DOB:
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">
                                {dob
                                    ? format(new Date(dob), "dd MMM yyyy")
                                    : "—"}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function AppointmentCarousel({
    currentPatient,
    nextPatient,
    remainingQueue,
    doctorId,
    clinicId,
    date,
}: AppointmentCarouselProps) {
    if (
        !currentPatient &&
        !nextPatient &&
        (!remainingQueue || remainingQueue.length === 0)
    ) {
        return null;
    }

    return (
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x">
            {currentPatient && (
                <div className="snap-start shrink-0">
                    <ConsultingCard
                        booking={currentPatient}
                        doctorId={doctorId}
                        clinicId={clinicId}
                        date={date}
                    />
                </div>
            )}
            {nextPatient && (
                <div className="snap-start shrink-0">
                    <UpcomingCard booking={nextPatient} />
                </div>
            )}
            {remainingQueue?.map((booking: any, index: number) => (
                <div
                    key={booking.appointment_id || index}
                    className="snap-start shrink-0"
                >
                    <UpcomingCard booking={booking} />
                </div>
            ))}
        </div>
    );
}
