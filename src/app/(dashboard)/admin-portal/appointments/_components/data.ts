export type AppointmentStatus = "completed" | "cancelled" | "ongoing";

export interface Appointment {
    id: string; // TKN 01
    time: string; // 09:00 AM - 09:15 AM
    patientName: string;
    patientId: string; // PD1224
    age: string;
    gender: string;
    contactNumber: string;
    contactEmail: string;
    doctorName: string;
    doctorSpecialty: string;
    status: AppointmentStatus;
}

export const appointmentsData: Appointment[] = [
    {
        id: "TKN 01",
        time: "09:00 AM - 09:15 AM",
        patientName: "Ajmal Ashrudehhen",
        patientId: "PD1224",
        age: "35",
        gender: "M",
        contactNumber: "+91 90001 00001",
        contactEmail: "loremipsum23@gmail.com",
        doctorName: "Dr. Suresh Varma",
        doctorSpecialty: "General Physician",
        status: "completed",
    },
    {
        id: "TKN 01",
        time: "09:00 AM - 09:15 AM",
        patientName: "Ajmal Ashrudehhen",
        patientId: "PD1224",
        age: "35",
        gender: "M",
        contactNumber: "+91 90001 00001",
        contactEmail: "loremipsum23@gmail.com",
        doctorName: "Dr. Suresh Varma",
        doctorSpecialty: "General Physician",
        status: "cancelled",
    },
    {
        id: "TKN 01",
        time: "09:00 AM - 09:15 AM",
        patientName: "Ajmal Ashrudehhen",
        patientId: "PD1224",
        age: "35",
        gender: "M",
        contactNumber: "+91 90001 00001",
        contactEmail: "loremipsum23@gmail.com",
        doctorName: "Dr. Suresh Varma",
        doctorSpecialty: "General Physician",
        status: "ongoing",
    },
    {
        id: "TKN 01",
        time: "09:00 AM - 09:15 AM",
        patientName: "Ajmal Ashrudehhen",
        patientId: "PD1224",
        age: "35",
        gender: "M",
        contactNumber: "+91 90001 00001",
        contactEmail: "loremipsum23@gmail.com",
        doctorName: "Dr. Suresh Varma",
        doctorSpecialty: "General Physician",
        status: "completed",
    },
    {
        id: "TKN 01",
        time: "09:00 AM - 09:15 AM",
        patientName: "Ajmal Ashrudehhen",
        patientId: "PD1224",
        age: "35",
        gender: "M",
        contactNumber: "+91 90001 00001",
        contactEmail: "loremipsum23@gmail.com",
        doctorName: "Dr. Suresh Varma",
        doctorSpecialty: "General Physician",
        status: "cancelled",
    },
    {
        id: "TKN 01",
        time: "09:00 AM - 09:15 AM",
        patientName: "Ajmal Ashrudehhen",
        patientId: "PD1224",
        age: "35",
        gender: "M",
        contactNumber: "+91 90001 00001",
        contactEmail: "loremipsum23@gmail.com",
        doctorName: "Dr. Suresh Varma",
        doctorSpecialty: "General Physician",
        status: "ongoing",
    },
    {
        id: "TKN 01",
        time: "09:00 AM - 09:15 AM",
        patientName: "Ajmal Ashrudehhen",
        patientId: "PD1224",
        age: "35",
        gender: "M",
        contactNumber: "+91 90001 00001",
        contactEmail: "loremipsum23@gmail.com",
        doctorName: "Dr. Suresh Varma",
        doctorSpecialty: "General Physician",
        status: "completed",
    },
    {
        id: "TKN 01",
        time: "09:00 AM - 09:15 AM",
        patientName: "Ajmal Ashrudehhen",
        patientId: "PD1224",
        age: "35",
        gender: "M",
        contactNumber: "+91 90001 00001",
        contactEmail: "loremipsum23@gmail.com",
        doctorName: "Dr. Suresh Varma",
        doctorSpecialty: "General Physician",
        status: "cancelled",
    },
];
