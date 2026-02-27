"use client";

import { useState } from "react";
import { BillingToolbar } from "./billing-toolbar";
import { BillingFilters } from "./billing-filters";
import { BillingListView } from "./billing-list-view";
import { BillingGridView } from "./billing-grid-view";
import { BillingPagination } from "./billing-pagination";
import { dummyInvoices } from "./data";
import { Button } from "@/components/ui/button";

export function BillingRefunds() {
    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedRefunds, setSelectedRefunds] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    // Filter logic for refunds (status === "Refund")
    const filteredRefunds = dummyInvoices.filter(
        (invoice) =>
            invoice.status === "Refund" &&
            (invoice.patientName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                invoice.invoiceNumber
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                invoice.patientId
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())),
    );

    const totalPages = Math.ceil(filteredRefunds.length / itemsPerPage);
    const paginatedRefunds = filteredRefunds.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage,
    );

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
                    Refund Management
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

            {view === "list" ? (
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
