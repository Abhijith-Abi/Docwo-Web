"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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
    source?: string;
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
    const sources =
        filterOptions?.data?.sources || filterOptions?.sources || [];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-white rounded-xl shadow-sm border border-slate-100 mb-6 transition-all duration-300">
            {/* Date Filter */}
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-900">
                    Date
                </label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-between h-10 px-3 text-left font-normal border-slate-200 bg-slate-50 shadow-none hover:bg-slate-100 hover:text-slate-900 text-sm",
                                !filters.date
                                    ? "text-slate-500"
                                    : "text-slate-900",
                            )}
                        >
                            <span className="truncate">
                                {filters.date
                                    ? format(filters.date, "dd/MM/yyyy")
                                    : "DD/MM/YYYY"}
                            </span>
                            <CalendarIcon className="h-4 w-4 text-slate-600 opacity-70" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={filters.date}
                            onSelect={(date) =>
                                onFilterChange({ ...filters, date })
                            }
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Doctors Filter */}
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-900">
                    Doctors
                </label>
                <Select
                    value={filters.doctor || "all"}
                    onValueChange={(doctor) =>
                        onFilterChange({ ...filters, doctor })
                    }
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
                    value={filters.source || "all"}
                    onValueChange={(source) =>
                        onFilterChange({ ...filters, source })
                    }
                >
                    <SelectTrigger className="w-full h-10 bg-slate-50 border-slate-200 shadow-none text-slate-600 font-medium">
                        <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="docwo">Docwo app</SelectItem>
                        <SelectItem value="web">Website</SelectItem>
                        <SelectItem value="walk-in">Walk-in</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
