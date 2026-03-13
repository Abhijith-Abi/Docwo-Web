"use client";

import React, { useState, useMemo } from "react";
import SessionStats from "./session-stats";
import AppointmentCarousel from "./appointment-cards";
import TotalBookingsListView from "./total-bookings-table";
import { TotalBookingsGridView } from "./total-bookings-grid-view";
import { TotalBookingsToolbar } from "./total-bookings-toolbar";
import {
    TotalBookingsFilters,
    SessionsFiltersType,
} from "./total-bookings-filters";
import { SharedPagination } from "@/components/customize-components/shared-pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock } from "lucide-react";

const bookingsData = [
    {
        id: 1,
        time: "09:00 AM - 09:15 AM",
        token: "01",
        name: "Ajmal Ashrudehhen",
        patientId: "PD1224",
        age: 23,
        gender: "M",
        phone: "+91 9765874609",
        email: "loremipsum23@gmail.com",
        status: "Completed",
        doctorId: "dr_ajmal",
        date: new Date(2025, 6, 9),
    },
    {
        id: 2,
        time: "09:00 AM - 09:15 AM",
        token: "02",
        name: "Sarah Smith",
        patientId: "PD1225",
        age: 34,
        gender: "F",
        phone: "+91 9765874610",
        email: "sarah@gmail.com",
        status: "Upcoming",
        doctorId: "dr_sarah",
        date: new Date(2025, 6, 9),
    },
    {
        id: 3,
        time: "09:00 AM - 09:15 AM",
        token: "03",
        name: "Michael Roe",
        patientId: "PD1226",
        age: 45,
        gender: "M",
        phone: "+91 9765874611",
        email: "michael@gmail.com",
        status: "Skip",
        doctorId: "dr_michael",
        date: new Date(2025, 6, 9),
    },
    {
        id: 4,
        time: "09:00 AM - 09:15 AM",
        token: "04",
        name: "Kevin Varkey",
        patientId: "PD1227",
        age: 17,
        gender: "M",
        phone: "+91 9765874612",
        email: "kevin@gmail.com",
        status: "Skip",
        doctorId: "dr_ajmal",
        date: new Date(2025, 6, 10),
    },
    {
        id: 5,
        time: "09:00 AM - 09:15 AM",
        token: "05",
        name: "Julie Anna",
        patientId: "PD1228",
        age: 29,
        gender: "F",
        phone: "+91 9765874613",
        email: "julie@gmail.com",
        status: "Completed",
        doctorId: "dr_sarah",
        date: new Date(2025, 6, 10),
    },
    {
        id: 6,
        time: "09:00 AM - 09:15 AM",
        token: "06",
        name: "Robert Fox",
        patientId: "PD1229",
        age: 55,
        gender: "M",
        phone: "+91 9765874614",
        email: "robert@gmail.com",
        status: "Completed",
        doctorId: "dr_michael",
        date: new Date(2025, 6, 11),
    },
    {
        id: 7,
        time: "09:00 AM - 09:15 AM",
        token: "07",
        name: "Emma Watson",
        patientId: "PD1230",
        age: 31,
        gender: "F",
        phone: "+91 9765874615",
        email: "emma@gmail.com",
        status: "Upcoming",
        doctorId: "dr_ajmal",
        date: new Date(2025, 6, 11),
    },
    {
        id: 8,
        time: "09:00 AM - 09:15 AM",
        token: "08",
        name: "Chris Evans",
        patientId: "PD1231",
        age: 40,
        gender: "M",
        phone: "+91 9765874616",
        email: "chris@gmail.com",
        status: "Upcoming",
        doctorId: "dr_sarah",
        date: new Date(2025, 6, 12),
    },
];

export default function SessionsClient() {
    const [view, setView] = useState<"list" | "grid">("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<SessionsFiltersType>({
        status: "all",
        gender: "all",
        age: "all",
        doctor: "all",
        date: undefined,
    });

    const handleFilterChange = (key: keyof SessionsFiltersType, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const filteredBookings = useMemo(() => {
        return bookingsData.filter((booking) => {
            // Search filter
            const matchesSearch =
                booking.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                booking.patientId
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                booking.phone.includes(searchQuery);

            if (!matchesSearch) return false;

            // Status filter
            if (
                filters.status !== "all" &&
                booking.status.toLowerCase() !== filters.status.toLowerCase()
            ) {
                return false;
            }

            // Doctor filter
            if (
                filters.doctor !== "all" &&
                booking.doctorId !== filters.doctor
            ) {
                return false;
            }

            // Age filter
            if (filters.age !== "all") {
                const age = booking.age;
                if (filters.age === "under_18" && age >= 18) return false;
                if (filters.age === "18_30" && (age < 18 || age > 30))
                    return false;
                if (filters.age === "31_50" && (age < 31 || age > 50))
                    return false;
                if (filters.age === "above_50" && age <= 50) return false;
            }

            // Date filter
            if (filters.date) {
                const bookingDate = booking.date;
                if (
                    bookingDate.getDate() !== filters.date.getDate() ||
                    bookingDate.getMonth() !== filters.date.getMonth() ||
                    bookingDate.getFullYear() !== filters.date.getFullYear()
                ) {
                    return false;
                }
            }

            return true;
        });
    }, [searchQuery, filters]);

    return (
        <div className="space-y-8 pb-10">
            {/* Header / Sub-header Section */}

            {/* Session Overview */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 px-1">
                    Session Overview
                </h2>
                <SessionStats />
            </section>

            {/* Appointment Status / Carousel */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 px-1">
                    Appointment Status
                </h2>
                <AppointmentCarousel />
            </section>

            {/* Total Bookings Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-xl font-bold text-gray-900">
                        Total Bookings ({filteredBookings.length})
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

                {view === "list" ? (
                    <TotalBookingsListView bookings={filteredBookings} />
                ) : (
                    <TotalBookingsGridView bookings={filteredBookings} />
                )}

                <div className="flex justify-center w-full mt-6">
                    <SharedPagination
                        currentPage={currentPage}
                        totalPages={12}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </section>
        </div>
    );
}
