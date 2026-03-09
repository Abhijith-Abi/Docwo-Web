"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ScheduleHeader } from "./schedule-header";
import { UpcomingSessionsSection } from "./upcoming-sessions-section";
import { ConsultationToolbar } from "./consultation-toolbar";
import {
    ConsultationFilters,
    ConsultationFiltersType,
} from "./consultation-filters";
import { ConsultationHistoryTable } from "./consultation-history";
import { ConsultationGridView } from "./consultation-grid-view";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth-store";
import {
    useGetConsultationHistory,
    ConsultationHistoryStatus,
} from "@/hooks/api/useGetConsultationHistory";
import { format } from "date-fns";
import { DataErrorState } from "@/components/ui/data-state-view";
import { ConsultationHistorySkeleton } from "./schedule-skeletons";

// ─── Mock Data ─────────────────────────────────────────────────────────────

const MOCK_UPCOMING_SESSIONS = [
    {
        id: "session-1",
        date: new Date().toISOString(),
        start_time: "09:00 AM",
        end_time: "01:00 PM",
        total_patients: 40,
        booked_patients: 32,
        status: "ongoing",
    },
    {
        id: "session-2",
        date: new Date(Date.now() + 86400000).toISOString(),
        start_time: "02:00 PM",
        end_time: "06:00 PM",
        total_patients: 30,
        booked_patients: 15,
        status: "active",
    },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function ScheduleClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ── History table state ──────────────────────────────────────────────────
    const [historyPage, setHistoryPage] = useState(
        Number(searchParams.get("page")) || 1,
    );
    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filters, setFilters] = useState<ConsultationFiltersType>({
        date: undefined,
        status: "all",
    });

    const user = useAuthStore((state) => state.user);
    const doctorId = user?.doctor_profile?.doctor_id;
    const clinicId = user?.doctor_clinics?.[0]?.clinic_id;

    const queryStatus =
        filters.status !== "all"
            ? (filters.status as ConsultationHistoryStatus)
            : undefined;

    const queryDate = filters.date
        ? format(filters.date, "yyyy-MM-dd")
        : undefined;

    const {
        data: { data: history = [], pagination } = {},
        isLoading: isHistoryLoading,
        isError: isHistoryError,
    } = useGetConsultationHistory({
        page: historyPage,
        limit: 10,
        status: queryStatus,
        date: queryDate,
        doctorId: doctorId?.toString(),
        clinicId: clinicId?.toString(),
    });

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => {
            if (debouncedSearch !== searchQuery) {
                setDebouncedSearch(searchQuery);
                setHistoryPage(1);
            }
        }, 500);
        return () => clearTimeout(t);
    }, [searchQuery, debouncedSearch]);

    // Sync page from URL
    useEffect(() => {
        setHistoryPage(Number(searchParams.get("page")) || 1);
    }, [searchParams]);

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleFilterChange = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (key: keyof ConsultationFiltersType, value: any) => {
            setFilters((prev) => ({ ...prev, [key]: value }));
            setHistoryPage(1);
        },
        [],
    );

    const handlePageChange = useCallback(
        (newPage: number) => {
            setHistoryPage(newPage);
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", newPage.toString());
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [pathname, router, searchParams],
    );

    const totalCount = pagination?.totalResults || 0;

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="flex-1 space-y-8 animate-in fade-in duration-500">
            {/* Page header */}
            <ScheduleHeader />

            {/* ── Upcoming Sessions ────────────────────────────────────────── */}
            <UpcomingSessionsSection
                sessions={MOCK_UPCOMING_SESSIONS}
                isLoading={false}
                isError={false}
                onViewSlots={(s) => console.log("slots:", s?.id)}
                onEdit={(s) => console.log("edit:", s?.id)}
            />

            <Separator className="bg-border/50" />

            {/* ── Consultation History ──────────────────────────────────────── */}
            <section className="flex flex-col gap-5">
                {/* Toolbar (search + filter toggle) */}
                <div className="bg-background border border-border/80 rounded-[12px] p-4 sm:p-5 shadow-sm">
                    <ConsultationToolbar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        showFilters={showFilters}
                        onToggleFilters={() => setShowFilters((v) => !v)}
                        view={view}
                        onViewChange={setView}
                        onExport={() => console.log("Export triggered")}
                    />

                    {/* Expandable filter panel */}
                    {showFilters && (
                        <div className="mt-5 animate-in fade-in slide-in-from-top-2">
                            <ConsultationFilters
                                filters={filters}
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                    )}
                </div>

                {/* Table or Grid */}
                {isHistoryError ? (
                    <DataErrorState
                        title="Failed to load consultation history"
                        className="my-4"
                    />
                ) : isHistoryLoading ? (
                    <ConsultationHistorySkeleton />
                ) : view === "list" ? (
                    <ConsultationHistoryTable
                        appointments={history}
                        pagination={pagination}
                        currentPage={historyPage}
                        onPageChange={handlePageChange}
                        totalCount={totalCount}
                        onViewDetails={(apt) =>
                            console.log("details:", apt?.date)
                        }
                    />
                ) : (
                    <ConsultationGridView
                        appointments={history}
                        pagination={pagination}
                        currentPage={historyPage}
                        onPageChange={handlePageChange}
                        totalCount={totalCount}
                        onViewDetails={(apt) =>
                            console.log("details:", apt?.date)
                        }
                    />
                )}
            </section>
        </div>
    );
}
