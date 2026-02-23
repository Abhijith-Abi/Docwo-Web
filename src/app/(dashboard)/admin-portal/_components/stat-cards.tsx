import { Card, CardContent } from "@/components/ui/card";
import {
    CalendarCheck,
    Clock,
    UserPlus,
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
        <Card className="shadow-sm border-slate-100 h-full rounded-xl">
            <CardContent className="p-5">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-[13px] font-semibold text-slate-800">
                            {title}
                        </h3>
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
                    </div>
                    <div
                        className={cn(
                            "w-9 h-9 flex items-center justify-center rounded-full mt-1",
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

export function StatCards() {
    const cards = [
        {
            title: "Total Appointments",
            value: "1,234",
            trend: "+12.5%",
            trendUp: true,
            icon: <CalendarCheck className="w-5 h-5" />,
            iconBgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        {
            title: "Average Consultation Time",
            value: "15 min",
            trend: "+12.5%",
            trendUp: true,
            icon: <Clock className="w-5 h-5" />,
            iconBgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        {
            title: "New Patients",
            value: "342",
            trend: "-5.2%",
            trendUp: false,
            icon: <UserPlus className="w-5 h-5" />,
            iconBgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        {
            title: "Cancelled Appointments",
            value: "4",
            trend: "-5.2%",
            trendUp: false,
            icon: <XCircle className="w-5 h-5" />,
            iconBgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        {
            title: "Cancellation Rate",
            value: "8",
            trend: "-5.2%",
            trendUp: false,
            icon: <Ban className="w-5 h-5" />,
            iconBgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        {
            title: "Cancellation Rate",
            value: "8",
            trend: "-5.2%",
            trendUp: false,
            icon: <CheckCircle2 className="w-5 h-5" />,
            iconBgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {cards.map((card, i) => (
                <StatCard key={i} {...card} />
            ))}
        </div>
    );
}
