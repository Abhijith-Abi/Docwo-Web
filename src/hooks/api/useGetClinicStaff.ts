import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
}

export function useGetClinicStaff(clinicId?: string, params?: PaginationParams) {
    const { page = 1, limit = 10, search, role } = params || {};

    return useQuery({
        queryKey: ["clinic-staff", clinicId, page, limit, search, role],
        queryFn: async () => {
            if (!clinicId) return { data: [], pagination: null };
            
            const searchParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (search) searchParams.append("search", search);
            if (role) searchParams.append("role", role);

            const endpoint = `${API_ENDPOINTS.CLINIC_STAFF_DIRECTORY.replace(":clinicId", clinicId)}?${searchParams.toString()}`;
            const response = await getApiData(endpoint);
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const staffs = (response?.data ?? []).map((p: any) => {
                const userObj = p.user || {};
                return {
                    id: p.doctor_code || p.employee_id || p.staff_id || "-",
                    name: `${userObj.first_name || p.first_name || ""} ${userObj.last_name || p.last_name || ""}`.trim() || "-",
                    role: p.role?.name || p.role || p.designation || "-",
                    availability: p.availability || [],
                    phone: userObj.phone_number || p.phone_number || "-",
                    email: userObj.email || p.email || "-",
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
