import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Reply } from "lucide-react";
import Image from "next/image";

interface ManagementHeaderProps {
    activeTab: "doctors" | "staffs";
}

export function ManagementHeader({ activeTab }: ManagementHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Doctors & Staff Management
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage all doctors and staff across your clinic locations
                </p>
            </div>
            <div className="flex items-center gap-3 mt-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-md shrink-0"
                    aria-label="Refresh"
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                    variant="default"
                    className="h-9 gap-2 rounded-md shrink-0 shadow-sm"
                >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">
                        {activeTab === "doctors"
                            ? "Add Doctor orStaff"
                            : "Add Staff"}
                    </span>
                </Button>
                <Button
                    variant="outline"
                    className="h-9 gap-2 rounded-md shrink-0 shadow-sm"
                >
                    <span className="hidden sm:inline">Export Data</span>
                    <Reply className="h-4 w-4 rotate-180 scale-y-[-1]" />
                </Button>
            </div>
        </div>
    );
}
