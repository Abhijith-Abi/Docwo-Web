"use client";

import { useState } from "react";
import { PatientsHeader } from "./patients-header";
import { PatientsToolbar } from "./patients-toolbar";
import { PatientsFilters } from "./patients-filters";
import { PatientsGridView } from "./patients-grid-view";
import { PatientsListView } from "./patients-list-view";
import { PatientsPagination } from "./patients-pagination";
import { patientsData } from "./data";
import { Button } from "@/components/ui/button";

export function PatientsClient() {
    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="flex-1 space-y-7 p-6 md:p-10 pt-8 bg-[#FDFDFE]">
            <PatientsHeader />

            <div className="bg-background border border-border/80 rounded-[12px] p-4 sm:p-5 shadow-sm">
                <PatientsToolbar
                    showFilters={showFilters}
                    onToggleFilters={() => setShowFilters(!showFilters)}
                    view={view}
                    onViewChange={setView}
                />
                {showFilters && (
                    <div className="mt-5 animate-in fade-in slide-in-from-top-2">
                        <PatientsFilters />
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between pt-1">
                <span className="text-[13px] font-semibold text-foreground/80">
                    Patients (212)
                </span>
                <Button
                    variant="outline"
                    className="h-[34px] text-[12px] font-semibold rounded-[6px] px-3 shadow-sm border-border/80 text-foreground/80 hover:text-foreground"
                >
                    Clear Selection
                </Button>
            </div>

            {view === "grid" ? (
                <PatientsGridView patients={patientsData} />
            ) : (
                <PatientsListView patients={patientsData} />
            )}

            <div className="pt-2">
                <PatientsPagination />
            </div>
        </div>
    );
}
