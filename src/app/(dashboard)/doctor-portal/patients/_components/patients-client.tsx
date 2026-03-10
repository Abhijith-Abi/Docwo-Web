"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PatientsHeader } from "./patients-header";
import { PatientsToolbar } from "./patients-toolbar";
import { PatientsFilters } from "./patients-filters";
import { PatientsGridView } from "./patients-grid-view";
import { PatientsListView } from "./patients-list-view";
import { PatientsPagination } from "./patients-pagination";
import {
    PatientsGridSkeleton,
    PatientsListSkeleton,
} from "./patients-skeleton";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useGetDoctorsPatients } from "@/hooks/api/useGetDoctorsPatients";
import { useGetAnalyticsFilters } from "@/hooks/api/useGetAnalyticsFilters";
import { DataErrorState } from "@/components/ui/data-state-view";

export function PatientsClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

    const { data: filterOptions, isLoading: isFiltersLoading } =
        useGetAnalyticsFilters();
    const doctors =
        filterOptions?.data?.doctors || filterOptions?.doctors || [];

    // Search and filters state
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filters, setFilters] = useState({
        doctorId: "all",
        gender: "all",
        age: "all",
    });

    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const [page, setPage] = useState(pageFromUrl);

    // Handle debouncing search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (debouncedSearch !== searchQuery) {
                setDebouncedSearch(searchQuery);
                setPage(1); // Reset page on new search
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, debouncedSearch]);

    const handleFilterChange = useCallback(
        (key: keyof typeof filters, value: string) => {
            setFilters((prev) => ({ ...prev, [key]: value }));
            setPage(1); // Reset page on filter change
        },
        [],
    );

    useEffect(() => {
        setPage(pageFromUrl);
    }, [pageFromUrl]);

    const handlePageChange = useCallback(
        (newPage: number) => {
            setPage(newPage);
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", newPage.toString());
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [pathname, router, searchParams],
    );

    const handleSelectAll = useCallback(
        (checked: boolean, allPatients: any[]) => {
            if (checked) {
                setSelectedPatients(allPatients.map((p) => p.id));
            } else {
                setSelectedPatients([]);
            }
        },
        [],
    );

    const handleSelectPatient = useCallback(
        (patientId: string, checked: boolean) => {
            if (checked) {
                setSelectedPatients((prev) => [...prev, patientId]);
            } else {
                setSelectedPatients((prev) =>
                    prev.filter((id) => id !== patientId),
                );
            }
        },
        [],
    );

    const user = useAuthStore((state) => state.user);
    const {
        data: { data: patients = [], pagination = null } = {},
        isLoading,
        isError,
    } = useGetDoctorsPatients(
        user?.clinic_assignments?.[0]?.clinic_id ||
            user?.doctor_clinics?.[0]?.clinic_id,
        {
            page,
            limit: 10,
            search: debouncedSearch,
            ...filters,
        },
    );

    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        if (pagination?.totalResults !== undefined) {
            setTotalCount(pagination.totalResults);
        }
    }, [pagination?.totalResults]);

    return (
        <div className="flex-1 space-y-7 animate-in fade-in duration-500">
            <PatientsHeader />

            <div className="bg-background border border-border/80 rounded-[12px] p-4 sm:p-5 shadow-sm">
                <PatientsToolbar
                    showFilters={showFilters}
                    onToggleFilters={() => setShowFilters(!showFilters)}
                    view={view}
                    onViewChange={setView}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
                {showFilters && (
                    <div className="mt-5 animate-in fade-in slide-in-from-top-2">
                        <PatientsFilters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            doctors={doctors}
                            isLoading={isFiltersLoading}
                        />
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between pt-1">
                <span className="text-[16px] font-bold text-foreground">
                    Patients ({totalCount})
                </span>
                {selectedPatients.length > 0 && (
                    <Button
                        variant="outline"
                        onClick={() => setSelectedPatients([])}
                        className="h-[34px] text-[12px] font-semibold rounded-[6px] px-3 shadow-sm border-border/80 text-foreground/80 hover:text-foreground"
                    >
                        Clear Selection ({selectedPatients.length})
                    </Button>
                )}
            </div>

            {isError ? (
                <DataErrorState
                    title="Failed to load patients"
                    className="mb-4"
                />
            ) : isLoading ? (
                view === "grid" ? (
                    <PatientsGridSkeleton />
                ) : (
                    <PatientsListSkeleton />
                )
            ) : view === "grid" ? (
                <PatientsGridView
                    patients={patients}
                    selectedPatients={selectedPatients}
                    onSelectPatient={handleSelectPatient}
                />
            ) : (
                <PatientsListView
                    patients={patients}
                    selectedPatients={selectedPatients}
                    onSelectAll={(checked: boolean) =>
                        handleSelectAll(checked, patients)
                    }
                    onSelectPatient={handleSelectPatient}
                />
            )}

            <div className="pt-2">
                <PatientsPagination
                    currentPage={pagination?.page || 1}
                    totalPages={pagination?.totalPages || 1}
                    hasNextPage={pagination?.hasNextPage}
                    hasPrevPage={pagination?.hasPrevPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
