import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface DoctorPortalFiltersType {
    doctorId: string;
    gender: string;
    age: string;
}

interface AppointmentsFiltersProps {
    filters: DoctorPortalFiltersType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilterChange: (key: keyof DoctorPortalFiltersType, value: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                <Label className="text-xs font-semibold px-1">Doctor</Label>
                <Select
                    value={filters.doctorId}
                    onValueChange={(val) => onFilterChange("doctorId", val)}
                    disabled={isLoading}
                >
                    <SelectTrigger className="w-full bg-muted/30 border-none h-10 shadow-sm">
                        <SelectValue
                            placeholder={
                                isLoading ? "Loading..." : "All Doctors"
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
                <Label className="text-xs font-semibold px-1">Gender</Label>
                <Select
                    value={filters.gender}
                    onValueChange={(val) => onFilterChange("gender", val)}
                >
                    <SelectTrigger className="w-full bg-muted/30 border-none h-10 shadow-sm">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Age</Label>
                <Select
                    value={filters.age}
                    onValueChange={(val) => onFilterChange("age", val)}
                >
                    <SelectTrigger className="w-full bg-muted/30 border-none h-10 shadow-sm">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="under_18">Under 18</SelectItem>
                        <SelectItem value="18_30">18 - 30</SelectItem>
                        <SelectItem value="31_50">31 - 50</SelectItem>
                        <SelectItem value="above_50">Above 50</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
