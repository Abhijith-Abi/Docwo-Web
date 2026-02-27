"use client";

import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { date: "01 Jan", revenue: 42000 },
    { date: "02 Jan", revenue: 40000 },
    { date: "03 Jan", revenue: 45000 },
    { date: "04 Jan", revenue: 52000 },
    { date: "05 Jan", revenue: 48000 },
    { date: "06 Jan", revenue: 55000 },
    { date: "07 Jan", revenue: 58000 },
];

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "#9783db",
    },
} satisfies ChartConfig;

export function BillingRevenueTrendChart() {
    return (
        <Card className="flex flex-col shadow-sm border-border/60 rounded-[12px]">
            <CardHeader className="pb-4 pt-5">
                <CardTitle className="text-[13px] font-medium text-foreground/80 flex items-center gap-1">
                    Revenue Trend{" "}
                    <span className="text-muted-foreground/60">|</span>{" "}
                    <span className="font-normal text-muted-foreground">
                        Last 7 Days
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="w-full h-[300px] mt-4"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 10,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#e0e0e0"
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `₹${value / 1000}k`}
                            className="text-[11px] text-muted-foreground fill-muted-foreground font-medium"
                            width={45}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={true}
                            tickMargin={12}
                            tickFormatter={(value) => value}
                            className="text-[11px] text-muted-foreground fill-muted-foreground font-medium"
                            stroke="#c8c8c8"
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideIndicator
                                    className="bg-background shadow-md border-border/60 rounded-[8px] p-3 text-[13px]"
                                    formatter={(value) => (
                                        <span className="text-[#9783db]">
                                            Revenue: ${value.toLocaleString()}
                                        </span>
                                    )}
                                    labelFormatter={(label) => (
                                        <span className="text-foreground font-medium mb-1 block">
                                            {label} 2024
                                        </span>
                                    )}
                                />
                            }
                        />
                        <Line
                            dataKey="revenue"
                            type="monotone"
                            stroke="var(--color-revenue)"
                            strokeWidth={2}
                            dot={{
                                fill: "white",
                                r: 3,
                                strokeWidth: 2,
                                stroke: "var(--color-revenue)",
                            }}
                            activeDot={{
                                r: 5,
                                fill: "white",
                                stroke: "var(--color-revenue)",
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
