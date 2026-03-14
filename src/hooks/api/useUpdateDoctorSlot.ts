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
            skipInvalidate?: boolean;
        }) => {
            const path = API_ENDPOINTS.UPDATE_DOCTOR_SLOT.replace(
                ":slotId",
                slotId
            );
            const response = await patchApiData(path, data);
            return response;
        },
        onSuccess: (_data, variables) => {
            if (!variables.skipInvalidate) {
                queryClient.invalidateQueries({ queryKey: ["doctor-slots"] });
            }
        },
    });
}
