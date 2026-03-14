import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export interface DoctorSlot {
    slot_id: string;
    slot_timestamp: string;
    slot_end_timestamp: string;
    total_tokens: number;
    booked_tokens: number;
    is_available: boolean;
    status_label: "Active" | "Inactive" | "Ongoing" | string;
    is_ongoing: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface DoctorSlotsResponse {
    data: DoctorSlot[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export function useGetDoctorSlots(
    doctorId?: string | number,
    clinicId?: string | number,
    date?: string | null
) {
    return useQuery<DoctorSlotsResponse>({
        queryKey: ["doctor-slots", doctorId, clinicId, date],
        queryFn: async () => {
            const path = API_ENDPOINTS.DOCTOR_DASHBOARD_SLOTS.replace(
                ":id",
                doctorId?.toString() || ""
            );
            
            const params = new URLSearchParams();
            if (clinicId) params.append("clinicId", clinicId.toString());
            if (date) params.append("date", date);
            
            const queryStr = params.toString();
            const fullPath = queryStr ? `${path}?${queryStr}` : path;
            
            const response = await getApiData(fullPath);
            return {
                data: response?.results ?? response?.data ?? response ?? [],
            } as DoctorSlotsResponse;
        },
        enabled: !!doctorId && !!date,
    });
}
