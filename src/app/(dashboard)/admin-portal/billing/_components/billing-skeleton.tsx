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

export function BillingGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse mt-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <Card
                    key={`grid-skeleton-${i}`}
                    className="rounded-[12px] shadow-sm border border-border/80"
                >
                    <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </div>

                        <div className="space-y-4 grow">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-20" />
                            </div>

                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-40" />
                            </div>

                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-28" />
                            </div>

                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-36" />
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t flex justify-between items-center">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export function BillingListSkeleton() {
    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden overflow-x-auto w-full animate-pulse shadow-sm mt-3">
            <Table className="min-w-[1000px]">
                <TableHeader className="bg-blue-50/50">
                    <TableRow className="border-b-border/60">
                        <TableHead className="w-12 text-center p-0 align-middle">
                            <div className="px-4 py-3 h-full flex items-center justify-center">
                                <Skeleton className="h-4 w-4 rounded-[4px]" />
                            </div>
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-28" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-32" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                        <TableHead className="h-[52px] pr-6">
                            <Skeleton className="h-4 w-8 ml-auto" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <TableRow
                            key={`list-skeleton-${i}`}
                            className="border-b-border/50 bg-background even:bg-muted/30 h-[88px]"
                        >
                            <TableCell className="p-0 text-center align-top">
                                <div className="px-4 pt-5 pb-3 h-full flex justify-center">
                                    <Skeleton className="h-4 w-4 rounded-[4px]" />
                                </div>
                            </TableCell>
                            <TableCell className="py-4 align-top">
                                <Skeleton className="h-4 w-20" />
                            </TableCell>
                            <TableCell className="py-4 align-top">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </TableCell>
                            <TableCell className="py-4 align-top">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </TableCell>
                            <TableCell className="py-4 align-top">
                                <Skeleton className="h-4 w-28" />
                            </TableCell>
                            <TableCell className="py-4 align-top">
                                <Skeleton className="h-4 w-24" />
                            </TableCell>
                            <TableCell className="py-4 align-top">
                                <Skeleton className="h-4 w-16" />
                            </TableCell>
                            <TableCell className="py-4 align-top">
                                <Skeleton className="h-5 w-16 rounded-[4px]" />
                            </TableCell>
                            <TableCell className="py-4 align-top">
                                <Skeleton className="h-5 w-24 rounded-[12px]" />
                            </TableCell>
                            <TableCell className="py-4 pr-6 align-top">
                                <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
