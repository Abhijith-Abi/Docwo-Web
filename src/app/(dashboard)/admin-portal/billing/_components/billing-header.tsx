import { Button } from "@/components/ui/button";
import { Download, RefreshCcw } from "lucide-react";

export function BillingHeader() {
    return (
        <div className="flex flex-col sm:flex-row md:justify-between items-start sm:items-center gap-4 mb-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Billings and Payments
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Comprehensive financial management and analytics
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-md shrink-0 shadow-sm"
                >
                    <RefreshCcw className="h-4 w-4 text-foreground/80" />
                </Button>
                <Button
                    variant="default"
                    className="h-9 gap-2 rounded-md shrink-0 shadow-sm"
                >
                    <span className="hidden sm:inline">Export Data</span>
                    <Download className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
