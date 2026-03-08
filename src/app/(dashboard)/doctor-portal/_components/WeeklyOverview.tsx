"use client";

import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DataErrorState } from "@/components/ui/data-state-view";
import { useAuthStore } from "@/store/auth-store";
import { useGetDoctorWeeklyOverview } from "@/hooks/api/useGetDoctorWeeklyOverview";

const DAYS_ORDER = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
const DAY_SHORT: Record<string, string> = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
};

export default function WeeklyOverview() {
    const user = useAuthStore((state) => state.user);
    const doctorId = user?.doctor_profile?.doctor_id;

    const { data, isLoading, isError } = useGetDoctorWeeklyOverview(doctorId);

    if (isLoading) {
        return (
            <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
                <div className="flex items-center gap-2 mb-8">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-36" />
                </div>
                <div className="flex justify-around mb-12">
                    <div className="text-center space-y-2">
                        <Skeleton className="h-8 w-12 mx-auto" />
                        <Skeleton className="h-3 w-16 mx-auto" />
                    </div>
                    <div className="text-center space-y-2">
                        <Skeleton className="h-8 w-12 mx-auto" />
                        <Skeleton className="h-3 w-20 mx-auto" />
                    </div>
                </div>
                {/* Skeleton bars anchored at bottom */}
                <div className="h-32 flex items-end justify-between px-2 gap-2">
                    {[60, 40, 70, 50, 80, 55, 65].map((h, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center flex-1 gap-2"
                        >
                            <Skeleton
                                className="w-full max-w-[28px] rounded-t-sm"
                                style={{ height: `${h}%` }}
                            />
                            <Skeleton className="h-3 w-6" />
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-purple-500" />
                    <h2 className="text-purple-500 font-semibold text-lg">
                        Weekly Overview
                    </h2>
                </div>
                <DataErrorState title="Failed to load weekly overview" />
            </Card>
        );
    }

    // Sort breakdown by the canonical week order
    const breakdown = [...(data?.dailyBreakdown ?? [])].sort(
        (a, b) => DAYS_ORDER.indexOf(a.day) - DAYS_ORDER.indexOf(b.day),
    );

    const maxValue = Math.max(
        ...breakdown.map((d) => d.bookings + d.consultations),
        1,
    );
    const BAR_HEIGHT = 140; // px — matches h-[140px] container

    return (
        <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-500" />
                    <h2 className="text-purple-500 font-semibold text-lg">
                        Weekly Overview
                    </h2>
                </div>
            </div>

            <div className="flex justify-around mb-8">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                        {data?.totalBookings ?? 0}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                        Bookings
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                        {data?.totalConsultations ?? 0}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                        Consultations
                    </p>
                </div>
            </div>

            {/* Single-bar chart — dark gradient, grows upward */}
            <div className="h-[140px] flex items-end justify-between gap-2">
                {breakdown.map((item, index) => {
                    const total = item.bookings + item.consultations;
                    const barH = Math.round((total / maxValue) * BAR_HEIGHT);
                    const finalH = Math.max(barH, total > 0 ? 12 : 4);
                    return (
                        <div
                            key={index}
                            className="group relative flex flex-col items-center flex-1 min-w-0"
                        >
                            {/* Hover tooltip */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 hidden group-hover:flex flex-col items-start bg-gray-800 text-white text-[11px] rounded-lg px-3 py-2 shadow-xl whitespace-nowrap gap-1 pointer-events-none">
                                <span className="font-semibold text-white mb-0.5">
                                    {item.day}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="inline-block w-2 h-2 rounded-sm bg-purple-400 shrink-0" />
                                    {item.bookings} bookings
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="inline-block w-2 h-2 rounded-sm bg-teal-400 shrink-0" />
                                    {item.consultations} consultations
                                </span>
                            </div>

                            <div
                                className="w-full max-w-[42px] rounded-t-xl transition-all duration-500 cursor-default"
                                style={{
                                    height: `${finalH}px`,
                                    background:
                                        "linear-gradient(to top, #111827, #4B5563)",
                                }}
                            />
                            <span className="text-xs font-medium text-gray-500 mt-2">
                                {DAY_SHORT[item.day] ?? item.day}
                            </span>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
