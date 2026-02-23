"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
    { name: "Completed 45%", value: 45, color: "#4ade80" },
    { name: "Upcoming 40%", value: 40, color: "#fb923c" },
    { name: "Cancelled 15%", value: 15, color: "#f87171" },
];

export function AppointmentStatusChart() {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm w-full mb-8 flex flex-col items-center">
            <div className="w-full flex justify-start">
                <h3 className="text-[15px] font-semibold text-slate-800 mb-2">
                    Appointment status
                </h3>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width={400} height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={110}
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
                                innerRadius,
                                outerRadius,
                                percent,
                                index,
                            }) => {
                                const RADIAN = Math.PI / 180;
                                // Position labels nicely outside the pie
                                const radius = outerRadius * 1.35;
                                const x =
                                    cx + radius * Math.cos(-midAngle * RADIAN);
                                const y =
                                    cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        fill={data[index].color}
                                        textAnchor={x > cx ? "start" : "end"}
                                        dominantBaseline="central"
                                        fontSize={12}
                                        fontWeight="500"
                                    >
                                        {name}
                                    </text>
                                );
                            }}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
