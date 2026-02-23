import { Calendar, CheckCheck, Clock, UserPlus } from "lucide-react";

export function AppointmentsStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-sm font-medium text-foreground/80 mb-1">
                        Total
                    </p>
                    <p className="text-2xl font-bold">6</p>
                </div>
                <Calendar className="h-6 w-6 text-foreground/80" />
            </div>

            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-sm font-medium text-foreground/80 mb-1">
                        Completed
                    </p>
                    <p className="text-2xl font-bold text-emerald-500">1</p>
                </div>
                <CheckCheck className="h-6 w-6 text-emerald-500" />
            </div>

            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-sm font-medium text-foreground/80 mb-1">
                        New patient reg
                    </p>
                    <p className="text-2xl font-bold text-blue-500">1</p>
                </div>
                <UserPlus className="h-6 w-6 text-blue-500" />
            </div>

            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-sm font-medium text-foreground/80 mb-1">
                        Revisit
                    </p>
                    <p className="text-2xl font-bold text-orange-500">1</p>
                </div>
                <Clock className="h-6 w-6 text-orange-500" />
            </div>
        </div>
    );
}
