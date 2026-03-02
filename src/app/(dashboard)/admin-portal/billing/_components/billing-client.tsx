"use client";

import { useState, useMemo, useEffect } from "react";
import { BillingHeader } from "./billing-header";
import { BillingStatCards } from "./billing-stat-cards";
import { BillingTabs } from "./billing-tabs";
import { BillingToolbar } from "./billing-toolbar";
import { BillingFilters } from "./billing-filters";
import { BillingListView } from "./billing-list-view";
import { BillingGridView } from "./billing-grid-view";
import { Invoice } from "./data";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BillingPagination } from "./billing-pagination";
import { Button } from "@/components/ui/button";
import { BillingAnalytics } from "./billing-analytics";
import { BillingRefunds } from "./billing-refunds";
import { BillingListSkeleton, BillingGridSkeleton } from "./billing-skeleton";
import { useGetBillingsPayments } from "@/hooks/api/useGetBillingsPayments";
import { useAuthStore } from "@/store/auth-store";

export function BillingClient() {
    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const user = useAuthStore((state) => state.user);
    const clinicId = user?.clinic_assignments?.[0]?.clinic_id;

    const {
        data: { data: billingsPayments = [], pagination = null } = {},
        isLoading,
    } = useGetBillingsPayments(clinicId, {
        page,
        limit: itemsPerPage,
        tab: "invoices",
        search: debouncedSearch,
    });

    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (debouncedSearch !== searchQuery) {
                setDebouncedSearch(searchQuery);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, debouncedSearch]);

    useEffect(() => {
        if (pagination?.totalResults !== undefined) {
            setTotalCount(pagination.totalResults);
        }
    }, [pagination?.totalResults]);

    const apiInvoices: Invoice[] = useMemo(() => {
        if (!Array.isArray(billingsPayments)) return [];
        return billingsPayments.map((item: any) => {
            const dateObj = new Date(item.date_and_time);
            return {
                id: item.invoice_id,
                invoiceNumber: item.invoice_id,
                date: dateObj.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }),
                time: dateObj.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                patientName: item.patient?.name || "Unknown",
                patientId: item.patient?.patient_code || "",
                doctorName: item.doctor?.name || "Unknown",
                specialization: item.department || "",
                amount: parseFloat(item.total_amount) || 0,
                status:
                    item.status === "paid"
                        ? "Paid"
                        : item.status === "refund"
                          ? "Refund"
                          : item.status,
                paymentMethod: item.payment_method?.replace(/_/g, " ") || "",
            };
        });
    }, [billingsPayments]);

    const totalPages = pagination?.totalPages || 1;
    const paginatedInvoices = apiInvoices; // API already paginates and filters

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedInvoices(paginatedInvoices.map((inv) => inv.id));
        } else {
            setSelectedInvoices([]);
        }
    };

    const handleSelectInvoice = (invoiceId: string, checked: boolean) => {
        if (checked) {
            setSelectedInvoices((prev) => [...prev, invoiceId]);
        } else {
            setSelectedInvoices((prev) =>
                prev.filter((id) => id !== invoiceId),
            );
        }
    };

    return (
        <div className="flex-1 space-y-6 animate-in fade-in duration-500">
            <BillingHeader />
            <BillingStatCards clinicId={clinicId} />

            <Tabs defaultValue="invoices" className="w-full">
                <BillingTabs />
                <TabsContent value="invoices" className="m-0 mt-6 space-y-6">
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

                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-[15px] font-semibold text-foreground/90">
                            Invoice Management{" "}
                            {totalCount > 0 ? `(${totalCount})` : ""}
                        </h2>
                        {selectedInvoices.length > 0 && (
                            <Button
                                variant="outline"
                                onClick={() => setSelectedInvoices([])}
                                className="h-[34px] text-[12px] font-semibold rounded-[6px] px-3 shadow-sm border-border/80 text-foreground/80 hover:text-foreground"
                            >
                                Clear Selection ({selectedInvoices.length})
                            </Button>
                        )}
                    </div>

                    {isLoading ? (
                        view === "grid" ? (
                            <BillingGridSkeleton />
                        ) : (
                            <BillingListSkeleton />
                        )
                    ) : view === "list" ? (
                        <BillingListView
                            invoices={paginatedInvoices}
                            selectedInvoices={selectedInvoices}
                            onSelectAll={handleSelectAll}
                            onSelectInvoice={handleSelectInvoice}
                        />
                    ) : (
                        <BillingGridView invoices={paginatedInvoices} />
                    )}

                    <div className="pt-4">
                        <BillingPagination
                            currentPage={page}
                            totalPages={totalPages}
                            hasNextPage={page < totalPages}
                            hasPrevPage={page > 1}
                            onPageChange={setPage}
                        />
                    </div>
                </TabsContent>
                <TabsContent value="analytics" className="m-0 mt-6">
                    <BillingAnalytics clinicId={clinicId} />
                </TabsContent>
                <TabsContent value="refunds" className="m-0 mt-6">
                    <BillingRefunds />
                </TabsContent>
            </Tabs>
        </div>
    );
}
