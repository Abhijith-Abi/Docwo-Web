"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { doctor: "Dr. Rajesh Kumar", revenue: 85000 },
    { doctor: "Dr. Kavitha Nair", revenue: 72000 },
    { doctor: "Dr. Suresh Iyer", revenue: 68000 },
    { doctor: "Dr. Anjali Gupta", revenue: 53000 },
    { doctor: "Dr. Krishnan Nair", revenue: 47000 },
];

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "#837cd9",
    },
} satisfies ChartConfig;

export function BillingRevenueByDoctorChart() {
    return (
        <Card className="flex flex-col shadow-sm border-border/60 rounded-[12px] h-[400px]">
            <CardHeader className="pb-4 pt-5">
                <CardTitle className="text-[13px] font-medium text-foreground/80 flex items-center gap-1">
                    Revenue by{" "}
                    <span className="font-normal text-muted-foreground">
                        Doctor
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="w-[500px] h-[300px] mt-4"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 10, right: 0, bottom: 40, left: 0 }}
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
                            dataKey="doctor"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={true}
                            stroke="#c8c8c8"
                            angle={-45}
                            textAnchor="end"
                            className="text-[10px] text-muted-foreground fill-muted-foreground font-medium"
                            height={60}
                        />
                        <ChartTooltip
                            cursor={{
                                fill: "var(--color-revenue)",
                                opacity: 0.1,
                            }}
                            content={
                                <ChartTooltipContent
                                    hideIndicator
                                    className="bg-background shadow-md border-border/60 rounded-[8px] p-2 text-[12px]"
                                />
                            }
                        />
                        <Bar
                            dataKey="revenue"
                            fill="var(--color-revenue)"
                            radius={[0, 0, 0, 0]}
                            barSize={50}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
