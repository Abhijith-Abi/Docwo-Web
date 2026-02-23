export const API_ENDPOINTS = {
    // AUTH 
    LOGIN: '/auth/login',
    INITIATE_REGISTRATION: '/auth/initiate-registration',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGET_PASSWORD: '/auth/forget-password',
    RESET_PASSWORD: '/auth/reset-password',
    
    // USERS:
    USER_ME: '/users/me',
    UPDATE_USER: '/users/update',
    CHANGE_PASSWORD: '/users/change-password',
    DELETE_ACCOUNT: '/users/delete',

    // CLINICS:
    CLINICS: '/clinics',
    CLINIC_DETAILS: '/clinics/:id',
    SEARCH_CLINICS: '/clinics/search',

    // SPECIALIZATIONS:
    SPECIALIZATIONS: '/specializations',
    SPECIALIZATION_DETAILS: '/specializations/:id',

    // DOCTORS:
    DOCTORS: '/doctors',
    DOCTOR_DETAILS: '/doctors/:id',
    DOCTOR_SEARCH: '/doctors/search',
    DOCTOR_BULK_UPLOAD: '/doctors/bulk-upload',
    DOCTOR_CHANGE_PASSWORD: '/doctors/:id/change-password',
    DOCTOR_RESET_PASSWORD: '/doctors/:id/reset-password',

    // STAFF:
    STAFF: '/staff',
    STAFF_DETAILS: '/staff/:id',
    STAFF_CHANGE_PASSWORD: '/staff/:id/change-password',
    STAFF_RESET_PASSWORD: '/staff/:id/reset-password',

    // PATIENTS:
    PATIENTS: '/patients',
    PATIENT_DETAILS: '/patients/:id',
    PATIENT_SEARCH: '/patients/search',
    PATIENT_PROFILES: '/patients/:id/profiles',

    // HEALTH RECORDS:
    HEALTH_RECORDS: '/health-records',
    HEALTH_RECORD_DETAILS: '/health-records/:id',

    // APPOINTMENTS:
    APPOINTMENTS: '/appointments',
    APPOINTMENT_DETAILS: '/appointments/:id',
    RESCHEDULE_APPOINTMENT: '/appointments/:id/reschedule',
    CANCEL_APPOINTMENT: '/appointments/:id/cancel',
    COMPLETE_APPOINTMENT: '/appointments/:id/complete',
    APPOINTMENT_STATUS: '/appointments/:id/status',

    // AVAILABILITY:
    AVAILABILITY: '/availability',
    AVAILABILITY_DETAILS: '/availability/:id',

    // TIME SLOTS:
    TIME_SLOTS: '/time-slots',
    GENERATE_TIME_SLOTS: '/time-slots/generate',

    // SCHEDULES:
    SCHEDULES: '/schedules',
    SCHEDULE_CONTROL: '/schedules/control',

    // ROLES & PERMISSIONS:
    ROLES: '/roles',
    ROLE_DETAILS: '/roles/:id',
    PERMISSIONS: '/permissions',
    PERMISSION_DETAILS: '/permissions/:id',

    // REVENUE:
    REVENUE_SUMMARY: '/revenue/summary',
    REVENUE_LIST: '/revenue/list',
    REVENUE_STATS: '/revenue/stats',
}