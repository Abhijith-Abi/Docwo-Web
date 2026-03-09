import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

// ─── Status values accepted by this endpoint ──────────────────────────────────
export type ConsultationHistoryStatus =
    | "pending"
    | "confirmed"
    | "cancelled_by_patient"
    | "cancelled_by_doctor"
    | "rescheduled"
    | "completed"
    | "no_show"
    | "all";

// ─── Params ───────────────────────────────────────────────────────────────────
export interface ConsultationHistoryParams {
    page?: number;
    limit?: number;
    status?: ConsultationHistoryStatus;
    date?: string;          // yyyy-MM-dd
    doctorId?: string | number;
    clinicId?: string | number;
}

// ─── API Response types ───────────────────────────────────────────────────────
export interface ConsultationRecord {
    date: string;
    schedule_time: string;
    patients_seen: number;
    total_appointments: number;
    status: string;
    doctor: {
        doctor_id: number;
        name: string;
        specialty: string;
    };
    clinic: {
        clinic_id: number;
        name: string;
    };
    consultation_details: {
        total_duration: string;
        avg_duration: string;
        completion_rate: string;
        total_appointments: number;
        completed_appointments: number;
        cancelled_appointments: number;
        no_show_appointments: number;
    };
}

export interface ConsultationHistoryResponse {
    data: ConsultationRecord[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pagination: any;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useGetConsultationHistory(params?: ConsultationHistoryParams) {
    const { page = 1, limit = 10, status, date, doctorId, clinicId } = params || {};

    return useQuery<ConsultationHistoryResponse>({
        queryKey: [
            "consultation-history",
            page,
            limit,
            status,
            date,
            doctorId,
            clinicId,
        ],
        queryFn: async () => {
            const searchParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (status && status !== "all")
                searchParams.append("status", status);
            if (date) searchParams.append("date", date);
            if (doctorId && doctorId !== "all")
                searchParams.append("doctorId", doctorId.toString());
            if (clinicId && clinicId !== "all")
                searchParams.append("clinicId", clinicId.toString());

            const endpoint = `${API_ENDPOINTS.CONSULTATION_HISTORY}?${searchParams.toString()}`;
            const response = await getApiData(endpoint);

            return {
                data: response?.data ?? [],
                pagination: response?.pagination || null,
            };
        },
    });
}
