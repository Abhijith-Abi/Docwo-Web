import { SharedPagination } from "@/components/customize-components/shared-pagination";

interface ManagementPaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    onPageChange: (page: number) => void;
}

export function ManagementPagination({
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    onPageChange,
}: ManagementPaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <SharedPagination
            className="pb-8"
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPageChange={onPageChange}
        />
    );
}
