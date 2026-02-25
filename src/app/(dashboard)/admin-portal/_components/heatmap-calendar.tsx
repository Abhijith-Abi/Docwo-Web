"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function generateMonth(month: number, year: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }
    return days;
}

const legend = [
    { label: "0 - 5 Appointments", color: "bg-[#a7e4ca]" },
    { label: "6 - 10 Appointments", color: "bg-[#fcd0b4]" },
    { label: "11 - 15 Appointments", color: "bg-[#fa9c7a]" },
    { label: "16+ Appointments", color: "bg-[#f45d5d]" },
    { label: "Holiday or Not working", color: "bg-[#b0c4de]" },
];

export function AppointmentHeatmap({
    data,
    isLoading,
    isError,
}: {
    data?: { date: string; count: number }[];
    isLoading?: boolean;
    isError?: boolean;
}) {
    const MonthView = ({
        name,
        month,
        year,
        dataMap,
    }: {
        name: string;
        month: number;
        year: number;
        dataMap: Record<number, string>;
    }) => {
        const days = generateMonth(month, year);
        return (
            <div className="flex flex-col text-slate-900">
                <h4 className="font-bold text-[14px] mb-4 text-slate-800">
                    {name} {year}
                </h4>
                <div className="grid grid-cols-7 gap-[2px] text-center mb-1 bg-slate-50 border border-slate-100/50 p-2 rounded-t">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                        (d) => (
                            <div
                                key={d}
                                className="text-[10px] font-bold text-slate-800"
                            >
                                {d}
                            </div>
                        ),
                    )}
                </div>
                <div className="grid grid-cols-7 gap-[2px]">
                    {days.map((day, i) => {
                        if (day === null)
                            return (
                                <div
                                    key={`empty-${i}`}
                                    className="h-8 md:h-10 bg-[#fef5f0]"
                                />
                            );
                        const colorClass = dataMap[day] || "bg-slate-100";
                        return (
                            <div
                                key={`day-${i}`}
                                className={cn(
                                    "h-8 md:h-10 flex items-center justify-center text-[12px] font-semibold text-slate-800",
                                    colorClass,
                                )}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="mb-8 flex flex-col items-start w-full bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-[15px] font-semibold text-slate-800 mb-6 w-full text-left">
                    Appointment Heatmap Calendar
                </h3>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 w-full">
                    {/* Legend Skeleton */}
                    <div className="flex flex-row flex-wrap lg:flex-col gap-2 w-full lg:max-w-[240px] pt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton
                                key={`legend-skel-${i}`}
                                className="h-[31px] w-[140px] lg:w-full rounded-[3px] bg-slate-50"
                            />
                        ))}
                    </div>

                    {/* Calendars Grid Skeleton */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-14 gap-y-12 flex-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={`month-skel-${i}`}
                                className="flex flex-col w-full"
                            >
                                <Skeleton className="h-5 w-32 mb-4 rounded-lg bg-slate-50" />
                                <div className="grid grid-cols-7 gap-[2px] mb-1 bg-slate-50 border border-slate-100/50 p-2 rounded-t">
                                    {Array.from({ length: 7 }).map((_, d) => (
                                        <div
                                            key={`day-lbl-skel-${d}`}
                                            className="h-4 flex items-center justify-center"
                                        >
                                            <Skeleton className="h-[10px] w-5 rounded-sm bg-slate-200" />
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-[2px]">
                                    {Array.from({ length: 35 }).map((_, j) => (
                                        <Skeleton
                                            key={`day-skel-${j}`}
                                            className="h-8 md:h-10 w-full rounded-sm bg-slate-50"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mb-8 flex flex-col items-start w-full bg-white p-6 rounded-xl border border-slate-100 shadow-sm min-h-[300px]">
                <h3 className="text-[15px] font-semibold text-slate-800 mb-6 w-full text-left">
                    Appointment Heatmap Calendar
                </h3>
                <div className="flex-1 w-full flex items-center justify-center">
                    <p className="text-sm text-red-500">Failed to load data</p>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="mb-8 flex flex-col items-start w-full bg-white p-6 rounded-xl border border-slate-100 shadow-sm min-h-[300px]">
                <h3 className="text-[15px] font-semibold text-slate-800 mb-6 w-full text-left">
                    Appointment Heatmap Calendar
                </h3>
                <div className="flex-1 w-full flex items-center justify-center">
                    <p className="text-sm text-slate-400">No data available</p>
                </div>
            </div>
        );
    }

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Group by year-month
    const monthGroups = new Map<string, Record<number, string>>();

    data.forEach((item) => {
        if (!item.date) return;
        const [yearStr, monthStr, dayStr] = item.date.split("-");
        if (!yearStr || !monthStr || !dayStr) return;

        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10) - 1; // 0-indexed
        const day = parseInt(dayStr, 10);

        const key = `${year}-${month}`;

        if (!monthGroups.has(key)) {
            monthGroups.set(key, {});
        }

        let color = "bg-[#b0c4de]"; // 0
        if (item.count > 0 && item.count <= 5) color = "bg-[#a7e4ca]";
        else if (item.count > 5 && item.count <= 10) color = "bg-[#fcd0b4]";
        else if (item.count > 10 && item.count <= 15) color = "bg-[#fa9c7a]";
        else if (item.count > 15) color = "bg-[#f45d5d]";

        monthGroups.get(key)![day] = color;
    });

    const sortedMonthKeys = Array.from(monthGroups.keys()).sort((a, b) => {
        const [yearA, monthA] = a.split("-").map(Number);
        const [yearB, monthB] = b.split("-").map(Number);
        if (yearA !== yearB) return yearA - yearB;
        return monthA - monthB;
    });

    const renderMonths = sortedMonthKeys.map((key) => {
        const [year, month] = key.split("-").map(Number);
        return {
            year,
            month,
            name: monthNames[month],
            dataMap: monthGroups.get(key)!,
        };
    });

    return (
        <div className="mb-8 flex flex-col items-start w-full bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-[15px] font-semibold text-slate-800 mb-6 w-full text-left">
                Appointment Heatmap Calendar
            </h3>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 w-full">
                {/* Legend */}
                <div className="flex flex-row flex-wrap lg:flex-col gap-2 w-full lg:max-w-[240px] pt-2">
                    {legend.map((item, i) => (
                        <div
                            key={i}
                            className={cn(
                                "px-4 py-2.5 text-[11px] font-semibold text-slate-900 rounded-[3px] grow lg:grow-0 text-center lg:text-left",
                                item.color,
                            )}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* Calendars Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-14 gap-y-12 flex-1">
                    {renderMonths.map((m, i) => (
                        <MonthView
                            key={i}
                            name={m.name}
                            month={m.month}
                            year={m.year}
                            dataMap={m.dataMap}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
