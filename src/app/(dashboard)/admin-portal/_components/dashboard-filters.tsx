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

export function DashboardFilters() {
    const [date, setDate] = React.useState<Date>();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-white rounded-xl shadow-sm border border-slate-100 mb-6">
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
                                !date ? "text-slate-500" : "text-slate-900",
                            )}
                        >
                            <span className="truncate">
                                {date
                                    ? format(date, "dd/MM/yyyy")
                                    : "DD/MM/YYYY"}
                            </span>
                            <CalendarIcon className="h-4 w-4 text-slate-600 opacity-70" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
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
                <Select defaultValue="all">
                    <SelectTrigger className="w-full h-10 bg-slate-50 border-slate-200 shadow-none text-slate-600 font-medium">
                        <SelectValue placeholder="Select Doctor" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="all">All Doctors</SelectItem>
                        <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                        <SelectItem value="dr-jones">Dr. Jones</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Sources Filter */}
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-900">
                    Sources
                </label>
                <Select defaultValue="docwo">
                    <SelectTrigger className="w-full h-10 bg-slate-50 border-slate-200 shadow-none text-slate-600 font-medium">
                        <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="docwo">Docwo app</SelectItem>
                        <SelectItem value="web">Website</SelectItem>
                        <SelectItem value="walk-in">Walk-in</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
