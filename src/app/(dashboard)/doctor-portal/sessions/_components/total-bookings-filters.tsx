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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top-2 fade-in duration-300">
            {/* Date Filter */}
            <div className="flex flex-col gap-2.5">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Date</Label>
                <div className="relative">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full h-10 justify-between shadow-sm font-semibold border-border/80 hover:bg-muted/50 transition-all rounded-md",
                                    filters.date
                                        ? "text-foreground pr-8"
                                        : "text-muted-foreground/70",
                                )}
                            >
                                <span className="truncate flex-1 text-left">
                                    {filters.date
                                        ? format(filters.date, "PPP")
                                        : "Select Date"}
                                </span>
                                <CalendarIcon className="h-4 w-4 opacity-40 shrink-0 ml-2 text-primary" strokeWidth={2.5} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 rounded-xl shadow-xl border-border/50" align="start">
                            <Calendar
                                mode="single"
                                selected={filters.date}
                                onSelect={(date) =>
                                    onFilterChange("date", date)
                                }
                                initialFocus
                                className="rounded-xl"
                            />
                        </PopoverContent>
                    </Popover>
                    {filters.date && (
                        <div
                            className="absolute right-9 top-1/2 -translate-y-1/2 p-1.5 cursor-pointer hover:bg-muted rounded-md z-10 text-muted-foreground hover:text-foreground transition-all"
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
            <div className="flex flex-col gap-2.5">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Age Range</Label>
                <Select
                    value={filters.age}
                    onValueChange={(val) => onFilterChange("age", val)}
                >
                    <SelectTrigger className="w-full h-10 shadow-sm border-border/80 hover:bg-muted/50 font-semibold rounded-md transition-all">
                        <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-xl border-border/50" position="popper" sideOffset={8}>
                        <SelectItem value="all" className="font-medium">All Ages</SelectItem>
                        <SelectItem value="under_18" className="font-medium">Under 18</SelectItem>
                        <SelectItem value="18_30" className="font-medium">18 - 30</SelectItem>
                        <SelectItem value="31_50" className="font-medium">31 - 50</SelectItem>
                        <SelectItem value="above_50" className="font-medium">Above 50</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col gap-2.5">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Status</Label>
                <Select
                    value={filters.status}
                    onValueChange={(val) => onFilterChange("status", val)}
                >
                    <SelectTrigger className="w-full h-10 shadow-sm border-border/80 hover:bg-muted/50 font-semibold rounded-md transition-all">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-xl border-border/50" position="popper" sideOffset={8}>
                        <SelectItem value="all" className="font-medium">All Statuses</SelectItem>
                        <SelectItem value="completed" className="font-medium">Completed</SelectItem>
                        <SelectItem value="upcoming" className="font-medium">Upcoming</SelectItem>
                        <SelectItem value="skip" className="font-medium">Skip</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
