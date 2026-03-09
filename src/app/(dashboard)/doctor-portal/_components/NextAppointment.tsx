"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useGetDoctorQueue } from "@/hooks/api/useGetDoctorQueue";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DataErrorState,
    DataEmptyState,
} from "@/components/ui/data-state-view";
import { format, differenceInYears } from "date-fns";

export default function NextAppointment() {
    const user = useAuthStore((state) => state.user);
    const doctorId = user?.doctor_profile?.doctor_id;
    const clinicId = user?.doctor_clinics?.[0]?.clinic_id;
    const today = format(new Date(), "yyyy-MM-dd");

    console.log(doctorId, clinicId, user, "---");

    const { data, isLoading, isError } = useGetDoctorQueue(
        clinicId,
        doctorId,
        today,
    );

    const nextPatient = data?.nextPatient ?? (data?.currentQueue?.[0] || null);

    const totalInQueue = data?.totalInQueue ?? 0;
    const totalExpected = data?.totalExpected ?? 0;

    const circumference = 2 * Math.PI * 56;
    const progress =
        totalExpected > 0 ? (totalExpected - totalInQueue) / totalExpected : 0;
    const strokeDashoffset = circumference * (1 - progress);
    const patientData = nextPatient?.patient ?? {};
    const patientName =
        patientData?.name || nextPatient?.patient_name || "No next patient";
    const dob = patientData?.date_of_birth || nextPatient?.date_of_birth;
    const age = dob ? differenceInYears(new Date(), new Date(dob)) : null;
    const gender = patientData?.gender || nextPatient?.gender || null;
    const ageGender =
        age !== null && gender
            ? `${age} / ${gender}`
            : age !== null
              ? `${age}`
              : (gender ?? null);

    const startSlot =
        nextPatient?.slot?.slot_timestamp ||
        nextPatient?.doctor_slots?.slot_timestamp ||
        nextPatient?.slot_timestamp;
    const endSlot =
        nextPatient?.slot?.slot_end_timestamp ||
        nextPatient?.doctor_slots?.slot_end_timestamp ||
        nextPatient?.slot_end_timestamp;

    const timeSchedule =
        startSlot && endSlot
            ? `${format(new Date(startSlot), "hh:mm a")} to ${format(new Date(endSlot), "hh:mm a")}`
            : startSlot
              ? format(new Date(startSlot), "hh:mm a")
              : null;

    if (isLoading) {
        return (
            <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <Skeleton className="w-32 h-32 rounded-full" />
                        <div className="absolute w-[88px] h-[88px] rounded-full bg-white flex flex-col items-center justify-center gap-1">
                            <Skeleton className="h-7 w-8" />
                            <Skeleton className="h-2 w-12" />
                        </div>
                    </div>
                </div>
                {/* Text skeleton */}
                <div className="text-center space-y-2">
                    <Skeleton className="h-5 w-36 mx-auto" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                    <Skeleton className="h-3 w-48 mx-auto" />
                </div>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <h2 className="text-blue-500 font-semibold text-lg">
                        Next Appointment
                    </h2>
                </div>
                <DataErrorState
                    title="Failed to load queue"
                    description="Could not fetch the appointment queue. Please try again later."
                />
            </Card>
        );
    }

    return (
        <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
            <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-blue-500" />
                <h2 className="text-blue-500 font-semibold text-lg">
                    Next Appointment
                </h2>
            </div>

            <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-blue-100"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="text-[#3b82f6] drop-shadow-sm"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="flex flex-col items-center justify-center z-10 bg-white rounded-full w-[88px] h-[88px] shadow-sm">
                        <span className="text-3xl font-bold text-gray-900 border-none outline-none">
                            {totalInQueue}
                        </span>
                        <span className="text-[10px] text-gray-400 leading-tight">
                            in queue
                        </span>
                    </div>
                </div>
            </div>

            {nextPatient ? (
                <div className="text-center space-y-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                        {patientName}
                    </h3>
                    {ageGender && (
                        <p className="text-gray-500 text-sm capitalize">
                            {ageGender}
                        </p>
                    )}
                    {timeSchedule && (
                        <p className="text-gray-400 text-xs mt-2">
                            Time Schedule : {timeSchedule}
                        </p>
                    )}
                    {nextPatient.token_number && (
                        <p className="text-gray-400 text-xs">
                            Token :{" "}
                            <span className="font-semibold text-emerald-500">
                                {nextPatient.token_number
                                    .toString()
                                    .padStart(2, "0")}
                            </span>
                        </p>
                    )}
                </div>
            ) : (
                <></>
            )}
        </Card>
    );
}
