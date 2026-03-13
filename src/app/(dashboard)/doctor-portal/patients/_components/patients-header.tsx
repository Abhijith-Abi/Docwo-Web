import { Button } from "@/components/ui/button";
import { Download, Plus, RefreshCw } from "lucide-react";

export function PatientsHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage and view Patient records
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Button
                    variant="default"
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
                    <span className="hidden sm:inline">Export Data</span>
                    <Download className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
