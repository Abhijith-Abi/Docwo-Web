"use client";

import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardFilters } from "./_components/dashboard-filters";
import { StatCards } from "./_components/stat-cards";
import { AppointmentsChart } from "./_components/appointments-chart";
import { AppointmentStatusChart } from "./_components/appointment-status-chart";
import { AppointmentHeatmap } from "./_components/heatmap-calendar";
import { useGetAppointmentsAnalytics } from "@/hooks/api/useGetAppointmentsAnalytics";
import { useState } from "react";
import { FilterState } from "./_components/dashboard-filters";

export default function AdminPortalPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        booking_source: "all",
        doctorId: "",
        startDate: "",
        endDate: "",
    });

    const { data, isLoading, isError } = useGetAppointmentsAnalytics(filters);

    return (
        <div className="flex flex-col h-full w-full animate-in fade-in duration-500">
            <div className="">
                <DashboardHeader
                    onToggleFilters={() => setShowFilters(!showFilters)}
                    isFiltersActive={showFilters}
                />
                {showFilters && (
                    <DashboardFilters
                        filters={filters}
                        onFilterChange={(newFilters) => setFilters(newFilters)}
                    />
                )}
                <StatCards
                    data={data?.summary}
                    isLoading={isLoading}
                    isError={isError}
                />

                <h2 className="text-[20px] font-bold text-slate-900 mb-6 mt-4 tracking-tight">
                    Analytics
                </h2>

                <div className="flex flex-col gap-6">
                    <AppointmentsChart
                        data={data?.trends}
                        isLoading={isLoading}
                        isError={isError}
                    />
                    <AppointmentStatusChart
                        data={data?.statusDistribution}
                        isLoading={isLoading}
                        isError={isError}
                    />
                    <AppointmentHeatmap
                        data={data?.heatmap}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </div>
            </div>
        </div>
    );
}
