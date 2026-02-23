"use client";

import { cn } from "@/lib/utils";

// Helper to generate the days of the month with offset
function generateMonth(month: number, year: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)

    const days = [];
    for (let i = 0; i < startDay; i++) {
        days.push(null); // empty cells before start of month
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }
    return days;
}

const legend = [
    { label: "0 - 5 Appointments", color: "bg-[#a7e4ca]" }, // greenish
    { label: "6 - 10 Appointments", color: "bg-[#fcd0b4]" }, // light orange
    { label: "11 - 15 Appointments", color: "bg-[#fa9c7a]" }, // orange
    { label: "16+ Appointments", color: "bg-[#f45d5d]" }, // red
    { label: "Holiday or Not working", color: "bg-[#b0c4de]" }, // blueish
];

export function AppointmentHeatmap() {
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
                            ); // placeholder color
                        const colorClass = dataMap[day] || "bg-[#fcd0b4]"; // default light orange to match image look
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

    const janData: Record<number, string> = {
        2: "bg-[#b0c4de]",
        3: "bg-[#a7e4ca]",
        4: "bg-[#fa9c7a]",
        5: "bg-[#f45d5d]",
        9: "bg-[#a7e4ca]",
        10: "bg-[#f45d5d]",
        11: "bg-[#f45d5d]",
        13: "bg-[#f45d5d]",
        14: "bg-[#a7e4ca]",
        15: "bg-[#fa9c7a]",
        16: "bg-[#b0c4de]",
        19: "bg-[#a7e4ca]",
        20: "bg-[#fa9c7a]",
        21: "bg-[#a7e4ca]",
        22: "bg-[#f45d5d]",
        23: "bg-[#b0c4de]",
        24: "bg-[#f45d5d]",
        28: "bg-[#a7e4ca]",
        29: "bg-[#f45d5d]",
        30: "bg-[#b0c4de]",
    };

    const febData: Record<number, string> = {
        2: "bg-[#b0c4de]",
        3: "bg-[#a7e4ca]",
        4: "bg-[#fa9c7a]",
        5: "bg-[#f45d5d]",
        9: "bg-[#b0c4de]",
        10: "bg-[#f45d5d]",
        11: "bg-[#f45d5d]",
        13: "bg-[#f45d5d]",
        14: "bg-[#a7e4ca]",
        15: "bg-[#fa9c7a]",
        16: "bg-[#b0c4de]",
        19: "bg-[#a7e4ca]",
        20: "bg-[#fa9c7a]",
        21: "bg-[#a7e4ca]",
        22: "bg-[#f45d5d]",
        23: "bg-[#b0c4de]",
        24: "bg-[#f45d5d]",
        28: "bg-[#a7e4ca]",
    };

    const marData: Record<number, string> = {
        2: "bg-[#b0c4de]",
        3: "bg-[#a7e4ca]",
        4: "bg-[#fa9c7a]",
        5: "bg-[#f45d5d]",
        9: "bg-[#a7e4ca]",
        10: "bg-[#f45d5d]",
        11: "bg-[#f45d5d]",
        13: "bg-[#f45d5d]",
        14: "bg-[#a7e4ca]",
        15: "bg-[#fa9c7a]",
        16: "bg-[#b0c4de]",
        19: "bg-[#a7e4ca]",
        20: "bg-[#fa9c7a]",
        21: "bg-[#a7e4ca]",
        22: "bg-[#f45d5d]",
        23: "bg-[#b0c4de]",
        24: "bg-[#f45d5d]",
        28: "bg-[#a7e4ca]",
        29: "bg-[#f45d5d]",
        30: "bg-[#b0c4de]",
    };

    const aprData: Record<number, string> = {
        2: "bg-[#b0c4de]",
        3: "bg-[#a7e4ca]",
        4: "bg-[#fa9c7a]",
        5: "bg-[#f45d5d]",
        9: "bg-[#b0c4de]",
        10: "bg-[#f45d5d]",
        11: "bg-[#f45d5d]",
        13: "bg-[#f45d5d]",
        14: "bg-[#a7e4ca]",
        15: "bg-[#fa9c7a]",
        16: "bg-[#b0c4de]",
        19: "bg-[#a7e4ca]",
        20: "bg-[#fa9c7a]",
        21: "bg-[#a7e4ca]",
        22: "bg-[#f45d5d]",
        23: "bg-[#b0c4de]",
        24: "bg-[#f45d5d]",
        28: "bg-[#a7e4ca]",
        29: "bg-[#f45d5d]",
        30: "bg-[#b0c4de]",
    };

    return (
        <div className="mb-8 flex flex-col items-start w-full bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-[15px] font-semibold text-slate-800 mb-6 w-full text-left">
                Appointment Heatmap Calendar
            </h3>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 w-full">
                {/* Legend */}
                <div className="flex flex-col gap-[6px] w-full max-w-[240px] pt-2">
                    {legend.map((item, i) => (
                        <div
                            key={i}
                            className={cn(
                                "px-4 py-2.5 text-[11px] font-semibold text-slate-900 rounded-[3px]",
                                item.color,
                            )}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* Calendars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12 flex-1">
                    <MonthView
                        name="January"
                        month={0}
                        year={2026}
                        dataMap={janData}
                    />
                    <MonthView
                        name="February"
                        month={1}
                        year={2026}
                        dataMap={febData}
                    />
                    <MonthView
                        name="March"
                        month={2}
                        year={2026}
                        dataMap={marData}
                    />
                    <MonthView
                        name="April"
                        month={3}
                        year={2026}
                        dataMap={aprData}
                    />
                </div>
            </div>
        </div>
    );
}
