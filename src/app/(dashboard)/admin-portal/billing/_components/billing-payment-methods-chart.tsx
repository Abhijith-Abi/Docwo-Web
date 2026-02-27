"use client";
import { ChevronDown } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { method: "Cash", visitors: 40, fill: "var(--color-cash)" },
    { method: "UPI", visitors: 60, fill: "var(--color-upi)" },
];

const chartConfig = {
    cash: {
        label: "Cash Payments",
        color: "hsl(var(--chart-1))",
    },
    upi: {
        label: "UPI",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function BillingPaymentMethodsChart() {
    return (
        <Card className="flex flex-col shadow-sm border-border/60 rounded-[12px]">
            <CardHeader className="pb-0 pt-5">
                <CardTitle className="text-[13px] font-medium text-foreground/80">
                    Payment Methods Distribution
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[350px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="method"
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={120}
                            strokeWidth={2}
                            stroke="hsl(var(--background))"
                            label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                value,
                                index,
                            }) => {
                                const RADIAN = Math.PI / 180;
                                const radius =
                                    25 +
                                    innerRadius +
                                    (outerRadius - innerRadius);
                                const x =
                                    cx + radius * Math.cos(-midAngle * RADIAN);
                                const y =
                                    cy + radius * Math.sin(-midAngle * RADIAN);

                                const labelText = `${chartData[index].method}: ${value}%`;
                                // Using defined colors to match UI
                                const fillStyle =
                                    index === 0 ? "#43b28b" : "#b78af1";

                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        fill={fillStyle}
                                        textAnchor={x > cx ? "start" : "end"}
                                        dominantBaseline="central"
                                        className="text-[11px] font-semibold tracking-wide"
                                    >
                                        {labelText}
                                    </text>
                                );
                            }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === 0 ? "#6fc29c" : "#c49bf5"}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
