"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SharedPaginationProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    className?: string;
}

export function SharedPagination({
    currentPage = 1,
    totalPages = 12,
    onPageChange,
    className,
}: SharedPaginationProps) {
    return (
        <div
            className={cn(
                "mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-4",
                className,
            )}
        >
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
                <Button
                    variant={currentPage === 1 ? "default" : "outline"}
                    className={cn(
                        "h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold p-0",
                        currentPage === 1
                            ? "border-none bg-black text-white hover:bg-black/90"
                            : "rounded-md border-muted shadow-sm bg-background",
                    )}
                    onClick={() => onPageChange?.(1)}
                >
                    1
                </Button>

                <Button
                    variant={currentPage === 2 ? "default" : "outline"}
                    className={cn(
                        "h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold p-0",
                        currentPage === 2
                            ? "border-none bg-black text-white hover:bg-black/90"
                            : "rounded-md border-muted shadow-sm bg-background",
                    )}
                    onClick={() => onPageChange?.(2)}
                >
                    2
                </Button>

                <Button
                    variant={currentPage === 3 ? "default" : "outline"}
                    className={cn(
                        "h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold p-0",
                        currentPage === 3
                            ? "border-none bg-black text-white hover:bg-black/90"
                            : "rounded-md border-muted shadow-sm bg-background",
                    )}
                    onClick={() => onPageChange?.(3)}
                >
                    3
                </Button>

                <Button
                    variant={currentPage === 4 ? "default" : "outline"}
                    className={cn(
                        "h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold p-0",
                        currentPage === 4
                            ? "border-none bg-black text-white hover:bg-black/90"
                            : "rounded-md border-muted shadow-sm bg-background",
                    )}
                    onClick={() => onPageChange?.(4)}
                >
                    4
                </Button>

                <span className="px-1 text-muted-foreground font-semibold tracking-widest">
                    ...
                </span>

                <Button
                    variant={
                        currentPage === totalPages - 2 ? "default" : "outline"
                    }
                    className={cn(
                        "h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background hidden sm:inline-flex",
                        currentPage === totalPages - 2
                            ? "border-none bg-black text-white hover:bg-black/90"
                            : "",
                    )}
                    onClick={() => onPageChange?.(totalPages - 2)}
                >
                    {totalPages - 2}
                </Button>

                <Button
                    variant={
                        currentPage === totalPages - 1 ? "default" : "outline"
                    }
                    className={cn(
                        "h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background hidden sm:inline-flex",
                        currentPage === totalPages - 1
                            ? "border-none bg-black text-white hover:bg-black/90"
                            : "",
                    )}
                    onClick={() => onPageChange?.(totalPages - 1)}
                >
                    {totalPages - 1}
                </Button>

                <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    className={cn(
                        "h-9 w-9 sm:w-10 sm:h-10 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background",
                        currentPage === totalPages
                            ? "border-none bg-black text-white hover:bg-black/90"
                            : "",
                    )}
                    onClick={() => onPageChange?.(totalPages)}
                >
                    {totalPages}
                </Button>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() =>
                    onPageChange?.(Math.min(totalPages, currentPage + 1))
                }
            >
                <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-3 ml-2 sm:ml-4 border-l pl-4 sm:pl-6">
                <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    Goto Page
                </span>
                <div className="flex items-center">
                    <Button
                        variant="outline"
                        className="h-9 min-w-14 text-base font-semibold rounded-md border-muted p-0 shadow-sm bg-background gap-1 flex justify-between px-3"
                    >
                        5{" "}
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
