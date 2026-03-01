import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Printer, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Invoice, formatCurrency } from "./data";
import { cn } from "@/lib/utils";

export function BillingListView({
    invoices,
    selectedInvoices,
    onSelectAll,
    onSelectInvoice,
}: {
    invoices: Invoice[];
    selectedInvoices: string[];
    onSelectAll: (checked: boolean) => void;
    onSelectInvoice: (invoiceId: string, checked: boolean) => void;
}) {
    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden overflow-x-auto w-full animate-in fade-in duration-300 shadow-sm mt-3">
            <Table className="min-w-[1000px]">
                <TableHeader className="bg-blue-50/50 hover:bg-blue-50/50">
                    <TableRow className="border-b-border/60">
                        <TableHead className="w-12 text-center p-0 align-middle">
                            {invoices && invoices.length > 0 && (
                                <div className="px-4 py-3 h-full flex items-center justify-center">
                                    <Checkbox
                                        aria-label="Select all"
                                        className="rounded-[4px] border-muted-foreground/40"
                                        checked={
                                            invoices.length > 0 &&
                                            selectedInvoices.length ===
                                                invoices.length
                                        }
                                        onCheckedChange={(checked) =>
                                            onSelectAll(!!checked)
                                        }
                                    />
                                </div>
                            )}
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Invoice Number
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Date and Time
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Patient
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Doctor
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Specialization
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Amount
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Status
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Payment Method
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm pr-6 text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!invoices || invoices.length === 0 ? (
                        <TableRow className="hover:bg-transparent">
                            <TableCell
                                colSpan={10}
                                className="h-[300px] text-center align-middle"
                            >
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
                                    <span className="text-[13px] text-muted-foreground ">
                                        We couldn&apos;t find any invoices
                                        matching your current filters.
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        invoices.map((invoice, index) => (
                            <TableRow
                                key={`invoice-${invoice.id}-${index}`}
                                className="border-b-border/50 bg-background hover:bg-background even:bg-muted/30 even:hover:bg-muted/30 h-[88px]"
                            >
                                <TableCell className="p-0 text-center align-top">
                                    <div className="px-4 pt-5 pb-3 h-full flex justify-center">
                                        <Checkbox
                                            aria-label={`Select invoice ${invoice.invoiceNumber}`}
                                            className="rounded-[4px] border-muted-foreground/40 data-[state=checked]:bg-primary h-4 w-4"
                                            checked={selectedInvoices.includes(
                                                invoice.id,
                                            )}
                                            onCheckedChange={(checked) =>
                                                onSelectInvoice(
                                                    invoice.id,
                                                    !!checked,
                                                )
                                            }
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 align-top">
                                    <div className="font-semibold text-[14px] text-foreground/90">
                                        {invoice.invoiceNumber}
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 align-top">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="text-[14px] text-foreground/90 font-medium">
                                            {invoice.date}
                                        </div>
                                        <div className="text-[13px] text-muted-foreground">
                                            {invoice.time}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 align-top">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="font-medium text-[14px] text-foreground/90">
                                            {invoice.patientName}
                                        </div>
                                        <div className="text-[13px] text-muted-foreground">
                                            {invoice.patientId}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 text-[14px] text-foreground/90 font-medium align-top">
                                    {invoice.doctorName}
                                </TableCell>
                                <TableCell className="py-4 text-[14px] font-medium text-foreground/80 align-top">
                                    {invoice.specialization}
                                </TableCell>
                                <TableCell className="py-4 text-[14px] font-medium text-foreground/90 align-top">
                                    {formatCurrency(invoice.amount)}
                                </TableCell>
                                <TableCell className="py-4 align-top">
                                    <Badge
                                        variant="secondary"
                                        className={cn(
                                            "capitalize font-semibold text-[11px] px-2.5 py-0.5 rounded-[4px] min-w-[60px] justify-center",
                                            invoice.status === "Paid" &&
                                                "bg-[#a7f3d0] text-[#059669] hover:bg-[#a7f3d0]/80",
                                            invoice.status === "Refund" &&
                                                "bg-[#fecaca] text-[#dc2626] hover:bg-[#fecaca]/80",
                                        )}
                                    >
                                        {invoice.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-4 align-top">
                                    <Badge
                                        variant="outline"
                                        className="font-semibold text-[11px] px-3 py-0.5 rounded-[12px] min-w-[60px] justify-center border-border/60 text-foreground/90 bg-background"
                                    >
                                        {invoice.paymentMethod}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-4 pr-6 text-right align-top">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-full ml-auto"
                                    >
                                        <Printer className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
