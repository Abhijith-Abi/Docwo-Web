/* eslint-disable */
import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { useAuthStore } from "@/store/auth-store";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export function useGetProfile() {
    const token = useAuthStore((s) => s.token);
    const setUser = useAuthStore((s) => s.setUser);

    return useQuery({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const response = await getApiData(API_ENDPOINTS.PROFILE);
            const user = response?.data ?? response;
            if (user) {
                setUser(user);
            }
            return user;
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
