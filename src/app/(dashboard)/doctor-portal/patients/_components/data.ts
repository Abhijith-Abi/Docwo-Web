export interface Patient {
    patient_id: string;
    patient_code: string;
    user_id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    date_of_birth: string;
    gender: string;
    blood_group: string;
    city: string;
    state: string;
    visit_count: number;
    last_visit_at: string;
    // UI helper fields (if needed for rendering)
    initials?: string;
}
