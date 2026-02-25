"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetAnalyticsFilters } from "@/hooks/api/useGetAnalyticsFilters";

export interface FilterState {
    date?: Date;
    doctor?: string;
    booking_source?: string;
    doctorId?: string;
    startDate?: string;
    endDate?: string;
}

export function DashboardFilters({
    filters,
    onFilterChange,
}: {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}) {
    const { data: filterOptions, isLoading } = useGetAnalyticsFilters();

    const doctors =
        filterOptions?.data?.doctors || filterOptions?.doctors || [];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-white rounded-xl shadow-sm border border-slate-100 mb-6 transition-all duration-300">
            {/* Date Filter */}
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-900">
                    Date Range
                </label>
                <div className="relative">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-between h-10 px-3 text-left font-normal border-slate-200 bg-slate-50 shadow-none hover:bg-slate-100 hover:text-slate-900 text-sm",
                                    !filters.startDate
                                        ? "text-slate-500"
                                        : "text-slate-900",
                                )}
                            >
                                <span className="truncate pr-6">
                                    {filters.startDate ? (
                                        filters.endDate ? (
                                            <>
                                                {format(
                                                    new Date(
                                                        filters.startDate +
                                                            "T00:00:00",
                                                    ),
                                                    "dd/MM/yyyy",
                                                )}{" "}
                                                -{" "}
                                                {format(
                                                    new Date(
                                                        filters.endDate +
                                                            "T00:00:00",
                                                    ),
                                                    "dd/MM/yyyy",
                                                )}
                                            </>
                                        ) : (
                                            format(
                                                new Date(
                                                    filters.startDate +
                                                        "T00:00:00",
                                                ),
                                                "dd/MM/yyyy",
                                            )
                                        )
                                    ) : (
                                        "DD/MM/YYYY - DD/MM/YYYY"
                                    )}
                                </span>
                                <CalendarIcon className="h-4 w-4 text-slate-600 opacity-70" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="range"
                                defaultMonth={
                                    filters.startDate
                                        ? new Date(
                                              filters.startDate + "T00:00:00",
                                          )
                                        : undefined
                                }
                                selected={{
                                    from: filters.startDate
                                        ? new Date(
                                              filters.startDate + "T00:00:00",
                                          )
                                        : undefined,
                                    to: filters.endDate
                                        ? new Date(
                                              filters.endDate + "T00:00:00",
                                          )
                                        : undefined,
                                }}
                                onSelect={(range) => {
                                    const start = range?.from
                                        ? format(range.from, "yyyy-MM-dd")
                                        : "";
                                    let end = range?.to
                                        ? format(range.to, "yyyy-MM-dd")
                                        : "";
                                    if (start === end) {
                                        end = "";
                                    }
                                    onFilterChange({
                                        ...filters,
                                        startDate: start,
                                        endDate: end,
                                    });
                                }}
                                numberOfMonths={2}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {filters.startDate && (
                        <div
                            className="absolute right-9 top-1/2 -translate-y-1/2 cursor-pointer z-10 flex items-center justify-center p-1"
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onFilterChange({
                                    ...filters,
                                    startDate: "",
                                    endDate: "",
                                });
                            }}
                        >
                            <X className="h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors" />
                        </div>
                    )}
                </div>
            </div>

            {/* Doctors Filter */}
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-900">
                    Doctors
                </label>
                <Select
                    value={filters.doctorId || "all"}
                    onValueChange={(doctorId) => {
                        if (doctorId === "all") {
                            onFilterChange({ ...filters, doctorId: "" });
                        } else {
                            onFilterChange({ ...filters, doctorId });
                        }
                    }}
                    disabled={isLoading}
                >
                    <SelectTrigger className="w-full h-10 bg-slate-50 border-slate-200 shadow-none text-slate-600 font-medium">
                        <SelectValue
                            placeholder={
                                isLoading ? "Loading..." : "Select Doctor"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="all">All Doctors</SelectItem>
                        {Array.isArray(doctors) &&
                            doctors.map((doc: any) => (
                                <SelectItem
                                    key={doc.id || doc._id || doc.value}
                                    value={
                                        doc.id ||
                                        doc._id ||
                                        doc.value ||
                                        doc.name
                                    }
                                >
                                    {doc.name ||
                                        doc.label ||
                                        (doc.profile
                                            ? `${doc.profile.firstName} ${doc.profile.lastName}`
                                            : "Unknown Doctor")}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Sources Filter */}
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-900">
                    Sources
                </label>
                <Select
                    value={filters.booking_source || "all"}
                    onValueChange={(value) => {
                        if (value === "all") {
                            onFilterChange({ ...filters, booking_source: "" });
                        } else {
                            onFilterChange({
                                ...filters,
                                booking_source: value,
                            });
                        }
                    }}
                >
                    <SelectTrigger className="w-full h-10 bg-slate-50 border-slate-200 shadow-none text-slate-600 font-medium">
                        <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="mobile_app">Mobile App</SelectItem>
                        <SelectItem value="clinic_staff">
                            Clinic Staff
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
