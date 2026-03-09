import { CalendarClock } from "lucide-react";

export function ScheduleHeader() {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-[#0E8A63]" />
                <h1 className="text-xl font-bold text-foreground tracking-tight">
                    Schedule Activation
                </h1>
            </div>
            <p className="text-sm text-muted-foreground pl-7">
                Activate your scheduled sessions to allow patients to join
                online consultations.
            </p>
        </div>
    );
}
