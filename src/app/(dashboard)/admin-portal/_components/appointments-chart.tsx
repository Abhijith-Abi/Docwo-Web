"use client";

import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";

const data = [
    {
        date: "2024-01-01",
        Cancelled: 5,
        Completed: 55,
        "Total Appointment": 60,
    },
    {
        date: "2024-01-02",
        Cancelled: 8,
        Completed: 68,
        "Total Appointment": 76,
    },
    {
        date: "2024-01-03",
        Cancelled: 3,
        Completed: 72,
        "Total Appointment": 75,
    },
    {
        date: "2024-01-04",
        Cancelled: 4,
        Completed: 62,
        "Total Appointment": 66,
    },
    {
        date: "2024-01-05",
        Cancelled: 5,
        Completed: 82,
        "Total Appointment": 87,
    },
    {
        date: "2024-01-06",
        Cancelled: 7,
        Completed: 86,
        "Total Appointment": 93,
    },
    {
        date: "2024-01-07",
        Cancelled: 2,
        Completed: 64,
        "Total Appointment": 66,
    },
];

export function AppointmentsChart() {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm w-full mb-6 py-8">
            <h3 className="text-[15px] font-semibold text-slate-800 mb-6">
                Appointments Trends Over Time
            </h3>
            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#f1f5f9"
                        />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            }}
                            itemStyle={{ fontSize: "12px" }}
                            labelStyle={{
                                color: "#64748b",
                                marginBottom: "4px",
                                fontSize: "13px",
                            }}
                        />
                        <Legend
                            iconType="plainline"
                            wrapperStyle={{
                                fontSize: "12px",
                                paddingTop: "20px",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Cancelled"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Completed"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Total Appointment"
                            stroke="#c084fc"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
