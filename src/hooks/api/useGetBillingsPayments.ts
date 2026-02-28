/* eslint-disable */
import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { useAuthStore } from "@/store/auth-store";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export function useGetBillingsPayments(clinicId?: string,params?: Record<string, any>) {
    const token = useAuthStore((s) => s.token);

    return useQuery({
        queryKey: ["billings-payments",clinicId, params,],
        queryFn: async () => {
            if (!clinicId) return { data: [] };
            
            let queryString = "";
            const searchParams = new URLSearchParams();
            
            searchParams.append("clinicId", clinicId);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "all" && value !== "") {
                        if (value instanceof Date) {
                            searchParams.append(key, value.toISOString().split('T')[0]);
                        } else {
                            searchParams.append(key, value.toString());
                        }
                    }
                });
            }
            
            const s = searchParams.toString();
            if (s) {
                queryString = `?${s}`;
            }

            const response = await getApiData(`${API_ENDPOINTS.BILLINGS_PAYMENTS}${queryString}`);
            return response;
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 5, 
    });
}
