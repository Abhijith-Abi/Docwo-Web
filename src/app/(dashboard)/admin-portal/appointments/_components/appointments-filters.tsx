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

export function AppointmentsFilters() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-between bg-muted/30 border-none h-10 shadow-sm font-normal text-muted-foreground"
                        >
                            DD/MM/YYY
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" initialFocus />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Doctors</Label>
                <Select defaultValue="all">
                    <SelectTrigger className="w-full bg-muted/30 border-none h-10 shadow-sm">
                        <SelectValue placeholder="Doctor Name" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">Doctor Name</SelectItem>
                        <SelectItem value="dr_suresh">
                            Dr. Suresh Varma
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Status</Label>
                <Select defaultValue="all">
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
