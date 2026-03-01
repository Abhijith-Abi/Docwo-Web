"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AppointmentsHeader } from "./appointments-header";
import { AppointmentsToolbar } from "./appointments-toolbar";
import { AppointmentsFilters } from "./appointments-filters";
import { AppointmentsStats } from "./appointments-stats";
import { AppointmentsListView } from "./appointments-list-view";
import { AppointmentsGridView } from "./appointments-grid-view";
import { AppointmentsPagination } from "./appointments-pagination";
import {
    AppointmentsGridSkeleton,
    AppointmentsListSkeleton,
} from "./appointments-skeleton";
import { useAuthStore } from "@/store/auth-store";
import { useGetClinicAppointments } from "@/hooks/api/useGetClinicAppointments";
import { useGetAnalyticsFilters } from "@/hooks/api/useGetAnalyticsFilters";
import { useGetAppointmentSummary } from "@/hooks/api/useGetAppointmentSummary";
import { format } from "date-fns";
import { DataErrorState } from "@/components/ui/data-state-view";

export function AppointmentsClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);

    const { data: filterOptions, isLoading: isFiltersLoading } =
        useGetAnalyticsFilters();
    const doctors =
        filterOptions?.data?.doctors || filterOptions?.doctors || [];

    // Search and filters state
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filters, setFilters] = useState<{
        date: Date | undefined;
        doctorId: string;
        status: string;
    }>({
        date: undefined,
        doctorId: "all",
        status: "all",
    });

    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const [page, setPage] = useState(pageFromUrl);

    // Handle debouncing search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (debouncedSearch !== searchQuery) {
                setDebouncedSearch(searchQuery);
                setPage(1);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, debouncedSearch]);

    const handleFilterChange = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (key: keyof typeof filters, value: any) => {
            setFilters((prev) => ({ ...prev, [key]: value }));
            setPage(1);
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

    const user = useAuthStore((state) => state.user);
    const clinicId = user?.clinic_assignments?.[0]?.clinic_id;

    const {
        data: { data: appointments = [], pagination = null } = {},
        isLoading: isAppointmentsLoading,
        isError: isAppointmentsError,
    } = useGetClinicAppointments(clinicId, {
        page,
        limit: 10,
        search: debouncedSearch,
        doctorId: filters.doctorId,
        status: filters.status,
        date: filters.date ? format(filters.date, "yyyy-MM-dd") : undefined,
    });

    const { data: statsData, isLoading: isStatsLoading } =
        useGetAppointmentSummary({
            doctorId: filters.doctorId,
            status: filters.status,
            date: filters.date ? format(filters.date, "yyyy-MM-dd") : undefined,
        });

    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        if (pagination?.totalResults !== undefined) {
            setTotalCount(pagination.totalResults);
        }
    }, [pagination?.totalResults]);

    return (
        <div className="flex-1 space-y-7 animate-in fade-in duration-500">
            <AppointmentsHeader />
            <div className="bg-background border border-border/80 rounded-[12px] p-4 sm:p-5 shadow-sm">
                <AppointmentsToolbar
                    showFilters={showFilters}
                    onToggleFilters={() => setShowFilters(!showFilters)}
                    view={view}
                    onViewChange={setView}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
                {showFilters && (
                    <div className="mt-5 animate-in fade-in slide-in-from-top-2">
                        <AppointmentsFilters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            doctors={doctors}
                            isLoading={isFiltersLoading}
                        />
                    </div>
                )}
            </div>

            <AppointmentsStats
                data={statsData?.summary || statsData}
                isLoading={isStatsLoading}
            />
            <div className="flex items-center justify-between pt-1">
                <span className="text-[16px] font-semibold text-foreground">
                    Appointments ({totalCount})
                </span>
            </div>

            {isAppointmentsError ? (
                <DataErrorState
                    title="Failed to load appointments"
                    className="mb-4"
                />
            ) : isAppointmentsLoading ? (
                view === "grid" ? (
                    <AppointmentsGridSkeleton />
                ) : (
                    <AppointmentsListSkeleton />
                )
            ) : view === "grid" ? (
                <AppointmentsGridView appointments={appointments} />
            ) : (
                <AppointmentsListView appointments={appointments} />
            )}
            <div className="pt-2">
                <AppointmentsPagination
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
