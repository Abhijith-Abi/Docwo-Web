import { useMutation, useQueryClient } from "@tanstack/react-query";
import patchApiData from "@/utils/api-fetch/patch-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export interface UpdateDoctorSlotData {
    is_available: boolean;
    total_tokens: number;
}

export function useUpdateDoctorSlot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            slotId,
            data,
        }: {
            slotId: string;
            data: UpdateDoctorSlotData;
        }) => {
            const path = API_ENDPOINTS.UPDATE_DOCTOR_SLOT.replace(
                ":slotId",
                slotId
            );
            const response = await patchApiData(path, data);
            return response;
        },
        onSuccess: () => {
            // Optional: invalidate queries if needed, though we'll likely handle the success per slot in the UI
            queryClient.invalidateQueries({ queryKey: ["doctor-slots"] });
        },
    });
}
