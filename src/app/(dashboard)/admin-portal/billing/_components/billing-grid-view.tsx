import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Invoice, formatCurrency } from "./data";
import { cn } from "@/lib/utils";

export function BillingGridView({ invoices }: { invoices: Invoice[] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6 pt-2 animate-in fade-in duration-300">
            {invoices.map((invoice, index) => (
                <Card
                    key={`invoice-grid-${invoice.id}-${index}`}
                    className="shadow-sm border-border/60 rounded-[12px] overflow-hidden"
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
                                <div className="text-muted-foreground">
                                    Amount:
                                </div>
                                <div className="font-bold text-[16px] text-foreground">
                                    {formatCurrency(invoice.amount)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div className="text-muted-foreground text-[11px] mb-0.5">
                                        Patient
                                    </div>
                                    <div className="font-semibold text-foreground/90">
                                        {invoice.patientName}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground">
                                        {invoice.patientId}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground text-[11px] mb-0.5">
                                        Doctor
                                    </div>
                                    <div className="font-medium text-foreground/80">
                                        {invoice.doctorName}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-border/30">
                                <div className="text-[12px] text-muted-foreground">
                                    {invoice.specialization}
                                </div>
                                <Badge
                                    variant="outline"
                                    className="font-semibold text-[10px] px-2 py-0 rounded-[12px] border-border/60 text-muted-foreground bg-muted/20"
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
