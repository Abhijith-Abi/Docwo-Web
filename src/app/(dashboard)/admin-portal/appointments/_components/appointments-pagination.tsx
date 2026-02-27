import { SharedPagination } from "@/components/customize-components/shared-pagination";

interface AppointmentsPaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    onPageChange: (page: number) => void;
}

export function AppointmentsPagination({
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    onPageChange,
}: AppointmentsPaginationProps) {
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
