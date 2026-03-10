"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SessionsFiltersType {
    status: string;
    gender: string;
    age: string;
    doctor: string;
    date: Date | undefined;
}

interface TotalBookingsFiltersProps {
    filters: SessionsFiltersType;
    onFilterChange: (key: keyof SessionsFiltersType, value: any) => void;
}

export function TotalBookingsFilters({
    filters,
    onFilterChange,
}: TotalBookingsFiltersProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-2 animate-in slide-in-from-top-2 fade-in duration-200">
            {/* Date Filter */}
            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Date</Label>
                <div className="relative">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-between shadow-sm font-normal",
                                    filters.date
                                        ? "text-foreground font-medium pr-8"
                                        : "text-muted-foreground",
                                )}
                            >
                                <span className="truncate flex-1 text-left">
                                    {filters.date
                                        ? format(filters.date, "PPP")
                                        : "Select Date"}
                                </span>
                                <CalendarIcon className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={filters.date}
                                onSelect={(date) =>
                                    onFilterChange("date", date)
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {filters.date && (
                        <div
                            className="absolute right-9 top-1/2 -translate-y-1/2 p-1 cursor-pointer hover:bg-muted rounded-md z-10 text-muted-foreground hover:text-foreground"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onFilterChange("date", undefined);
                            }}
                        >
                            <X className="h-3.5 w-3.5" />
                        </div>
                    )}
                </div>
            </div>

            {/* Age Filter */}
            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Age Range</Label>
                <Select
                    value={filters.age}
                    onValueChange={(val) => onFilterChange("age", val)}
                >
                    <SelectTrigger className="w-full h-10 shadow-sm">
                        <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">All Ages</SelectItem>
                        <SelectItem value="under_18">Under 18</SelectItem>
                        <SelectItem value="18_30">18 - 30</SelectItem>
                        <SelectItem value="31_50">31 - 50</SelectItem>
                        <SelectItem value="above_50">Above 50</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Doctor Filter */}
            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Doctor</Label>
                <Select
                    value={filters.doctor}
                    onValueChange={(val) => onFilterChange("doctor", val)}
                >
                    <SelectTrigger className="w-full h-10 shadow-sm">
                        <SelectValue placeholder="All Doctors" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">All Doctors</SelectItem>
                        <SelectItem value="dr_ajmal">
                            Dr. Ajmal Ashrudehhen
                        </SelectItem>
                        <SelectItem value="dr_sarah">
                            Dr. Sarah Johnson
                        </SelectItem>
                        <SelectItem value="dr_michael">
                            Dr. Michael Chen
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Status</Label>
                <Select
                    value={filters.status}
                    onValueChange={(val) => onFilterChange("status", val)}
                >
                    <SelectTrigger className="w-full h-10 shadow-sm">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="skip">Skip</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
