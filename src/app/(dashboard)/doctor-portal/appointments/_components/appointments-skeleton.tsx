import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function AppointmentsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 animate-pulse pt-3">
            {Array.from({ length: 12 }).map((_, i) => (
                <Card
                    key={`grid-skeleton-${i}`}
                    className="rounded-[10px] shadow-sm border border-border/80"
                >
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>

                        <div className="space-y-4 mt-1">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t flex justify-end">
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export function AppointmentsListSkeleton() {
    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden animate-pulse shadow-sm mt-3">
            <Table>
                <TableHeader className="bg-blue-50/50">
                    <TableRow className="border-b-border/60">
                        <TableHead className="h-[52px] w-[20%] pl-6">
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                        <TableHead className="h-[52px] w-[20%]">
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                        <TableHead className="h-[52px] w-[15%]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="h-[52px] w-[25%]">
                            <Skeleton className="h-4 w-28" />
                        </TableHead>
                        <TableHead className="h-[52px] w-[20%] pr-6">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <TableRow
                            key={`list-skeleton-${i}`}
                            className="border-b-border/50 bg-background even:bg-muted/30"
                        >
                            <TableCell className="py-4 pl-6">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </TableCell>
                            <TableCell className="py-4">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </TableCell>
                            <TableCell className="py-4">
                                <Skeleton className="h-4 w-12" />
                            </TableCell>
                            <TableCell className="py-4">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-36" />
                                </div>
                            </TableCell>
                            <TableCell className="py-4 pr-6">
                                <Skeleton className="h-5 w-20 rounded-md" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
