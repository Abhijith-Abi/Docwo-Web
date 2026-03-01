import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, FileX2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataStateProps {
    title?: string;
    description?: string;
    className?: string;
}

export function DataErrorState({
    title = "Failed to load data",
    description = "Please try refreshing the page later.",
    className,
}: DataStateProps) {
    return (
        <Card
            className={cn(
                "border-dashed border-destructive/50 bg-destructive/5 rounded-[12px] w-full",
                className,
            )}
        >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center min-h-[100px]">
                <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                <p className="text-sm font-medium text-destructive">{title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}

export function DataEmptyState({
    title = "No data available",
    description = "Check back later once information has been added.",
    className,
}: DataStateProps) {
    return (
        <Card
            className={cn(
                "border-dashed border-border/60 bg-muted/20 rounded-[12px] w-full",
                className,
            )}
        >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center min-h-[100px]">
                <FileX2 className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}
