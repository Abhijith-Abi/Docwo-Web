"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AppointmentsHeader } from "./appointments-header";
import { AppointmentsToolbar } from "./appointments-toolbar";
import {
    AppointmentsFilters,
    DoctorPortalFiltersType,
} from "./appointments-filters";
import { AppointmentsListView } from "./appointments-list-view";
import { AppointmentsGridView } from "./appointments-grid-view";
import { AppointmentsPagination } from "./appointments-pagination";
import {
    AppointmentsGridSkeleton,
    AppointmentsListSkeleton,
} from "./appointments-skeleton";
import { useAuthStore } from "@/store/auth-store";
import { useGetDoctorAppointments } from "@/hooks/api/useGetDoctorAppointments";
import { DataErrorState } from "@/components/ui/data-state-view";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AppointmentsClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState<"previous" | "future">(
        "previous",
    );

    // Search and filters state
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filters, setFilters] = useState<DoctorPortalFiltersType>({
        status: "all",
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
                setPage(1);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, debouncedSearch]);

    const handleFilterChange = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (key: keyof DoctorPortalFiltersType, value: any) => {
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
    const doctorId = user?.doctor_profile?.doctor_id?.toString();

    const timeFilter = activeTab === "previous" ? "previous" : "future";

    const {
        data: { data: appointments = [], pagination = null } = {},
        isLoading: isAppointmentsLoading,
        isError: isAppointmentsError,
    } = useGetDoctorAppointments(doctorId, {
        page,
        limit: 10,
        search: debouncedSearch,
        status: filters.status !== "all" ? filters.status : undefined,
        time: timeFilter,
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
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <Tabs
                    value={activeTab}
                    onValueChange={(v) => {
                        setActiveTab(v as "previous" | "future");
                        setPage(1);
                    }}
                    className="w-full"
                >
                    <div className="bg-muted/40 p-1.5 rounded-[12px] w-full border shadow-sm overflow-x-auto no-scrollbar">
                        <TabsList className="w-full min-w-[340px] h-10 bg-transparent p-0 justify-start gap-2 flex">
                            <TabsTrigger
                                value="previous"
                                className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm text-[13px] font-semibold h-full rounded-md text-muted-foreground data-[state=active]:text-foreground transition-all"
                            >
                                Previous Appointments
                            </TabsTrigger>
                            <TabsTrigger
                                value="future"
                                className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm text-[13px] font-semibold h-full rounded-md text-muted-foreground data-[state=active]:text-foreground transition-all"
                            >
                                Future Appointments
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </Tabs>

                <div className="flex flex-col gap-0">
                    <div className="flex items-center justify-between pb-2 pl-1">
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
                </div>
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
        </div>
    );
}
