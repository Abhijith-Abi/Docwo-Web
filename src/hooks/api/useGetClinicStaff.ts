import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
}

export function useGetClinicStaff(clinicId?: string, params?: PaginationParams) {
    const { page = 1, limit = 8, search } = params || {};

    return useQuery({
        queryKey: ["clinic-staff", clinicId, page, limit, search],
        queryFn: async () => {
            if (!clinicId) return { data: [], pagination: null };
            
            const searchParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (search) searchParams.append("search", search);

            const endpoint = `${API_ENDPOINTS.CLINIC_STAFF_DIRECTORY.replace(":clinicId", clinicId)}?${searchParams.toString()}`;
            const response = await getApiData(endpoint);
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const staffs = (response?.data ?? []).map((p: any) => {
                return {
                    id: p.employee_id || p.staff_id || "-",
                    name: `${p.first_name || ""} ${p.last_name || ""}`.trim() || "-",
                    role: p.role?.name || p.designation || "-",
                    availability: p.availability || [],
                    phone: p.phone_number || "-",
                    email: p.email || "-",
                    ...p
                };
            });

            return {
                data: staffs,
                pagination: response?.pagination || null
            };
        },
        enabled: !!clinicId,
    });
}
