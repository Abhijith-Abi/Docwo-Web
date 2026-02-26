import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BillingTabs() {
    return (
        <div className="w-full bg-muted/30 border border-border/40 rounded-[10px] p-1.5 mb-6 overflow-x-auto no-scrollbar">
            <TabsList className="w-full sm:w-auto inline-flex h-[42px] bg-transparent p-0">
                <TabsTrigger
                    value="invoices"
                    className="flex-1 rounded-[6px] data-[state=active]:bg-background data-[state=active]:shadow-sm text-sm font-medium"
                >
                    Invoices
                </TabsTrigger>
                <TabsTrigger
                    value="analytics"
                    className="flex-1 rounded-[6px] data-[state=active]:bg-background data-[state=active]:shadow-sm text-sm font-medium"
                >
                    Analytics
                </TabsTrigger>
                <TabsTrigger
                    value="refunds"
                    className="flex-1 rounded-[6px] data-[state=active]:bg-background data-[state=active]:shadow-sm text-sm font-medium"
                >
                    Refunds
                </TabsTrigger>
            </TabsList>
        </div>
    );
}
