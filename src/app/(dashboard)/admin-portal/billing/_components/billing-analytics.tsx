"use client";
import { useState } from "react";
import { BillingToolbar } from "./billing-toolbar";
import { BillingFilters } from "./billing-filters";
import { BillingPaymentMethodsChart } from "./billing-payment-methods-chart";
import { BillingRevenueTrendChart } from "./billing-revenue-trend-chart";
import { BillingRevenueByDoctorChart } from "./billing-revenue-by-doctor-chart";
import { useGetBillingCharts } from "@/hooks/api/useGetBillingCharts";

export function BillingAnalytics({ clinicId }: { clinicId?: string }) {
    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: chartsData,
        isLoading,
        isError,
    } = useGetBillingCharts(clinicId ? { clinicId } : undefined);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-background border border-border/80 rounded-[12px] p-4 sm:p-5 shadow-sm">
                <BillingToolbar
                    showFilters={showFilters}
                    onToggleFilters={() => setShowFilters(!showFilters)}
                    view={view}
                    onViewChange={setView}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {showFilters && (
                    <div className="mt-5 animate-in fade-in slide-in-from-top-2">
                        <BillingFilters />
                    </div>
                )}
            </div>

            <div
                className={
                    view === "grid"
                        ? "grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6"
                        : "grid grid-cols-1 gap-6"
                }
            >
                <BillingPaymentMethodsChart
                    data={chartsData?.paymentMethodDistribution}
                    isLoading={isLoading}
                    isError={isError}
                />
                <BillingRevenueTrendChart
                    data={chartsData?.revenueTrend}
                    isLoading={isLoading}
                    isError={isError}
                />
                <BillingRevenueByDoctorChart
                    data={chartsData?.revenueByDoctor}
                    isLoading={isLoading}
                    isError={isError}
                />
            </div>
        </div>
    );
}
