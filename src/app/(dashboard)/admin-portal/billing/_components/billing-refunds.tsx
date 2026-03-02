"use client";

import { useState, useEffect, useMemo } from "react";
import { BillingToolbar } from "./billing-toolbar";
import { BillingFilters } from "./billing-filters";
import { BillingListView } from "./billing-list-view";
import { BillingGridView } from "./billing-grid-view";
import { BillingPagination } from "./billing-pagination";
import { Invoice } from "./data";
import { Button } from "@/components/ui/button";
import { useGetBillingsPayments } from "@/hooks/api/useGetBillingsPayments";
import { useAuthStore } from "@/store/auth-store";
import { BillingListSkeleton, BillingGridSkeleton } from "./billing-skeleton";

export function BillingRefunds() {
    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [selectedRefunds, setSelectedRefunds] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const user = useAuthStore((state) => state.user);
    const clinicId = user?.clinic_assignments?.[0]?.clinic_id;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (debouncedSearch !== searchQuery) {
                setDebouncedSearch(searchQuery);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, debouncedSearch]);

    const {
        data: { data: billingsPayments = [], pagination = null } = {},
        isLoading,
    } = useGetBillingsPayments(clinicId, {
        page,
        limit: itemsPerPage,
        tab: "refunds",
        search: debouncedSearch,
    });

    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        if (pagination?.totalResults !== undefined) {
            setTotalCount(pagination.totalResults);
        }
    }, [pagination?.totalResults]);

    const apiRefunds: Invoice[] = useMemo(() => {
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
    const paginatedRefunds = apiRefunds;

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRefunds(paginatedRefunds.map((inv) => inv.id));
        } else {
            setSelectedRefunds([]);
        }
    };

    const handleSelectRefund = (invoiceId: string, checked: boolean) => {
        if (checked) {
            setSelectedRefunds((prev) => [...prev, invoiceId]);
        } else {
            setSelectedRefunds((prev) => prev.filter((id) => id !== invoiceId));
        }
    };

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

            <div className="flex justify-between items-center mb-5">
                <h2 className="text-[15px] font-semibold text-foreground/90">
                    Refund Management {totalCount > 0 ? `(${totalCount})` : ""}
                </h2>
                {selectedRefunds.length > 0 && (
                    <Button
                        variant="outline"
                        onClick={() => setSelectedRefunds([])}
                        className="h-[34px] text-[12px] font-semibold rounded-[6px] px-3 shadow-sm border-border/80 text-foreground/80 hover:text-foreground"
                    >
                        Clear Selection ({selectedRefunds.length})
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
                    invoices={paginatedRefunds}
                    selectedInvoices={selectedRefunds}
                    onSelectAll={handleSelectAll}
                    onSelectInvoice={handleSelectRefund}
                />
            ) : (
                <BillingGridView invoices={paginatedRefunds} />
            )}

            <div className="pt-4">
                <BillingPagination
                    currentPage={page}
                    totalPages={totalPages || 1}
                    hasNextPage={page < totalPages}
                    hasPrevPage={page > 1}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}
