import { AppointmentCard } from "./appointment-card";
import { Appointment } from "./data";

export function AppointmentsGridView({
    appointments,
}: {
    appointments: Appointment[];
}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6 pt-2 animate-in fade-in duration-300">
            {appointments.map((appointment, index) => (
                <AppointmentCard
                    key={`grid-${appointment.id}-${index}`}
                    appointment={appointment}
                />
            ))}
        </div>
    );
}
