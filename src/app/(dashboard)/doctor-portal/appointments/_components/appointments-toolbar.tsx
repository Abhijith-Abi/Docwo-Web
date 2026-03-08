"use client";

import { Search, Filter, List, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface AppointmentsToolbarProps {
    showFilters: boolean;
    onToggleFilters: () => void;
    view: "list" | "grid";
    onViewChange: (view: "list" | "grid") => void;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

export function AppointmentsToolbar({
    showFilters,
    onToggleFilters,
    view,
    onViewChange,
    searchQuery,
    onSearchChange,
}: AppointmentsToolbarProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name, ID, or phone ..."
                    className="pl-9 bg-muted/30 border-none h-10 w-full rounded-md shadow-sm"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
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
                <ToggleGroup
                    type="single"
                    value={view}
                    onValueChange={(v) =>
                        v && onViewChange(v as "list" | "grid")
                    }
                    className="bg-background border rounded-md h-10 p-1 flex shadow-sm shrink-0"
                >
                    <ToggleGroupItem
                        value="list"
                        aria-label="List view"
                        className="h-full px-2.5 data-[state=on]:bg-muted rounded-sm"
                    >
                        <List className="h-4 w-4 text-muted-foreground data-[state=on]:text-foreground" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="grid"
                        aria-label="Grid view"
                        className="h-full px-2.5 data-[state=on]:bg-muted rounded-sm"
                    >
                        <LayoutGrid className="h-4 w-4 text-muted-foreground data-[state=on]:text-foreground" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </div>
    );
}
