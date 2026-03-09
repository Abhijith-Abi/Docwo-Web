import TodaysAppointments from "@/app/(dashboard)/doctor-portal/_components/TodaysAppointments";
import NextAppointment from "@/app/(dashboard)/doctor-portal/_components/NextAppointment";
import WeeklyOverview from "@/app/(dashboard)/doctor-portal/_components/WeeklyOverview";
import CalendarQuickView from "@/app/(dashboard)/doctor-portal/_components/CalendarQuickView";

export default function DoctorDashboard() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="h-full w-full">
                    <TodaysAppointments />
                </div>
            </div>

            <div className="space-y-6">
                <NextAppointment />
                <WeeklyOverview />

                <CalendarQuickView />
            </div>
        </div>
    );
}
