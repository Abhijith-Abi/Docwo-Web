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

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function AppointmentsChart({
    data,
    isLoading,
    isError,
}: {
    data?: any;
    isLoading?: boolean;
    isError?: boolean;
}) {
    const chartData = useMemo(() => {
        if (!data?.labels || !data?.datasets) return [];

        return data.labels.map((label: string, index: number) => {
            const dataPoint: any = { date: label };

            data.datasets.forEach((dataset: any) => {
                dataPoint[dataset.label] = dataset.data[index] || 0;
            });

            return dataPoint;
        });
    }, [data]);

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm w-full mb-6 py-8">
                <h3 className="text-[15px] font-semibold text-slate-800 mb-6">
                    Appointments Trends Over Time
                </h3>
                <Skeleton className="h-[280px] w-full rounded-xl bg-slate-50" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm w-full mb-6 py-8 h-[390px] flex flex-col items-center">
                <div className="w-full flex justify-start">
                    <h3 className="text-[15px] font-semibold text-slate-800 mb-6">
                        Appointments Trends Over Time
                    </h3>
                </div>
                <div className="h-[280px] w-full flex items-center justify-center">
                    <div className="text-sm text-red-500">
                        Failed to load data
                    </div>
                </div>
            </div>
        );
    }

    if (chartData.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm w-full mb-6 py-8 h-[390px] flex flex-col items-center">
                <div className="w-full flex justify-start">
                    <h3 className="text-[15px] font-semibold text-slate-800 mb-6">
                        Appointments Trends Over Time
                    </h3>
                </div>
                <div className="h-[280px] w-full flex items-center justify-center">
                    <div className="text-sm text-slate-400">
                        No data available
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm w-full mb-6 py-8">
            <h3 className="text-[15px] font-semibold text-slate-800 mb-6">
                Appointments Trends Over Time
            </h3>
            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
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
                            dataKey="Total"
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
