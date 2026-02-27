import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { X } from "lucide-react";

interface FiltersType {
    date: Date | undefined;
    doctorId: string;
    status: string;
}

interface AppointmentsFiltersProps {
    filters: FiltersType;
    onFilterChange: (key: keyof FiltersType, value: any) => void;
    doctors?: any[];
    isLoading?: boolean;
}

export function AppointmentsFilters({
    filters,
    onFilterChange,
    doctors = [],
    isLoading = false,
}: AppointmentsFiltersProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Date</Label>
                <div className="relative">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={`w-full justify-between bg-muted/30 border-none h-10 shadow-sm font-normal ${
                                    filters.date
                                        ? "text-foreground font-medium pr-8"
                                        : "text-muted-foreground"
                                }`}
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

            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Doctors</Label>
                <Select
                    value={filters.doctorId}
                    onValueChange={(val) => onFilterChange("doctorId", val)}
                    disabled={isLoading}
                >
                    <SelectTrigger className="w-full bg-muted/30 border-none h-10 shadow-sm">
                        <SelectValue
                            placeholder={
                                isLoading ? "Loading..." : "Select Doctor"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
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

            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Status</Label>
                <Select
                    value={filters.status}
                    onValueChange={(val) => onFilterChange("status", val)}
                >
                    <SelectTrigger className="w-full bg-muted/30 border-none h-10 shadow-sm">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
