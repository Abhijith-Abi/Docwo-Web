import { Calendar, CheckCheck, Clock, UserPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DataErrorState,
    DataEmptyState,
} from "@/components/ui/data-state-view";
import { Card, CardContent } from "@/components/ui/card";

interface AppointmentsStatsProps {
    data?: any;
    isLoading?: boolean;
    isError?: boolean;
}

export function AppointmentsStats({
    data,
    isLoading,
    isError,
}: AppointmentsStatsProps) {
    const gridClassName =
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4";

    if (isLoading) {
        return (
            <div className={gridClassName}>
                {[1, 2, 3, 4].map((i) => (
                    <Card
                        key={i}
                        className="shadow-sm border-border/60 rounded-[12px] h-full"
                    >
                        <CardContent className="p-5 flex items-center justify-between h-full">
                            <div className="space-y-2 flex-1 mr-4">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-8 w-12" />
                            </div>
                            <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <DataErrorState
                title="Failed to load appointment stats"
                className="mb-4"
            />
        );
    }

    if (!data || Object.keys(data).length === 0) {
        return (
            <DataEmptyState
                title="No appointment stats available"
                className="mb-4"
            />
        );
    }

    const total = data?.total ?? 0;
    const completed = data?.completed ?? 0;
    const newPatients = data?.new_patient_reg ?? 0;
    const revisit = data?.revisit ?? 0;

    return (
        <div className={gridClassName}>
            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm h-full">
                <div className="min-w-0 flex-1 mr-4">
                    <p className="text-sm font-medium text-foreground/80 mb-1 truncate">
                        Total
                    </p>
                    <p
                        className="text-2xl font-bold truncate"
                        title={total.toString()}
                    >
                        {total}
                    </p>
                </div>
                <Calendar className="h-6 w-6 text-foreground/80 shrink-0" />
            </div>

            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm h-full">
                <div className="min-w-0 flex-1 mr-4">
                    <p className="text-sm font-medium text-foreground/80 mb-1 truncate">
                        Completed
                    </p>
                    <p
                        className="text-2xl font-bold text-emerald-500 truncate"
                        title={completed.toString()}
                    >
                        {completed}
                    </p>
                </div>
                <CheckCheck className="h-6 w-6 text-emerald-500 shrink-0" />
            </div>

            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm h-full">
                <div className="min-w-0 flex-1 mr-4">
                    <p className="text-sm font-medium text-foreground/80 mb-1 truncate">
                        New patient reg
                    </p>
                    <p
                        className="text-2xl font-bold text-blue-500 truncate"
                        title={newPatients.toString()}
                    >
                        {newPatients}
                    </p>
                </div>
                <UserPlus className="h-6 w-6 text-blue-500 shrink-0" />
            </div>

            <div className="bg-background border rounded-xl p-5 flex items-center justify-between shadow-sm h-full">
                <div className="min-w-0 flex-1 mr-4">
                    <p className="text-sm font-medium text-foreground/80 mb-1 truncate">
                        Revisit
                    </p>
                    <p
                        className="text-2xl font-bold text-orange-500 truncate"
                        title={revisit.toString()}
                    >
                        {revisit}
                    </p>
                </div>
                <Clock className="h-6 w-6 text-orange-500 shrink-0" />
            </div>
        </div>
    );
}
