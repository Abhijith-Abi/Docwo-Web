"use client";

import { useState } from "react";
import { AppointmentsHeader } from "./appointments-header";
import { AppointmentsToolbar } from "./appointments-toolbar";
import { AppointmentsFilters } from "./appointments-filters";
import { AppointmentsStats } from "./appointments-stats";
import { AppointmentsListView } from "./appointments-list-view";
import { AppointmentsGridView } from "./appointments-grid-view";
import { AppointmentsPagination } from "./appointments-pagination";
import { appointmentsData } from "./data";

export function AppointmentsClient() {
    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="flex-1 space-y-7 p-6 md:p-10 pt-8 bg-[#FDFDFE]">
            <AppointmentsHeader />

            <div className="bg-background border border-border/80 rounded-[12px] p-4 sm:p-5 shadow-sm">
                <AppointmentsToolbar
                    showFilters={showFilters}
                    onToggleFilters={() => setShowFilters(!showFilters)}
                    view={view}
                    onViewChange={setView}
                />
                {showFilters && (
                    <div className="mt-5 animate-in fade-in slide-in-from-top-2">
                        <AppointmentsFilters />
                    </div>
                )}
            </div>

            <AppointmentsStats />

            <div className="flex items-center justify-between pt-1">
                <span className="text-[13px] font-semibold text-foreground/80">
                    Appointments (12)
                </span>
            </div>

            {view === "grid" ? (
                <AppointmentsGridView appointments={appointmentsData} />
            ) : (
                <AppointmentsListView appointments={appointmentsData} />
            )}

            <div className="pt-2">
                <AppointmentsPagination />
            </div>
        </div>
    );
}
