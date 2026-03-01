import { Card, CardContent } from "@/components/ui/card";
import {
    CalendarCheck,
    Clock,
    XCircle,
    Ban,
    CheckCircle2,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DataErrorState,
    DataEmptyState,
} from "@/components/ui/data-state-view";

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendUp?: boolean;
    icon: React.ReactNode;
    iconBgColor?: string;
    iconColor?: string;
}

function StatCard({
    title,
    value,
    trend,
    trendUp = true,
    icon,
    iconBgColor,
    iconColor,
}: StatCardProps) {
    return (
        <Card className="shadow-sm border-slate-100 h-full rounded-[12px]">
            <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <h3 className="text-[13px] font-semibold text-slate-800 leading-tight">
                            {title}
                        </h3>
                        <p
                            className="text-[28px] font-bold text-slate-900 mt-2 truncate"
                            title={value}
                        >
                            {value}
                        </p>
                        <div className="flex flex-wrap items-center gap-1 mt-1">
                            {trendUp ? (
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                                <TrendingDown className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            )}
                            <span
                                className={cn(
                                    "text-[11px] font-bold",
                                    trendUp
                                        ? "text-emerald-500"
                                        : "text-rose-500",
                                )}
                            >
                                {trend}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium ml-0.5 truncate">
                                From last month
                            </span>
                        </div>
                    </div>
                    <div
                        className={cn(
                            "w-9 h-9 shrink-0 flex items-center justify-center rounded-full mt-1",
                            iconBgColor || "bg-emerald-50",
                        )}
                    >
                        <div
                            className={cn(
                                "w-5 h-5 flex items-center justify-center",
                                iconColor || "text-emerald-500",
                            )}
                        >
                            {icon}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function StatCards({
    data,
    isLoading,
    isError,
}: {
    data: any;
    isLoading: boolean;
    isError: boolean;
}) {
    const gridClassName =
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6";

    if (isLoading) {
        return (
            <div className={gridClassName}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card
                        key={i}
                        className="shadow-sm border-border/60 rounded-[12px] h-full"
                    >
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <Skeleton className="h-4 w-2/3 mb-2" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                            <div className="mt-2 space-y-2">
                                <Skeleton className="h-8 w-1/2" />
                                <Skeleton className="h-3 w-3/4" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <DataErrorState
                className="mb-6"
                title="Failed to load statistics"
            />
        );
    }

    const analyticsData = data || {};

    // Determine empty state by checking if any key data points exist
    const hasData =
        analyticsData.totalAppointments !== undefined ||
        analyticsData.total_appointments !== undefined ||
        analyticsData.avgConsultationTime !== undefined ||
        Object.keys(analyticsData).length > 0;

    if (!hasData) {
        return (
            <DataEmptyState
                className="mb-6"
                title="No appointment statistics found"
            />
        );
    }

    const formatTrend = (trendStr: string) => {
        if (!trendStr) return { trend: "0%", trendUp: true };
        const isUp = trendStr.startsWith("+");
        return {
            trend: trendStr,
            trendUp: isUp,
        };
    };

    const formatTime = (seconds: number) => {
        if (!seconds) return "0 min";
        const mins = Math.floor(seconds / 60);
        return `${mins} min`;
    };

    const cards = [
        {
            title: "Total Appointments",
            value: (
                analyticsData.totalAppointments ??
                analyticsData.total_appointments ??
                0
            ).toString(),
            ...formatTrend(
                analyticsData.totalAppointmentsComparison ||
                    analyticsData.total_appointments_comparison,
            ),
            icon: <CalendarCheck className="w-5 h-5" />,
            iconBgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        {
            title: "Average Consultation Time",
            value: formatTime(
                analyticsData.avgConsultationTime ??
                    analyticsData.avg_consultation_time,
            ),
            trend: "0%",
            trendUp: true,
            icon: <Clock className="w-5 h-5" />,
            iconBgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        {
            title: "Completed Appointments",
            value: (
                analyticsData.completedAppointments ??
                analyticsData.completed_appointments ??
                0
            ).toString(),
            ...formatTrend(
                analyticsData.completedAppointmentsComparison ||
                    analyticsData.completed_appointments_comparison,
            ),
            icon: <CheckCircle2 className="w-5 h-5" />,
            iconBgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        {
            title: "Cancelled Appointments",
            value: (
                analyticsData.cancelledAppointments ??
                analyticsData.cancelled_appointments ??
                0
            ).toString(),
            ...formatTrend(
                analyticsData.cancelledAppointmentsComparison ||
                    analyticsData.cancelled_appointments_comparison,
            ),
            icon: <XCircle className="w-5 h-5" />,
            iconBgColor: "bg-rose-50",
            iconColor: "text-rose-600",
        },
        {
            title: "Cancellation Rate",
            value:
                analyticsData.cancellationRate ??
                analyticsData.cancellation_rate ??
                "0.0%",
            trend: "0%",
            trendUp: false,
            icon: <Ban className="w-5 h-5" />,
            iconBgColor: "bg-rose-50",
            iconColor: "text-rose-600",
        },
        {
            title: "No Show Appointments",
            value: (
                analyticsData.noShowAppointments ??
                analyticsData.no_show_appointments ??
                0
            ).toString(),
            ...formatTrend(
                analyticsData.noShowAppointmentsComparison ||
                    analyticsData.no_show_comparison,
            ),
            icon: <Ban className="w-5 h-5" />,
            iconBgColor: "bg-amber-50",
            iconColor: "text-amber-600",
        },
    ];

    return (
        <div className={gridClassName}>
            {cards.map((card, i) => (
                <StatCard key={i} {...card} />
            ))}
        </div>
    );
}
