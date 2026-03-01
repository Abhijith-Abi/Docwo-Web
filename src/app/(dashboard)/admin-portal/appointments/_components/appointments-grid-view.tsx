import { AppointmentCard } from "./appointment-card";
import { Clock } from "lucide-react";

export function AppointmentsGridView({
    appointments,
}: {
    appointments?: any[];
}) {
    if (!appointments || appointments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-card rounded-[10px] border border-border/60 shadow-sm mt-3 animate-in fade-in duration-300">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Clock
                        className="h-6 w-6 text-muted-foreground"
                        strokeWidth={1.5}
                    />
                </div>
                <span className="text-[15px] font-semibold text-foreground mb-1">
                    No appointments found
                </span>
                <span className="text-[13px] text-muted-foreground  text-center">
                    We couldn't find any appointments matching your current
                    filters.
                </span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6 pt-2 animate-in fade-in duration-300">
            {appointments.map((appointment, index) => (
                <AppointmentCard
                    key={`grid-${appointment?.appointment_id || index}-${index}`}
                    appointment={appointment}
                />
            ))}
        </div>
    );
}
