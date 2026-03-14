import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { Patient } from "@/app/(dashboard)/doctor-portal/patients/_components/data";

interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    doctorId?: string;
    gender?: string;
    age?: string;
}

interface DoctorsPatientsResponse {
    data: Patient[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pagination: any;
}

export function useGetDoctorsPatients(clinicId?: string, params?: PaginationParams) {
    const { page = 1, limit = 10, search, doctorId, gender, age } = params || {};

    return useQuery<DoctorsPatientsResponse>({
        queryKey: ["clinic-patients", clinicId, page, limit, search, doctorId, gender, age],
        queryFn: async () => {
            if (!clinicId) return { data: [], pagination: null };
            
            const searchParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (search) searchParams.append("search", search);
            if (doctorId && doctorId !== "all") searchParams.append("doctorId", doctorId);
            if (gender && gender !== "all") searchParams.append("gender", gender);
            if (age && age !== "all") searchParams.append("age", age);

            const endpoint = `${API_ENDPOINTS.DOCTOR_PATIENTS.replace(":clinicId", clinicId)}?${searchParams.toString()}`;
            const response = await getApiData(endpoint);
            
            return {
                data: response?.data || [],
                pagination: response?.pagination || null
            };
        },
        enabled: !!clinicId,
    });
}
