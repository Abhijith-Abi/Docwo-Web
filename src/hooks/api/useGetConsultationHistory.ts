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

            const mappedData = (response?.data ?? []).map((session: any) => {
                const appointments = session.appointments || [];
                const patients_seen = appointments.filter(
                    (a: any) => a.status === "completed"
                ).length;
                const total_appointments = appointments.length;

                // Sort appointments by start time
                const sortedAppointments = [...appointments].sort(
                    (a: any, b: any) => {
                        const parseTime = (timeStr: string) => {
                            if (!timeStr) return 0;
                            const match = timeStr.match(/(\d+):(\d+)\s+(AM|PM)/i);
                            if (!match) return 0;
                            let h = parseInt(match[1], 10);
                            const m = parseInt(match[2], 10);
                            const modifier = match[3].toUpperCase();
                            if (h === 12 && modifier === "AM") h = 0;
                            if (modifier === "PM" && h < 12) h += 12;
                            return h * 60 + m;
                        };
                        const startA = a.formatted_time
                            ? parseTime(a.formatted_time.split(" - ")[0])
                            : 0;
                        const startB = b.formatted_time
                            ? parseTime(b.formatted_time.split(" - ")[0])
                            : 0;
                        return startA - startB;
                    }
                );

                let schedule_time = "—";
                if (sortedAppointments.length > 0) {
                    const firstApt = sortedAppointments[0];
                    const lastApt =
                        sortedAppointments[sortedAppointments.length - 1];
                    const startTime = firstApt.formatted_time
                        ? firstApt.formatted_time.split(" - ")[0]
                        : "";
                    const endTime = lastApt.formatted_time
                        ? lastApt.formatted_time.split(" - ")[1] ||
                          lastApt.formatted_time.split(" - ")[0]
                        : "";
                    if (startTime && endTime && startTime !== endTime) {
                        schedule_time = `${startTime} - ${endTime}`;
                    } else if (startTime) {
                        schedule_time = startTime;
                    }
                }

                let sessionStatus = "completed";
                if (
                    appointments.some(
                        (a: any) =>
                            a.status === "pending" ||
                            a.status === "confirmed" ||
                            a.status === "ongoing"
                    )
                ) {
                    sessionStatus = "ongoing";
                }

                return {
                    ...session,
                    appointments: sortedAppointments,
                    date: session.session_date,
                    schedule_time,
                    patients_seen,
                    total_appointments,
                    status: sessionStatus,
                };
            });

            return {
                data: mappedData,
                pagination: response?.pagination || null,
            };
        },
    });
}
