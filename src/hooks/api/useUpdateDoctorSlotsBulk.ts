import { useMutation, useQueryClient } from "@tanstack/react-query";
import patchApiData from "@/utils/api-fetch/patch-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export interface SlotUpdate {
    slot_id: string | number;
    is_available?: boolean;
    total_tokens?: number;
    slot_timestamp?: string;
    slot_end_timestamp?: string;
}

export interface BulkUpdateDoctorSlotsData {
    updates: SlotUpdate[];
}

export function useUpdateDoctorSlotsBulk() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: BulkUpdateDoctorSlotsData) => {
            const path = API_ENDPOINTS.UPDATE_DOCTOR_SLOTS_BULK;
            const response = await patchApiData(path, data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctor-slots"] });
        },
    });
}
