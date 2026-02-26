import { SharedPagination } from "@/components/customize-components/shared-pagination";

interface BillingPaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    onPageChange: (page: number) => void;
}

export function BillingPagination({
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    onPageChange,
}: BillingPaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <SharedPagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPageChange={onPageChange}
        />
    );
}
