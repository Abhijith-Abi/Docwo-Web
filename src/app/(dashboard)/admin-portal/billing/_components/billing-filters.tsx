import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function BillingFilters() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">Date</Label>
                <Select defaultValue="today">
                    <SelectTrigger className="w-full bg-muted/30 border-none h-10 shadow-sm">
                        <SelectValue placeholder="Select Date" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="this_week">This Week</SelectItem>
                        <SelectItem value="this_month">This Month</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground ml-1">
                    Doctor
                </Label>
                <Select defaultValue="all">
                    <SelectTrigger className="w-full h-10 bg-background border-border/60 text-sm">
                        <SelectValue placeholder="Select Doctor" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">All Doctors</SelectItem>
                        <SelectItem value="dr_rajesh">
                            Dr. Rajesh Kumar
                        </SelectItem>
                        <SelectItem value="dr_priya">
                            Dr. Priya Sharma
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">
                    Payment Status
                </Label>
                <Select defaultValue="all">
                    <SelectTrigger className="w-full bg-muted/30 border-none h-10 shadow-sm">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="refund">Refund</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold px-1">
                    Payments methods
                </Label>
                <Select defaultValue="all">
                    <SelectTrigger className="w-full bg-muted/30 border-none h-10 shadow-sm">
                        <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="direct">Direct</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
