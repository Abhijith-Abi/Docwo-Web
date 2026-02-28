import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BillingStatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendSuffix?: string;
    trendColor?: string;
    icon?: React.ReactNode;
    valueColor?: string;
}

function BillingStatCard({
    title,
    value,
    trend,
    trendSuffix,
    trendColor = "text-emerald-500",
    icon,
    valueColor = "text-emerald-500",
}: BillingStatCardProps) {
    return (
        <Card className="shadow-sm border-border/60 rounded-[12px] p-1">
            <CardContent className="p-4 flex flex-col justify-between h-full min-h-[100px]">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-foreground/80">
                        {title}
                    </h3>
                    {icon && <div className="text-emerald-500">{icon}</div>}
                </div>

                <div className="mt-4">
                    <p
                        className={cn(
                            "text-[28px] font-bold leading-none",
                            valueColor,
                        )}
                    >
                        {value}
                    </p>

                    {trend && (
                        <div className="flex items-center gap-1 mt-2">
                            <TrendingUp
                                className={cn("h-3.5 w-3.5", trendColor)}
                            />
                            <span
                                className={cn(
                                    "text-[12px] font-bold",
                                    trendColor,
                                )}
                            >
                                {trend}
                            </span>
                            {trendSuffix && (
                                <span className="text-[12px] text-muted-foreground ml-1">
                                    {trendSuffix}
                                </span>
                            )}
                        </div>
                    )}

                    {!trend && trendSuffix && (
                        <div className="mt-2 text-[12px] text-muted-foreground">
                            {trendSuffix}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export function BillingStatCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <BillingStatCard
                title="Todays Payment Received"
                value="₹0"
                trend="+12%"
                trendSuffix="from yesterday"
                icon={<span className="text-xl font-bold">₹</span>}
            />
            <BillingStatCard
                title="Monthly Payment Received"
                value="₹0"
                trend="+8%"
                trendSuffix="from yesterday"
                icon={<span className="text-xl font-bold">₹</span>}
                valueColor="text-blue-500"
                trendColor="text-blue-500"
            />
            <BillingStatCard
                title="Total Invoices"
                value="325"
                trendSuffix="This month"
                valueColor="text-slate-500"
            />
            <BillingStatCard
                title="Refund Issued"
                value="₹550"
                trendSuffix="This month"
                valueColor="text-orange-400"
            />
        </div>
    );
}
