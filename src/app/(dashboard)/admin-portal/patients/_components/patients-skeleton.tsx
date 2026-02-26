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

export function PatientsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6 pt-2 animate-pulse">
            {Array.from({ length: 12 }).map((_, i) => (
                <Card
                    key={`grid-skeleton-${i}`}
                    className="rounded-[10px] shadow-sm border border-border/80"
                >
                    <CardContent className="p-5">
                        <div className="flex items-start gap-4 mb-5">
                            <Skeleton className="mt-2.5 rounded-[4px] h-4 w-4 shrink-0" />
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-[8px]" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mt-1 px-0.5">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-10" />
                            </div>
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-6" />
                            </div>
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 mt-6">
                            <Skeleton className="h-[36px] flex-1 rounded-md" />
                            <Skeleton className="h-[36px] w-[110px] rounded-md shrink-0" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export function PatientsListSkeleton() {
    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden animate-pulse shadow-sm mt-3">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow className="border-b-border/60">
                        <TableHead className="w-12 px-4"></TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="h-[52px]">
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="h-[52px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <TableRow
                            key={`list-skeleton-${i}`}
                            className="border-b-border/50"
                        >
                            <TableCell className="p-0 text-center align-middle">
                                <div className="px-4 py-3 h-full flex items-center justify-center">
                                    <Skeleton className="h-4 w-4 rounded-[4px]" />
                                </div>
                            </TableCell>
                            <TableCell className="py-3.5">
                                <Skeleton className="h-4 w-32 mb-1.5" />
                                <Skeleton className="h-3 w-16" />
                            </TableCell>
                            <TableCell className="py-3.5">
                                <Skeleton className="h-4 w-10" />
                            </TableCell>
                            <TableCell className="py-3.5">
                                <Skeleton className="h-4 w-6" />
                            </TableCell>
                            <TableCell className="py-3.5">
                                <Skeleton className="h-4 w-28 mb-1.5" />
                                <Skeleton className="h-3 w-36" />
                            </TableCell>
                            <TableCell className="py-3.5">
                                <Skeleton className="h-4 w-20" />
                            </TableCell>
                            <TableCell className="py-3.5">
                                <Skeleton className="h-4 w-6" />
                            </TableCell>
                            <TableCell className="py-3.5">
                                <Skeleton className="h-4 w-32" />
                            </TableCell>
                            <TableCell className="py-3.5 text-center">
                                <div className="flex justify-center">
                                    <Skeleton className="h-8 w-8 rounded-[4px]" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
