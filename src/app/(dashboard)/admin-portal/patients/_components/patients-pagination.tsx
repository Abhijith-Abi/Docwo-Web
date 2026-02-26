import { SharedPagination } from "@/components/customize-components/shared-pagination";

interface PatientsPaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    onPageChange: (page: number) => void;
}

export function PatientsPagination({
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    onPageChange,
}: PatientsPaginationProps) {
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
