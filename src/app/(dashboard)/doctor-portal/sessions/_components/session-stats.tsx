import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const stats = [
    { label: "Completed", value: "12", color: "text-blue-600" },
    { label: "Reported", value: "8", color: "text-orange-600" },
    { label: "Upcoming", value: "24", color: "text-emerald-600" },
    { label: "Skiped", value: "4", color: "text-red-600" },
];

export default function SessionStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <Card
                    key={stat.label}
                    className="border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                {stat.label}
                            </span>
                            <ArrowUpRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className={`text-4xl font-bold ${stat.color}`}>
                            {stat.value}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
