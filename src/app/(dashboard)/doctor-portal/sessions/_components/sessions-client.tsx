"use client";

import React, { useState } from "react";
import SessionStats from "./session-stats";
import AppointmentCarousel from "./appointment-cards";
import TotalBookingsListView from "./total-bookings-table";
import { TotalBookingsGridView } from "./total-bookings-grid-view";
import { TotalBookingsToolbar } from "./total-bookings-toolbar";
import { TotalBookingsFilters, SessionsFiltersType } from "./total-bookings-filters";
import { SharedPagination } from "@/components/customize-components/shared-pagination";
import { useAuthStore } from "@/store/auth-store";
import { useGetDoctorAppointments } from "@/hooks/api/useGetDoctorAppointments";
import { format } from "date-fns";
import { UpcomingSessionsSkeleton } from "../../schedule/_components/schedule-skeletons";
import { DataErrorState } from "@/components/ui/data-state-view";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock } from "lucide-react";

export default function SessionsClient() {
    const [view, setView] = useState<"list" | "grid">("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<SessionsFiltersType>({
        status: "all",
        gender: "all",
        age: "all",
        date: undefined,
    });

    const user = useAuthStore((state) => state.user);
    const doctorId = user?.doctor_profile?.doctor_id;

    const {
        data: appointmentsResponse,
        isLoading,
        isError,
    } = useGetDoctorAppointments(doctorId, {
        page: currentPage,
        limit: 10,
        search: searchQuery,
        status: filters.status,
        gender: filters.gender,
        age: filters.age,
        date: filters.date ? format(filters.date, "yyyy-MM-dd") : undefined,
    });

    const bookings = appointmentsResponse?.data || [];
    const pagination = appointmentsResponse?.pagination;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFilterChange = (key: keyof SessionsFiltersType, value: any) => {
        setFilters((prev: SessionsFiltersType) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const totalBookingsCount = pagination?.totalResults || 0;

    return (
        <div className="space-y-8 pb-10">
            {/* Header / Sub-header Section */}

            {/* Session Overview */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground tracking-tight">
                    Session Overview
                </h2>
                <SessionStats />
            </section>

            {/* Appointment Status / Carousel */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground tracking-tight">
                    Appointment Status
                </h2>
                <AppointmentCarousel />
            </section>

            {/* Total Bookings Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground tracking-tight">
                        Total Bookings ({totalBookingsCount})
                    </h2>
                </div>

                <div className="bg-background border border-border/80 rounded-[12px] p-4 sm:p-5 shadow-sm">
                    <TotalBookingsToolbar
                        view={view}
                        onViewChange={setView}
                        showFilters={showFilters}
                        onToggleFilters={() => setShowFilters(!showFilters)}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />

                    {showFilters && (
                        <div className="mt-4 border-t pt-4">
                            <TotalBookingsFilters
                                filters={filters}
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                    )}
                </div>

                {isError ? (
                    <DataErrorState
                        title="Failed to load bookings"
                        className="my-10"
                    />
                ) : isLoading ? (
                    <div className="flex flex-col gap-4">
                        <UpcomingSessionsSkeleton />
                    </div>
                ) : (
                    <>
                        {view === "list" ? (
                            <TotalBookingsListView bookings={bookings} />
                        ) : (
                            <TotalBookingsGridView bookings={bookings} />
                        )}

                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center w-full mt-6">
                                <SharedPagination
                                    currentPage={currentPage}
                                    totalPages={pagination.totalPages}
                                    onPageChange={setCurrentPage}
                                    hasNextPage={pagination.hasNextPage}
                                    hasPrevPage={pagination.hasPrevPage}
                                />
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
