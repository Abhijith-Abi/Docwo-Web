import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export interface CalendarQuickViewItem {
    date: string;
    dayLabel: string;
    appointmentCount: number;
    isToday: boolean;
    isTomorrow: boolean;
}

export function useGetDoctorCalendarQuickView(doctorId?: string) {
    return useQuery<CalendarQuickViewItem[]>({
        queryKey: ["doctor-calendar-quick-view", doctorId],
        queryFn: async () => {
            const endpoint = API_ENDPOINTS.DOCTOR_CALENDAR_QUICK_VIEW.replace(
                ":id",
                doctorId!,
            );
            const response = await getApiData(endpoint);
            return response?.data ?? response;
        },
        enabled: !!doctorId,
        staleTime: 1000 * 60 * 5,
    });
}
