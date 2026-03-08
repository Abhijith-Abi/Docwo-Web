import React from "react";
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function WeeklyOverview() {
    // Mock data for the chart bars
    const chartData = [
        { day: "Mon", height: "35%" },
        { day: "Tue", height: "25%" },
        { day: "Wed", height: "40%" },
        { day: "Thu", height: "30%" },
        { day: "Fri", height: "45%" },
        { day: "Sat", height: "50%" },
        { day: "Sun", height: "70%" },
    ];

    return (
        <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
            <div className="flex items-center gap-2 mb-8">
                <Activity className="w-5 h-5 text-purple-500" />
                <h2 className="text-purple-500 font-semibold text-lg">
                    Weekly Overview
                </h2>
            </div>

            <div className="flex justify-around mb-12">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">34</p>
                    <p className="text-xs text-gray-500 font-medium">
                        Bookings
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">38</p>
                    <p className="text-xs text-gray-500 font-medium">
                        Consultations
                    </p>
                </div>
            </div>

            <div className="mt-auto h-32 flex items-end justify-between px-2 gap-2">
                {chartData.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                    >
                        {/* Bar */}
                        <div
                            className="w-full max-w-[28px] bg-linear-to-t from-black to-gray-700 rounded-t-sm"
                            style={{ height: item.height }}
                        ></div>
                        {/* Label */}
                        <span className="text-xs font-medium text-gray-500 mt-2">
                            {item.day}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
}
