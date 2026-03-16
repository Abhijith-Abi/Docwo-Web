import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export interface QueuePatient {
    appointment_id: string;
    token_number: number;
    token_status: string;
    patient_name: string;
    patient?: {
        name?: string;
        date_of_birth?: string;
        gender?: string;
        phone_number?: string;
    };
    slot?: {
        slot_timestamp?: string;
        slot_end_timestamp?: string;
    };
}

export interface SessionStatus {
    isActive: boolean;
    sessionStartTime: string | null;
    plannedEndTime: string | null;
    patientsSeenToday: number;
    totalScheduled: number;
}

export interface BreakStatus {
    isOnBreak: boolean;
    breakStartTime: string | null;
    expectedEndTime: string | null;
    reason: string | null;
    message: string | null;
}

export interface QueueState {
    queue: QueuePatient[];
    sessionStatus: SessionStatus;
    breakStatus: BreakStatus;
}

export function useGetDoctorQueue(
    clinicId?: string,
    doctorId?: string,
    date?: string,
) {
    return useQuery<QueueState>({
        queryKey: ["doctor-queue", clinicId, doctorId, date],
        queryFn: async () => {
            const endpoint = API_ENDPOINTS.QUEUE_STATE.replace(
                ":clinicId",
                clinicId!,
            )
                .replace(":doctorId", doctorId!)
                .replace(":date", date!);
            const response = await getApiData(endpoint);
            return response?.data ?? response;
        },
        enabled: !!clinicId && !!doctorId && !!date,
        staleTime: 1000 * 30, // 30 seconds - queue data is real-time
    });
}
