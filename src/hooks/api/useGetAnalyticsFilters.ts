/* eslint-disable */
import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { useAuthStore } from "@/store/auth-store";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export function useGetAnalyticsFilters() {
    const token = useAuthStore((s) => s.token);

    return useQuery({
        queryKey: ["analytics-filters"],
        queryFn: async () => {
            const response = await getApiData(API_ENDPOINTS.ANALYTICS_FILTERS);
            return response?.data ?? response;
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 5, 
    });
}
