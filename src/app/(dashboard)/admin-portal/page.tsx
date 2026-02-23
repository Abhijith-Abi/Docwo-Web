"use client";

import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardFilters } from "./_components/dashboard-filters";
import { StatCards } from "./_components/stat-cards";
import { AppointmentsChart } from "./_components/appointments-chart";
import { AppointmentStatusChart } from "./_components/appointment-status-chart";
import { AppointmentHeatmap } from "./_components/heatmap-calendar";

export default function AdminPortalPage() {
    return (
        <div className="flex flex-col h-full bg-slate-50/20 w-full animate-in fade-in duration-500">
            <div className="max-w-[1400px] w-full mx-auto pb-10">
                <DashboardHeader />
                <DashboardFilters />
                <StatCards />

                <h2 className="text-[20px] font-bold text-slate-900 mb-6 mt-4 tracking-tight">
                    Analytics
                </h2>

                <div className="flex flex-col gap-6">
                    <AppointmentsChart />
                    <AppointmentStatusChart />
                    <AppointmentHeatmap />
                </div>
            </div>
        </div>
    );
}
