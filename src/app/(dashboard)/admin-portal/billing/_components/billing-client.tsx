"use client";

import { useState } from "react";
import { BillingHeader } from "./billing-header";
import { BillingStatCards } from "./billing-stat-cards";
import { BillingTabs } from "./billing-tabs";
import { BillingToolbar } from "./billing-toolbar";
import { BillingFilters } from "./billing-filters";
import { BillingListView } from "./billing-list-view";
import { BillingGridView } from "./billing-grid-view";
import { dummyInvoices } from "./data";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BillingPagination } from "./billing-pagination";
import { Button } from "@/components/ui/button";

export function BillingClient() {
    const [view, setView] = useState<"list" | "grid">("list");
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    // Filter logic placeholder (using dummy data)
    const filteredInvoices = dummyInvoices.filter(
        (invoice) =>
            invoice.patientName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            invoice.invoiceNumber
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            invoice.patientId.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
    const paginatedInvoices = filteredInvoices.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage,
    );

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
            <BillingStatCards />

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

                    <div className="border border-border/40 bg-card rounded-[12px] shadow-sm p-5">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-[15px] font-semibold text-foreground/90">
                                Invoice Management
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

                        {view === "list" ? (
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
                    </div>
                </TabsContent>

                <TabsContent
                    value="analytics"
                    className="m-0 mt-4 border border-border/40 bg-card rounded-[12px] shadow-sm p-8 text-center text-muted-foreground"
                >
                    Analytics Dashboard (Coming Soon)
                </TabsContent>

                <TabsContent
                    value="refunds"
                    className="m-0 mt-4 border border-border/40 bg-card rounded-[12px] shadow-sm p-8 text-center text-muted-foreground"
                >
                    Refunds Management (Coming Soon)
                </TabsContent>
            </Tabs>
        </div>
    );
}
