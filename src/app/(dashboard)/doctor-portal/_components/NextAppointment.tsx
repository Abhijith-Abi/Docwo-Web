"use client";

import { Card } from "@/components/ui/card";
import { Clock, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useGetDoctorQueue } from "@/hooks/api/useGetDoctorQueue";
import { useQueueSocket } from "@/hooks/useQueueSocket";
import { Skeleton } from "@/components/ui/skeleton";
import { DataErrorState } from "@/components/ui/data-state-view";
import { format, differenceInYears } from "date-fns";
import { Button } from "@/components/ui/button";

export default function NextAppointment() {
    const user = useAuthStore((state) => state.user);
    const doctorId = user?.doctor_profile?.doctor_id;
    const clinicId = user?.doctor_clinics?.[0]?.clinic_id;
    const today = format(new Date(), "yyyy-MM-dd");

    const { data, isLoading, isError, refetch, isFetching } = useGetDoctorQueue(
        clinicId,
        doctorId,
        today,
    );

    useQueueSocket({ clinicId, doctorId, date: today });

    const queue = Array.isArray(data?.queue) ? data.queue : [];
    const nextPatient = queue[0] || null;

    const totalInQueue = queue.length;
    const totalExpected = data?.sessionStatus?.totalScheduled ?? 0;

    const circumference = 2 * Math.PI * 56;
    const progress =
        totalExpected > 0 ? (totalExpected - totalInQueue) / totalExpected : 0;
    const strokeDashoffset = circumference * (1 - progress);
    const patientData = nextPatient?.patient ?? {};
    const patientName =
        patientData?.name || nextPatient?.patient_name || "No next patient";
    const tokenNumber = nextPatient?.token_number || "";
    const tokenStatus = nextPatient?.token_status || "";
    const dob = patientData?.date_of_birth;
    const age = dob ? differenceInYears(new Date(), new Date(dob)) : null;
    const gender = patientData?.gender || null;
    const ageGender =
        age !== null && gender
            ? `${age} / ${gender}`
            : age !== null
              ? `${age}`
              : (gender ?? null);

    const upcomingQueue = queue.slice(1, 4);

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
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <h2 className="text-blue-500 font-semibold text-lg">
                            Current Appointment
                        </h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-md text-gray-500"
                        onClick={() => refetch()}
                        disabled={isFetching}
                    >
                        <RefreshCw
                            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                        />
                    </Button>
                </div>
                <DataErrorState
                    title="Failed to load queue"
                    description="Could not fetch the appointment queue. Please try again later."
                />
            </Card>
        );
    }

    return (
        <Card className="w-full bg-white flex flex-col p-5 shadow-sm border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <h2 className="text-blue-500 font-semibold text-lg">
                        Current Appointment
                    </h2>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-md text-gray-500"
                    onClick={() => refetch()}
                    disabled={isFetching}
                >
                    <RefreshCw
                        className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                    />
                </Button>
            </div>

            <div className="flex flex-col items-center justify-center mb-1">
                <div className="relative w-32 h-32 flex items-center justify-center">
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
                    <div
                        className={`flex flex-col items-center justify-center z-10 rounded-full w-[96px] h-[96px] shadow-lg relative transition-all duration-500 ${tokenStatus === "in_consult" ? "bg-blue-600 text-white animate-pulse-bg" : "bg-white text-gray-900"}`}
                    >
                        {tokenStatus === "in_consult" && (
                            <>
                                <div
                                    className="absolute inset-0 rounded-full bg-blue-500/50 animate-pulse-ring ring-4 ring-blue-400/30"
                                    style={{ animationDelay: "0s" }}
                                />
                                <div
                                    className="absolute inset-0 rounded-full bg-blue-500/50 animate-pulse-ring ring-4 ring-blue-400/30"
                                    style={{ animationDelay: "1s" }}
                                />
                                <div
                                    className="absolute inset-0 rounded-full bg-blue-500/50 animate-pulse-ring ring-4 ring-blue-400/30"
                                    style={{ animationDelay: "2s" }}
                                />
                            </>
                        )}
                        <span
                            className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 z-10 ${tokenStatus === "in_consult" ? "text-blue-100" : "text-gray-400"}`}
                        >
                            Token
                        </span>
                        <span className="text-4xl font-black border-none outline-none z-10 leading-none drop-shadow-sm">
                            {nextPatient?.token_number}
                        </span>
                        <div
                            className={`mt-1.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full z-10 ${tokenStatus === "in_consult" ? "bg-white/20 backdrop-blur-sm border border-white/30" : "bg-gray-100 border border-gray-200"}`}
                        >
                            <span
                                className={`text-[9px] font-bold uppercase tracking-wider leading-tight ${tokenStatus === "in_consult" ? "text-white" : "text-gray-500"}`}
                            >
                                {tokenStatus === "in_consult"
                                    ? "consulting"
                                    : "waiting"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-3 w-full">
                    <div className="flex flex-col items-center space-y-1.5 transition-all duration-500">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span
                                className={`h-1 w-1 rounded-full bg-blue-500 ${tokenStatus === "in_consult" ? "animate-pulse" : ""}`}
                            />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500/70">
                                {tokenStatus === "in_consult"
                                    ? "Now Consulting"
                                    : "Next Patient"}
                            </span>
                            <span
                                className={`h-1 w-1 rounded-full bg-blue-500 ${tokenStatus === "in_consult" ? "animate-pulse" : ""}`}
                            />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight text-center leading-tight drop-shadow-sm px-4">
                            {patientName}
                        </h3>
                        {ageGender && (
                            <div className="flex items-center gap-2 px-4 py-1 bg-blue-50/50 rounded-full border border-blue-100/50 mt-1 shadow-sm">
                                <span className="text-[11px] font-bold text-blue-600/80 uppercase tracking-wider">
                                    {ageGender}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {nextPatient ? (
                <>
                    {upcomingQueue.length > 0 && (
                        <div className="border-t border-gray-100 pt-2 w-full">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Upcoming in Queue
                            </h4>
                            <div className="space-y-3">
                                {upcomingQueue.map((patient, idx) => (
                                    <div
                                        key={patient.appointment_id || idx}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                                                {(patient.token_number || 0)
                                                    .toString()
                                                    .padStart(2, "0")}
                                            </span>
                                            <span className="text-gray-700 font-medium truncate max-w-[120px]">
                                                {patient.patient_name ||
                                                    patient.patient?.name ||
                                                    "Patient"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">
                        No patients currently in queue
                    </p>
                </div>
            )}
        </Card>
    );
}
