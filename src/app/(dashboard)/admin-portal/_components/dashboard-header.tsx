import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

export function DashboardHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Dashboard
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Comprehensive insights for your appointment management
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 text-slate-600 font-medium bg-white"
                >
                    <Filter className="w-4 h-4" />
                    Filters
                </Button>
                <Button
                    size="sm"
                    className="h-9 gap-2 bg-[#1B5041] hover:bg-[#143c31] text-white font-medium"
                >
                    Export Data
                    <Download className="w-4 h-4 ml-0.5" />
                </Button>
            </div>
        </div>
    );
}
