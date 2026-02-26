import { useQuery } from "@tanstack/react-query";
import getApiData from "@/utils/api-fetch/get-api-data";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { Patient } from "@/app/(dashboard)/admin-portal/patients/_components/data";

interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    doctorId?: string;
    gender?: string;
    age?: string;
}

interface ClinicPatientsResponse {
    data: Patient[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pagination: any;
}

export function useGetClinicPatients(clinicId?: string, params?: PaginationParams) {
    const { page = 1, limit = 10, search, doctorId, gender, age } = params || {};

    return useQuery<ClinicPatientsResponse>({
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

            const endpoint = `${API_ENDPOINTS.CLINIC_PATIENTS.replace(":clinicId", clinicId)}?${searchParams.toString()}`;
            const response = await getApiData(endpoint);
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const patients = (response?.data ?? []).map((p: any) => {
                const birthDate = new Date(p.date_of_birth);
                const age = p.date_of_birth ? Math.abs(new Date(Date.now() - birthDate.getTime()).getUTCFullYear() - 1970).toString() : "-";
                
                const lastVisitDate = p.last_visit_date ? new Date(p.last_visit_date) : null;
                const formattedLastVisit = lastVisitDate ? `${lastVisitDate.getDate().toString().padStart(2, '0')}-${(lastVisitDate.getMonth() + 1).toString().padStart(2, '0')}-${lastVisitDate.getFullYear()}` : "-";

                return {
                    id: p.patient_code || p.patient_id,
                    name: `${p.first_name || ""} ${p.last_name || ""}`.trim(),
                    initials: `${p.first_name?.[0] || ""}${p.last_name?.[0] || ""}`.toUpperCase(),
                    age: age,
                    gender: p.gender === "male" ? "M" : p.gender === "female" ? "F" : "O",
                    bloodGroup: p.blood_group || "-",
                    lastVisit: formattedLastVisit,
                    doctor: p.doctor || "Unassigned",
                    email: p.email || "-",
                    phone: p.phone_number || "-",
                    noOfVisit: p.no_of_visits || 0
                };
            });

            return {
                data: patients,
                pagination: response?.pagination || null
            };
        },
        enabled: !!clinicId,
    });
}
