import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, AlertCircle, FileX2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetBillingKPIs } from "@/hooks/api/useGetBillingKPIs";
import { Skeleton } from "@/components/ui/skeleton";

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
        <Card className="shadow-sm border-border/60 rounded-[12px] p-1 h-full">
            <CardContent className="p-4 flex flex-col justify-between h-full min-h-[100px]">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-semibold text-foreground/80 leading-tight">
                        {title}
                    </h3>
                    {icon && (
                        <div className="text-emerald-500 shrink-0">{icon}</div>
                    )}
                </div>

                <div className="mt-4">
                    <p
                        className={cn(
                            "text-2xl sm:text-[28px] font-bold leading-none truncate",
                            valueColor,
                        )}
                        title={value}
                    >
                        {value}
                    </p>

                    {trend && (
                        <div className="flex flex-wrap items-center gap-1 mt-2">
                            <TrendingUp
                                className={cn(
                                    "h-3.5 w-3.5 shrink-0",
                                    trendColor,
                                )}
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
                                <span className="text-[12px] text-muted-foreground ml-1 truncate">
                                    {trendSuffix}
                                </span>
                            )}
                        </div>
                    )}

                    {!trend && trendSuffix && (
                        <div className="mt-2 text-[12px] text-muted-foreground truncate">
                            {trendSuffix}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export function BillingStatCards({ clinicId }: { clinicId?: string }) {
    const {
        data: kpiData,
        isLoading,
        isError,
    } = useGetBillingKPIs(clinicId ? { clinicId } : undefined);

    const gridClassName =
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6";

    if (isLoading) {
        return (
            <div className={gridClassName}>
                {[1, 2, 3, 4].map((i) => (
                    <Card
                        key={i}
                        className="shadow-sm border-border/60 rounded-[12px] p-1 h-full"
                    >
                        <CardContent className="p-4 flex flex-col justify-between h-full min-h-[100px]">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </div>
                            <div className="mt-4 space-y-2">
                                <Skeleton className="h-8 w-1/2" />
                                <Skeleton className="h-3 w-1/3" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <Card className="mb-6 border-dashed border-destructive/50 bg-destructive/5 rounded-[12px]">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center min-h-[100px]">
                    <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                    <p className="text-sm font-medium text-destructive">
                        Failed to load billing statistics
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Please try refreshing the page later.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const data = kpiData?.data || kpiData;

    // Check if data exists - simple sanity check for empty state
    if (!data || Object.keys(data).length === 0) {
        return (
            <Card className="mb-6 border-dashed border-border/60 bg-muted/20 rounded-[12px]">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center min-h-[100px]">
                    <FileX2 className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium text-foreground">
                        No stats available
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Check back later once transactions have been processed.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const formatCurrency = (value: number | undefined) => {
        if (value === undefined || value === null) return "₹0";
        return `₹${value.toLocaleString("en-IN")}`;
    };

    const formatNumber = (value: number | undefined) => {
        if (value === undefined || value === null) return "0";
        return value.toString();
    };

    return (
        <div className={gridClassName}>
            <BillingStatCard
                title="Todays Payment Received"
                value={formatCurrency(
                    data?.monthlyPaymentReceived?.amount ?? "0",
                )}
                trend={data?.todaysPaymentReceived?.percentage ?? "0%"}
                trendSuffix="from yesterday"
                icon={<span className="text-xl font-bold">₹</span>}
            />
            <BillingStatCard
                title="Monthly Payment Received"
                value={formatCurrency(
                    data?.monthlyPaymentReceived?.amount ?? "0",
                )}
                trend={data?.monthlyPaymentReceived?.percentage ?? "0%"}
                trendSuffix="from yesterday"
                icon={<span className="text-xl font-bold">₹</span>}
                valueColor="text-blue-500"
                trendColor="text-blue-500"
            />
            <BillingStatCard
                title="Total Invoices"
                value={formatNumber(data?.totalInvoicesThisMonth?.count ?? "0")}
                trendSuffix="This month"
                valueColor="text-slate-500"
            />
            <BillingStatCard
                title="Refund Issued"
                value={formatCurrency(
                    data?.refundsIssuedThisMonth?.amount ?? "0",
                )}
                trendSuffix="This month"
                valueColor="text-orange-400"
            />
        </div>
    );
}
