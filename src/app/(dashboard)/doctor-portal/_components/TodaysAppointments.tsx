"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCcw, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth-store";
import { useGetDoctorAppointments } from "@/hooks/api/useGetDoctorAppointments";
import { format, differenceInYears } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { DataErrorState } from "@/components/ui/data-state-view";

export default function TodaysAppointments() {
    const user = useAuthStore((state) => state.user);
    const doctorId = user?.doctor_profile?.doctor_id;

    // Filter appointments for "future"
    const {
        data: { data: appointments = [] } = {},
        isLoading,
        isError,
        refetch,
        isFetching,
    } = useGetDoctorAppointments(doctorId, {
        limit: 10,
        time: "future",
    });

    const scheduleGroups = useMemo(() => {
        if (!appointments || appointments.length === 0) return [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const groups: Record<string, any[]> = {};

        appointments.forEach((apt) => {
            const startSlot =
                apt?.doctor_slots?.slot_timestamp || apt?.slot_timestamp;
            const endSlot =
                apt?.doctor_slots?.slot_end_timestamp ||
                apt?.slot_end_timestamp;

            let timeKey = "N/A";
            if (startSlot && endSlot) {
                timeKey = `${format(new Date(startSlot), "hh:mm a")} - ${format(new Date(endSlot), "hh:mm a")}`;
            } else if (startSlot) {
                timeKey = format(new Date(startSlot), "hh:mm a");
            }

            if (!groups[timeKey]) {
                groups[timeKey] = [];
            }
            groups[timeKey].push(apt);
        });

        return (
            Object.entries(groups)
                .sort((a, b) => {
                    const aTime = new Date(
                        a[1][0]?.doctor_slots?.slot_timestamp ||
                            a[1][0]?.slot_timestamp ||
                            0,
                    ).getTime();
                    const bTime = new Date(
                        b[1][0]?.doctor_slots?.slot_timestamp ||
                            b[1][0]?.slot_timestamp ||
                            0,
                    ).getTime();
                    return aTime - bTime;
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map(([time, apts]: [string, any[]]) => {
                    return {
                        time,
                        appointments: apts.map((apt) => {
                            const patientName =
                                apt?.patient_name ||
                                `${apt?.first_name || ""} ${apt?.last_name || ""}`.trim() ||
                                "N/A";
                            const patientId = apt?.patients?.user_id
                                ? `PT-${apt.patients.user_id.toString().padStart(4, "0")}`
                                : "N/A";
                            const dob =
                                apt?.patients?.date_of_birth ||
                                apt?.date_of_birth;
                            const age = dob
                                ? differenceInYears(new Date(), new Date(dob))
                                : "N/A";
                            const gender = apt?.patients?.gender || "N/A";
                            const ageGender =
                                age === "N/A" && gender === "N/A"
                                    ? "N/A"
                                    : `${age}/${gender}`;
                            const phone = apt?.patients?.phone_number || "N/A";
                            const email =
                                apt?.email || apt?.patients?.email || "N/A";
                            const token =
                                apt?.token_number
                                    ?.toString()
                                    .padStart(2, "0") || "N/A";

                            return {
                                id: apt?.appointment_id || Math.random(),
                                token,
                                name: patientName,
                                pid: patientId,
                                ageGender,
                                phone,
                                email,
                            };
                        }),
                    };
                })
        );
    }, [appointments]);

    return (
        <Card className="w-full h-fit bg-white flex flex-col pt-5 pb-6 shadow-sm overflow-hidden p-0 border-gray-200">
            <div className="flex items-center justify-between p-4">
                <h2 className="text-[#0E8A63] font-semibold text-lg">
                    Todays Appointments
                </h2>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 rounded-md border-gray-200 text-gray-500 shadow-none ${isFetching ? "opacity-50" : ""}`}
                        onClick={() => refetch()}
                        disabled={isFetching}
                    >
                        <RefreshCcw
                            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                        />
                    </Button>
                </div>
            </div>

            <div className="flex-1 w-full px-6 pb-6 overflow-x-auto">
                <div className="w-full min-w-[800px] border border-border/60 rounded-[10px] flex flex-col bg-card shadow-sm">
                    <div className="flex border-b border-border/60 bg-blue-50/50 text-sm font-bold text-foreground h-[52px]">
                        <div className="w-[180px] px-6 flex items-center shrink-0">
                            Time Schedule
                        </div>
                        <div className="flex-1 grid grid-cols-[100px_2fr_1fr_1.5fr] gap-4 px-6 items-center">
                            <div>Token</div>
                            <div>Patient name</div>
                            <div>Age/ Gender</div>
                            <div>Contact</div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="flex flex-col text-sm bg-background">
                        {isLoading ? (
                            <div className="p-6 flex flex-col gap-4">
                                <Skeleton className="h-[88px] w-full" />
                                <Skeleton className="h-[88px] w-full" />
                                <Skeleton className="h-[88px] w-full" />
                            </div>
                        ) : isError ? (
                            <DataErrorState
                                title="Failed to load appointments"
                                className="mb-6 mx-6 border-none shadow-none bg-transparent"
                            />
                        ) : scheduleGroups.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
                                <Clock className="h-10 w-10 text-muted-foreground/30 mb-3" />
                                <span className="font-medium text-base">
                                    No appointments scheduled for today
                                </span>
                            </div>
                        ) : (
                            scheduleGroups.map((group, groupIndex) => (
                                <div
                                    key={groupIndex}
                                    className="flex border-b border-border/50 last:border-b-0 even:bg-muted/30 transition-colors"
                                >
                                    <div className="w-[180px] px-6 py-4 font-medium text-[14px] text-foreground/90 border-r border-border/50 flex flex-col shrink-0 gap-2">
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Clock className="h-[14px] w-[14px] text-muted-foreground" />
                                            {group.time}
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        {group.appointments.map(
                                            (apt, aptIndex) => (
                                                <div
                                                    key={apt.id}
                                                    className="grid grid-cols-[100px_2fr_1fr_1.5fr] gap-4 px-6 py-4 border-b border-border/50 last:border-b-0 items-start min-h-[88px]"
                                                >
                                                    <div className="flex shrink-0 pt-0.5">
                                                        <Badge
                                                            variant="outline"
                                                            className="font-bold text-[12px] rounded-[4px] px-2 py-0.5 border-none shadow-sm gap-1 bg-background"
                                                        >
                                                            TKN{" "}
                                                            <span className="text-emerald-500">
                                                                {apt.token.padStart(
                                                                    2,
                                                                    "0",
                                                                )}
                                                            </span>
                                                        </Badge>
                                                    </div>
                                                    <div className="flex flex-col pt-0.5">
                                                        <div className="font-medium text-[14px] text-foreground/90">
                                                            {apt.name}
                                                        </div>
                                                        <div className="text-[13px] text-muted-foreground mt-0.5">
                                                            {apt.pid}
                                                        </div>
                                                    </div>
                                                    <div className="text-[14px] font-medium text-foreground/80 flex pt-0.5 capitalize">
                                                        {apt.ageGender}
                                                    </div>
                                                    <div className="flex flex-col pt-0.5">
                                                        <div className="text-[14px] font-medium text-foreground/90">
                                                            {apt.phone}
                                                        </div>
                                                        <div
                                                            className="text-[13px] text-muted-foreground mt-0.5 max-w-[150px] truncate"
                                                            title={apt.email}
                                                        >
                                                            {apt.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {scheduleGroups.length > 0 && (
                <div className="mb-4 flex justify-center w-full">
                    <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-8 h-10 text-xs font-semibold shadow-none border-none">
                        See full appointment list &gt;&gt;&gt;
                    </Button>
                </div>
            )}
        </Card>
    );
}
