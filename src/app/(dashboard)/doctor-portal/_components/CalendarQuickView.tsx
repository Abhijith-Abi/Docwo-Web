"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DataErrorState } from "@/components/ui/data-state-view";
import { useAuthStore } from "@/store/auth-store";
import { useGetDoctorCalendarQuickView } from "@/hooks/api/useGetDoctorCalendarQuickView";

export default function CalendarQuickView() {
    const user = useAuthStore((state) => state.user);
    const doctorId = user?.doctor_profile?.doctor_id;

    const { data, isLoading, isError } =
        useGetDoctorCalendarQuickView(doctorId);

    if (isLoading) {
        return (
            <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="flex flex-col gap-3">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton
                            key={i}
                            className="h-[46px] w-full rounded-md"
                        />
                    ))}
                </div>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                    <h2 className="text-yellow-600 font-semibold text-lg">
                        Calendar Quick View
                    </h2>
                </div>
                <DataErrorState title="Failed to load calendar quick view" />
            </Card>
        );
    }

    const items = data ?? [];

    return (
        <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
            <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <h2 className="text-yellow-600 font-semibold text-lg">
                    Calendar Quick View
                </h2>
            </div>

            <div className="flex flex-col gap-3">
                {items.map((item) => {
                    const hasNoAppointments = item.appointmentCount === 0;

                    if (hasNoAppointments) {
                        return (
                            <div
                                key={item.date}
                                className="flex items-center justify-between px-4 py-3 bg-[#FEF9C3] border border-[#FDE047] rounded-md"
                            >
                                <span className="text-[#CA8A04] font-medium text-sm">
                                    {item.dayLabel}:{" "}
                                    <span className="font-normal opacity-90">
                                        No Appointments Scheduled
                                    </span>
                                </span>
                            </div>
                        );
                    }

                    if (item.isToday) {
                        return (
                            <div
                                key={item.date}
                                className="flex items-center justify-between px-4 py-3 bg-[#E5E7EB] rounded-md"
                            >
                                <span className="text-gray-900 font-medium text-sm">
                                    {item.dayLabel}
                                </span>
                                <span className="text-gray-900 font-bold text-sm">
                                    {item.appointmentCount} appointments
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={item.date}
                            className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm"
                        >
                            <span className="text-gray-900 text-sm">
                                {item.dayLabel}
                            </span>
                            <span className="text-gray-900 font-bold text-sm">
                                {item.appointmentCount} appointments
                            </span>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
