import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Invoice, formatCurrency } from "./data";
import { cn } from "@/lib/utils";

export function BillingGridView({ invoices }: { invoices: Invoice[] }) {
    if (!invoices || invoices.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-card rounded-[10px] border border-border/60 shadow-sm mt-3 animate-in fade-in duration-300">
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                        <FileText
                            className="h-6 w-6 text-muted-foreground"
                            strokeWidth={1.5}
                        />
                    </div>
                    <span className="text-[15px] font-semibold text-foreground mb-1">
                        No invoices found
                    </span>
                    <span className="text-[13px] text-muted-foreground max-w-[250px] text-center">
                        We couldn&apos;t find any invoices matching your current
                        filters.
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6 pt-2 animate-in fade-in duration-300">
            {invoices.map((invoice, index) => (
                <Card
                    key={`invoice-grid-${invoice.id}-${index}`}
                    className="shadow-sm border border-border/80 rounded-[10px] overflow-hidden"
                >
                    <CardContent className="p-0">
                        {/* Header */}
                        <div className="p-4 border-b border-border/40 flex justify-between items-start bg-muted/10">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-[14px] text-foreground">
                                        {invoice.invoiceNumber}
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className={cn(
                                            "capitalize font-semibold text-[10px] px-2 py-0 rounded-[4px]",
                                            invoice.status === "Paid" &&
                                                "bg-[#a7f3d0] text-[#059669] hover:bg-[#a7f3d0]/80",
                                            invoice.status === "Refund" &&
                                                "bg-[#fecaca] text-[#dc2626] hover:bg-[#fecaca]/80",
                                        )}
                                    >
                                        {invoice.status}
                                    </Badge>
                                </div>
                                <div className="flex gap-2 text-[12px] text-muted-foreground font-medium">
                                    <span>{invoice.date}</span>
                                    <span>•</span>
                                    <span>{invoice.time}</span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-full"
                            >
                                <Printer className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                        </div>

                        {/* Body */}
                        <div className="p-4 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <div className="text-foreground font-medium text-[14px] shrink-0">
                                    Amount:
                                </div>
                                <div className="font-bold text-[16px] text-foreground">
                                    {formatCurrency(invoice.amount)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div className="text-foreground font-medium text-[14px] mb-0.5 shrink-0">
                                        Patient
                                    </div>
                                    <div className="font-medium text-[14px] text-foreground">
                                        {invoice.patientName}
                                    </div>
                                    <div className="text-[14px] font-medium text-foreground mt-0.5">
                                        {invoice.patientId}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-foreground font-medium text-[14px] mb-0.5 shrink-0">
                                        Doctor
                                    </div>
                                    <div className="font-medium text-[14px] text-foreground">
                                        {invoice.doctorName}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-border/30">
                                <div className="text-[14px] text-foreground font-medium">
                                    {invoice.specialization}
                                </div>
                                <Badge
                                    variant="outline"
                                    className="font-bold text-[12px] px-2 py-0.5 rounded-[4px] border-none shadow-sm gap-1 bg-background"
                                >
                                    {invoice.paymentMethod}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
