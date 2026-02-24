import { SharedPagination } from "@/components/customize-components/shared-pagination";

export function ManagementPagination() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <SharedPagination className="mt-0" />
        </div>
    );
}
