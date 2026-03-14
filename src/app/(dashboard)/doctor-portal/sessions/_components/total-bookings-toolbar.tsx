"use client";

import { Search, Filter, List, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface TotalBookingsToolbarProps {
    showFilters: boolean;
    onToggleFilters: () => void;
    view: "list" | "grid";
    onViewChange: (view: "list" | "grid") => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function TotalBookingsToolbar({
    showFilters,
    onToggleFilters,
    view,
    onViewChange,
    searchQuery,
    onSearchChange,
}: TotalBookingsToolbarProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                    placeholder="Search by patient name, ID, or phone ..."
                    className="pl-9 bg-muted/20 border-border/50 focus-visible:ring-primary/20 h-10 w-full rounded-md shadow-sm transition-all"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Button
                    variant={showFilters ? "default" : "outline"}
                    onClick={onToggleFilters}
                    className={cn(
                        "h-10 gap-2 px-4 shadow-sm font-bold text-xs uppercase tracking-wider rounded-md transition-all",
                        showFilters ? "bg-primary text-primary-foreground" : "border-border/80 text-foreground hover:bg-muted/50"
                    )}
                >
                    <Filter className="h-3.5 w-3.5" />
                    Filters
                </Button>
                <ToggleGroup
                    type="single"
                    value={view}
                    onValueChange={(v) =>
                        v && onViewChange(v as "list" | "grid")
                    }
                    className="bg-muted/30 border border-border/50 rounded-md h-10 p-1 flex shadow-sm shrink-0"
                >
                    <ToggleGroupItem
                        value="list"
                        aria-label="List view"
                        className="h-full px-3 data-[state=on]:bg-background data-[state=on]:shadow-sm rounded-sm transition-all"
                    >
                        <List className="h-4 w-4 text-muted-foreground data-[state=on]:text-primary" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="grid"
                        aria-label="Grid view"
                        className="h-full px-3 data-[state=on]:bg-background data-[state=on]:shadow-sm rounded-sm transition-all"
                    >
                        <LayoutGrid className="h-4 w-4 text-muted-foreground data-[state=on]:text-primary" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </div>
    );
}
