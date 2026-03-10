import { ConsultationHistoryCard } from "./consultation-history-card";
import { SharedPagination } from "@/components/customize-components/shared-pagination";
import { Calendar } from "lucide-react";

interface ConsultationGridViewProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appointments: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pagination?: any;
    currentPage: number;
    onPageChange: (page: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onViewDetails?: (appointment: any) => void;
    totalCount: number;
}

export function ConsultationGridView({
    appointments,
    pagination,
    currentPage,
    onPageChange,
    onViewDetails,
    totalCount,
}: ConsultationGridViewProps) {
    return (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            {/* Row count */}
            <div className="flex items-center justify-between pl-1">
                <span className="text-[15px] font-semibold text-foreground">
                    Consultation History ({totalCount})
                </span>
            </div>

            {/* Grid */}
            {!appointments || appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-card rounded-[12px] border border-border/60 shadow-sm mt-3 w-full min-h-[300px]">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                        <Calendar
                            className="h-6 w-6 text-muted-foreground"
                            strokeWidth={1.5}
                        />
                    </div>
                    <span className="text-[15px] font-semibold text-foreground block mb-1">
                        No consultation history
                    </span>
                    <span className="text-[13px] text-muted-foreground">
                        Past consultations will appear here.
                    </span>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6 pt-2">
                    {appointments?.[0]?.appointments?.map(
                        (apt: any, index: number) => (
                            <ConsultationHistoryCard
                                key={`grid-ch-${apt?.appointment_id || index}-${index}`}
                                appointment={apt}
                                onViewDetails={onViewDetails}
                            />
                        ),
                    )}
                </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="pt-2">
                    <SharedPagination
                        currentPage={currentPage}
                        totalPages={pagination.totalPages}
                        hasNextPage={pagination.hasNextPage}
                        hasPrevPage={pagination.hasPrevPage}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
}
