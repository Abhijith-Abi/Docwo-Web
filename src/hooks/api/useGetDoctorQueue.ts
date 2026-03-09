import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export interface QueuePatient {
    appointment_id: string;
    token_number: number;
    status: string;
    patient_name?: string;
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
    doctor_slots?: {
        slot_timestamp?: string;
        slot_end_timestamp?: string;
    };
    slot_timestamp?: string;
    slot_end_timestamp?: string;
    date_of_birth?: string;
    gender?: string;
}

export interface QueueState {
    clinicId: string;
    doctorId: string;
    date: string;
    currentQueue: QueuePatient[];
    currentPatient: QueuePatient | null;
    nextPatient: QueuePatient | null;
    totalInQueue: number;
    totalExpected: number;
    totalCompleted: number;
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
