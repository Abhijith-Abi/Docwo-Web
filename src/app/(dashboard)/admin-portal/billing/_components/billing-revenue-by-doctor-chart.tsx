"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const defaultChartData = [
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

interface Props {
    data?: any[];
    isLoading?: boolean;
    isError?: boolean;
}

export function BillingRevenueByDoctorChart({
    data,
    isLoading,
    isError,
}: Props) {
    const chartData = data && data.length > 0 ? data : defaultChartData;

    return (
        <Card className="flex flex-col shadow-sm border-border/60 rounded-[12px] min-h-[400px] w-full">
            <CardHeader className="pb-4 pt-5">
                <CardTitle className="text-[15px] font-semibold text-foreground/90 flex items-center gap-1">
                    Revenue by{" "}
                    <span className="font-normal text-muted-foreground">
                        Doctor
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="w-full h-[300px] flex items-center justify-center mt-4">
                        <Skeleton className="h-full w-full rounded-xl" />
                    </div>
                ) : isError ? (
                    <div className="w-full h-[300px] flex items-center justify-center mt-4 flex-col text-destructive">
                        <span className="text-sm font-medium">
                            Failed to load data
                        </span>
                    </div>
                ) : !data || data.length === 0 ? (
                    <div className="w-full h-[300px] flex items-center justify-center mt-4 flex-col text-muted-foreground">
                        <span className="text-sm font-medium">
                            No data available
                        </span>
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="w-full h-[300px] mt-4"
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
                )}
            </CardContent>
        </Card>
    );
}
