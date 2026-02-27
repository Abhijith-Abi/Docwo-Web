import { Calendar, CheckCheck, Clock, UserPlus } from "lucide-react";

interface AppointmentsStatsProps {
    data?: any;
    isLoading?: boolean;
}

export function AppointmentsStats({ data, isLoading }: AppointmentsStatsProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm animate-pulse"
                    >
                        <div className="space-y-2">
                            <div className="h-4 w-20 bg-muted rounded"></div>
                            <div className="h-8 w-12 bg-muted rounded"></div>
                        </div>
                        <div className="h-6 w-6 bg-muted rounded-full"></div>
                    </div>
                ))}
            </div>
        );
    }

    const total = data?.total ?? 0;
    const completed = data?.completed ?? 0;
    const newPatients = data?.new_patient_reg ?? 0;
    const revisit = data?.revisit ?? 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-sm font-medium text-foreground/80 mb-1">
                        Total
                    </p>
                    <p className="text-2xl font-bold">{total}</p>
                </div>
                <Calendar className="h-6 w-6 text-foreground/80" />
            </div>

            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-sm font-medium text-foreground/80 mb-1">
                        Completed
                    </p>
                    <p className="text-2xl font-bold text-emerald-500">
                        {completed}
                    </p>
                </div>
                <CheckCheck className="h-6 w-6 text-emerald-500" />
            </div>

            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-sm font-medium text-foreground/80 mb-1">
                        New patient reg
                    </p>
                    <p className="text-2xl font-bold text-blue-500">
                        {newPatients}
                    </p>
                </div>
                <UserPlus className="h-6 w-6 text-blue-500" />
            </div>

            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-sm font-medium text-foreground/80 mb-1">
                        Revisit
                    </p>
                    <p className="text-2xl font-bold text-orange-500">
                        {revisit}
                    </p>
                </div>
                <Clock className="h-6 w-6 text-orange-500" />
            </div>
        </div>
    );
}
