import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, LayoutGrid, List, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface BillingToolbarProps {
    showFilters: boolean;
    onToggleFilters: () => void;
    view: "list" | "grid";
    onViewChange: (view: "list" | "grid") => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

export function BillingToolbar({
    showFilters,
    onToggleFilters,
    view,
    onViewChange,
    searchQuery,
    onSearchChange,
}: BillingToolbarProps) {
    return (
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between bg-background p-3 rounded-[12px] border border-border/40 shadow-sm">
            <div className="relative flex-1 w-full flex items-center bg-muted/30 border border-transparent rounded-[8px] focus-within:bg-background focus-within:border-border transition-all">
                <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search by name, ID, or phone ..."
                    className="w-full pl-10 h-10 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant={showFilters ? "default" : "outline"}
                    onClick={onToggleFilters}
                    className="h-10 gap-2 px-4 shadow-sm"
                >
                    <Filter
                        className={cn(
                            "h-4 w-4",
                            showFilters
                                ? "text-primary-foreground"
                                : "text-foreground",
                        )}
                    />
                    Filters
                </Button>

                <div className="flex items-center bg-muted/50 p-1 rounded-[8px] border border-border/40">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewChange("list")}
                        className={cn(
                            "h-8 w-8 rounded-[6px]",
                            view === "list"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewChange("grid")}
                        className={cn(
                            "h-8 w-8 rounded-[6px]",
                            view === "grid"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )}
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
