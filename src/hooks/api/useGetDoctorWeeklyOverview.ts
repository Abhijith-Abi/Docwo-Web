import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export interface DailyBreakdown {
    day: string;
    bookings: number;
    consultations: number;
}

export interface WeeklyOverviewData {
    totalBookings: number;
    totalConsultations: number;
    dailyBreakdown: DailyBreakdown[];
}

export function useGetDoctorWeeklyOverview(doctorId?: string) {
    return useQuery<WeeklyOverviewData>({
        queryKey: ["doctor-weekly-overview", doctorId],
        queryFn: async () => {
            const endpoint = API_ENDPOINTS.DOCTOR_WEEKLY_OVERVIEW.replace(
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
