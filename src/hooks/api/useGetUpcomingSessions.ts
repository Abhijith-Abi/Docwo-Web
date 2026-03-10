import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export interface UpcomingSessionResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
}

export function useGetUpcomingSessions(doctorId?: string | number) {
    return useQuery<UpcomingSessionResponse>({
        queryKey: ["upcoming-sessions", doctorId],
        queryFn: async () => {
            const path = API_ENDPOINTS.DOCTOR_UPCOMING_SESSIONS.replace(
                ":id",
                doctorId?.toString() || ""
            );
            const response = await getApiData(path);
            return response;
        },
        enabled: !!doctorId,
    });
}
