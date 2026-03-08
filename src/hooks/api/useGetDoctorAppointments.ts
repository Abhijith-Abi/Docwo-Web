import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    time?: "future" | "past";
}

interface DoctorAppointmentsResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pagination: any;
}

export function useGetDoctorAppointments(doctorId?: string, params?: PaginationParams) {
    const { page = 1, limit = 100, search, status, date, startDate, endDate, time } = params || {};

    return useQuery<DoctorAppointmentsResponse>({
        queryKey: ["doctor-appointments", doctorId, page, limit, search, status, date, startDate, endDate, time],
        queryFn: async () => {
            if (!doctorId) return { data: [], pagination: null };
            
            const searchParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (search) searchParams.append("search", search);
            if (status && status !== "all") searchParams.append("status", status);
            if (date) searchParams.append("date", date);
            if (startDate) searchParams.append("startDate", startDate);
            if (endDate) searchParams.append("endDate", endDate);
            if (time) searchParams.append("time", time);

            const endpoint = `${API_ENDPOINTS.DOCTOR_APPOINTMENTS.replace(":id", doctorId)}?${searchParams.toString()}`;
            const response = await getApiData(endpoint);
            
            return {
                data: response?.data ?? [],
                pagination: response?.pagination || null
            };
        },
        enabled: !!doctorId,
    });
}
