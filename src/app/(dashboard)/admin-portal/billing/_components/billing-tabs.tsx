import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BillingTabs() {
    return (
        <div className="bg-muted/40 p-1.5 rounded-[12px] w-full border shadow-sm overflow-x-auto no-scrollbar mb-6">
            <TabsList className="w-full min-w-[340px] h-10 bg-transparent p-0 justify-start gap-2 flex">
                <TabsTrigger
                    value="invoices"
                    className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm text-[13px] font-semibold h-full rounded-md text-muted-foreground data-[state=active]:text-foreground transition-all"
                >
                    Invoices
                </TabsTrigger>
                <TabsTrigger
                    value="analytics"
                    className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm text-[13px] font-semibold h-full rounded-md text-muted-foreground data-[state=active]:text-foreground transition-all"
                >
                    Analytics
                </TabsTrigger>
                <TabsTrigger
                    value="refunds"
                    className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm text-[13px] font-semibold h-full rounded-md text-muted-foreground data-[state=active]:text-foreground transition-all"
                >
                    Refunds
                </TabsTrigger>
            </TabsList>
        </div>
    );
}
