"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SharedPaginationProps {
    currentPage?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    onPageChange?: (page: number) => void;
    className?: string;
}

export function SharedPagination({
    currentPage = 1,
    totalPages = 12,
    hasNextPage,
    hasPrevPage,
    onPageChange,
    className,
}: SharedPaginationProps) {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const delta = 1;
        const left = currentPage - delta;
        const right = currentPage + delta;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i <= 3 || // Show at least first 3
                i >= totalPages - 2 || // Show at least last 3
                (i >= currentPage - 1 && i <= currentPage + 1) // Show current and neighbors
            ) {
                range.push(i);
            }
        }

        for (const i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const pages = getVisiblePages();

    // Determine arrow visibility based on logical boundaries if hasPrevPage doesn't exist
    const showPrev = hasPrevPage !== undefined ? hasPrevPage : currentPage > 1;
    const showNext =
        hasNextPage !== undefined ? hasNextPage : currentPage < totalPages;

    return (
        <div
            className={cn(
                "mt-6 flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 gap-y-4",
                className,
            )}
        >
            {showPrev && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            )}

            <div className="flex items-center gap-1">
                {pages.map((p, index) => {
                    if (p === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-1 text-muted-foreground font-semibold tracking-widest"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNumber = p as number;
                    const isActive = currentPage === pageNumber;

                    return (
                        <Button
                            key={`page-${pageNumber}`}
                            variant={isActive ? "default" : "outline"}
                            className={cn(
                                "h-9 w-9 sm:w-10 sm:h-10 text-[14px] sm:text-base font-semibold p-0",
                                isActive
                                    ? "border-none bg-black text-white hover:bg-black/90"
                                    : "rounded-md border-muted shadow-sm bg-background",
                            )}
                            onClick={() => onPageChange?.(pageNumber)}
                        >
                            {pageNumber}
                        </Button>
                    );
                })}
            </div>

            {showNext && (
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
            )}
        </div>
    );
}
