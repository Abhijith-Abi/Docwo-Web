import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";


interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    doctorId?: string;
    date?: string;
}

interface ClinicAppointmentsResponse {
    data: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pagination: any;
}

export function useGetClinicAppointments(clinicId?: string, params?: PaginationParams) {
    const { page = 1, limit = 10, search, status, doctorId, date } = params || {};

    return useQuery<ClinicAppointmentsResponse>({
        queryKey: ["clinic-appointments", clinicId, page, limit, search, status, doctorId, date],
        queryFn: async () => {
            if (!clinicId) return { data: [], pagination: null };
            
            const searchParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (search) searchParams.append("search", search);
            if (status && status !== "all") searchParams.append("status", status);
            if (doctorId && doctorId !== "all") searchParams.append("doctorId", doctorId);
            if (date) searchParams.append("date", date);

            const endpoint = `${API_ENDPOINTS.CLINIC_APPOINTMENTS.replace(":clinicId", clinicId)}?${searchParams.toString()}`;
            const response = await getApiData(endpoint);
            
            return {
                data: response?.data ?? [],
                pagination: response?.pagination || null
            };
        },
        enabled: !!clinicId,
    });
}
