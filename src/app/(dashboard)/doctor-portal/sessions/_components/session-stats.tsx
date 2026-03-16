import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export interface SessionStatsProps {
    completed?: number;
    upcoming?: number;
    skipped?: number;
    total?: number;
}

export default function SessionStats({
    completed = 0,
    upcoming = 0,
    skipped = 0,
}: SessionStatsProps) {
    const stats = [
        {
            label: "Completed",
            value: completed.toString(),
            color: "text-blue-600 dark:text-blue-400",
        },
        {
            label: "Remaining",
            value: upcoming.toString(),
            color: "text-orange-600 dark:text-orange-400",
        },
        {
            label: "Upcoming",
            value: (completed + upcoming + skipped).toString(),
            color: "text-primary",
        },
        { label: "Skipped", value: skipped.toString(), color: "text-destructive" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <Card
                    key={stat.label}
                    className="border-border/80 shadow-sm hover:shadow-md transition-shadow rounded-lg"
                >
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                {stat.label}
                            </span>
                            <ArrowUpRight className="w-5 h-5 text-muted-foreground/50" />
                        </div>
                        <div
                            className={`text-4xl font-bold ${stat.color} tracking-tight`}
                        >
                            {stat.value}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
