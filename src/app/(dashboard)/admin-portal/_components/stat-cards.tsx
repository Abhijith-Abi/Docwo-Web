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

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendUp?: boolean;
    icon: React.ReactNode;
    iconBgColor?: string;
    iconColor?: string;
    isLoading?: boolean;
}

function StatCard({
    title,
    value,
    trend,
    trendUp = true,
    icon,
    iconBgColor,
    iconColor,
    isLoading = false,
}: StatCardProps) {
    return (
        <Card className="shadow-sm border-slate-100 h-full rounded-xl">
            <CardContent className="p-5">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <h3 className="text-[13px] font-semibold text-slate-800 leading-tight">
                            {title}
                        </h3>
                        {isLoading ? (
                            <div className="mt-2 space-y-2">
                                <div className="h-8 w-16 bg-slate-100 animate-pulse rounded" />
                                <div className="h-4 w-24 bg-slate-50 animate-pulse rounded" />
                            </div>
                        ) : (
                            <>
                                <p className="text-[28px] font-bold text-slate-900 mt-1">
                                    {value}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    {trendUp ? (
                                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                                    ) : (
                                        <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
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
                                    <span className="text-[11px] text-slate-400 font-medium ml-0.5">
                                        From last month
                                    </span>
                                </div>
                            </>
                        )}
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
    // If error, don't show anything or show empty cards
    if (isError) return null;

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

    const analyticsData = data || {};

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {cards.map((card, i) => (
                <StatCard key={i} {...card} isLoading={isLoading} />
            ))}
        </div>
    );
}
