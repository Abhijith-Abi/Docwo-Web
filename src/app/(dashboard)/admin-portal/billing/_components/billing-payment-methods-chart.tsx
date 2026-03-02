"use client";
import { useMemo } from "react";
import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {} satisfies ChartConfig;

interface Props {
    data?: any[];
    isLoading?: boolean;
    isError?: boolean;
}

export function BillingPaymentMethodsChart({
    data,
    isLoading,
    isError,
}: Props) {
    const hasData = data && data.length > 0;

    const chartData = useMemo(() => {
        if (!hasData) {
            return [{ method: "No Data", percentage: 100 }];
        }
        return data.map((item) => ({
            ...item,
            method: item.method
                ? item.method
                      .split("_")
                      .map(
                          (word: string) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase(),
                      )
                      .join(" ")
                : "Unknown",
            percentage:
                typeof item.percentage === "string"
                    ? parseFloat(item.percentage)
                    : item.percentage || 0,
        }));
    }, [data, hasData]);

    return (
        <Card className="flex flex-col shadow-sm border-border/60 rounded-[12px]">
            <CardHeader className="pb-0 pt-5">
                <CardTitle className="text-[15px] font-semibold text-foreground/90">
                    Payment Methods Distribution
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                {isLoading ? (
                    <div className="w-full h-[280px] flex items-center justify-center mt-4">
                        <Skeleton className="h-full w-full rounded-xl" />
                    </div>
                ) : isError ? (
                    <div className="w-full h-[280px] flex items-center justify-center mt-4 flex-col text-destructive">
                        <span className="text-sm font-medium">
                            Failed to load data
                        </span>
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto w-full h-[300px]"
                    >
                        <PieChart
                            margin={{
                                top: 20,
                                right: 80,
                                bottom: 20,
                                left: 80,
                            }}
                        >
                            {hasData && (
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                            )}
                            <Pie
                                data={chartData}
                                dataKey="percentage"
                                nameKey="method"
                                cx="50%"
                                cy="50%"
                                innerRadius={0}
                                outerRadius={90}
                                strokeWidth={2}
                                stroke="hsl(var(--background))"
                                label={
                                    hasData
                                        ? ({
                                              cx,
                                              cy,
                                              midAngle,
                                              innerRadius,
                                              outerRadius,
                                              value,
                                              index,
                                          }) => {
                                              const RADIAN = Math.PI / 180;
                                              const radius = outerRadius + 25;
                                              const x =
                                                  cx +
                                                  radius *
                                                      Math.cos(
                                                          -midAngle * RADIAN,
                                                      );
                                              const y =
                                                  cy +
                                                  radius *
                                                      Math.sin(
                                                          -midAngle * RADIAN,
                                                      );

                                              const labelText = `${chartData[index].method}: ${value}%`;
                                              const colors = [
                                                  "#43b28b",
                                                  "#b78af1",
                                                  "#f59e0b",
                                                  "#ef4444",
                                                  "#3b82f6",
                                                  "#10b981",
                                                  "#8b5cf6",
                                                  "#ec4899",
                                                  "#f97316",
                                                  "#06b6d4",
                                              ];
                                              const fillStyle =
                                                  colors[index % colors.length];

                                              return (
                                                  <text
                                                      x={x}
                                                      y={y}
                                                      fill={fillStyle}
                                                      textAnchor={
                                                          x > cx
                                                              ? "start"
                                                              : "end"
                                                      }
                                                      dominantBaseline="central"
                                                      className="text-[11px] font-semibold tracking-wide"
                                                  >
                                                      {labelText}
                                                  </text>
                                              );
                                          }
                                        : false
                                }
                            >
                                {chartData.map((entry, index) => {
                                    if (!hasData) {
                                        return (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill="#e5e7eb"
                                            />
                                        );
                                    }
                                    const segmentColors = [
                                        "#6fc29c",
                                        "#c49bf5",
                                        "#fbbf24",
                                        "#f87171",
                                        "#60a5fa",
                                        "#34d399",
                                        "#a78bfa",
                                        "#f472b6",
                                        "#fb923c",
                                        "#22d3ee",
                                    ];
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                segmentColors[
                                                    index % segmentColors.length
                                                ]
                                            }
                                        />
                                    );
                                })}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
