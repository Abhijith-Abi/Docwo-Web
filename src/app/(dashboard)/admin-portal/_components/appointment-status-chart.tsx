"use client";

import { useMemo } from "react";
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_COLORS: Record<string, string> = {
    Completed: "#10b981",
    Cancelled: "#ef4444",
    "No Show": "#f59e0b",
    Upcoming: "#3b82f6",
};

export function AppointmentStatusChart({
    data,
    isLoading,
    isError,
}: {
    data?: {
        labels: string[];
        data: number[];
    };
    isLoading?: boolean;
    isError?: boolean;
}) {
    const chartData = useMemo(() => {
        if (!data || !Array.isArray(data.labels) || !Array.isArray(data.data)) {
            return [];
        }

        return data.labels.map((label, index) => ({
            name: label,
            value:
                data.data[index] !== undefined ? Number(data.data[index]) : 0,
            color: STATUS_COLORS[label] || "#cbd5e1",
        }));
    }, [data]);

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm w-full mb-8 flex flex-col items-center">
            <div className="w-full flex justify-start">
                <h3 className="text-[15px] font-semibold text-slate-800 mb-2">
                    Appointment status
                </h3>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center">
                {isLoading ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                        <Skeleton className="h-[160px] w-[160px] rounded-full bg-slate-50" />
                    </div>
                ) : isError ? (
                    <div className="text-sm text-red-500">
                        Failed to load data
                    </div>
                ) : chartData.length === 0 ? (
                    <div className="text-sm text-slate-400">
                        No data available
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "8px",
                                    border: "none",
                                    boxShadow:
                                        "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                                itemStyle={{
                                    color: "#334155",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                }}
                            />
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="white"
                                strokeWidth={2}
                                labelLine={false}
                                label={({
                                    name,
                                    cx,
                                    cy,
                                    midAngle,
                                    outerRadius,
                                    index,
                                    value,
                                }) => {
                                    if (value === 0) return null; // Don't show labels for 0 values to prevent overlapping

                                    const RADIAN = Math.PI / 180;
                                    // Position labels nicely outside the pie
                                    const radius = outerRadius * 1.45;
                                    const x =
                                        cx +
                                        radius * Math.cos(-midAngle * RADIAN);
                                    const y =
                                        cy +
                                        radius * Math.sin(-midAngle * RADIAN);

                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            fill={
                                                chartData[index]?.color ||
                                                "#64748b"
                                            }
                                            textAnchor={
                                                x > cx ? "start" : "end"
                                            }
                                            dominantBaseline="central"
                                            fontSize={12}
                                            fontWeight="600"
                                        >
                                            {name} ({value})
                                        </text>
                                    );
                                }}
                            >
                                {chartData?.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
