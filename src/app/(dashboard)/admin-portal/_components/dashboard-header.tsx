import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardHeader({
    onToggleFilters,
    isFiltersActive,
}: {
    onToggleFilters?: () => void;
    isFiltersActive?: boolean;
}) {
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
                    variant={isFiltersActive ? "default" : "outline"}
                    size="sm"
                    className="h-9 gap-2 font-medium transition-all duration-200"
                    onClick={onToggleFilters}
                >
                    <Filter className="w-4 h-4" />
                    Filters
                </Button>
                <Button
                    variant="default"
                    size="sm"
                    className="h-9 gap-2 font-medium"
                >
                    Export Data
                    <Download className="w-4 h-4 ml-0.5" />
                </Button>
            </div>
        </div>
    );
}
