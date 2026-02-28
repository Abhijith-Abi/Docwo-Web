export interface Invoice {
    id: string;
    invoiceNumber: string;
    date: string;
    time: string;
    patientName: string;
    patientId: string;
    doctorName: string;
    specialization: string;
    amount: number;
    status: string;
    paymentMethod: string;
}

export const dummyInvoices: Invoice[] = [
    {
        id: "1",
        invoiceNumber: "INV-2024-001",
        date: "15 Jan 2026",
        time: "10:30 AM",
        patientName: "Priya Sharma",
        patientId: "PD-2391",
        doctorName: "Dr. Rajesh Kumar",
        specialization: "General Physician",
        amount: 499,
        status: "Paid",
        paymentMethod: "UPI",
    },
    {
        id: "2",
        invoiceNumber: "INV-2024-001",
        date: "15 Jan 2026",
        time: "10:30 AM",
        patientName: "Priya Sharma",
        patientId: "PD-2391",
        doctorName: "Dr. Rajesh Kumar",
        specialization: "General Physician",
        amount: 499,
        status: "Refund",
        paymentMethod: "Direct",
    },
    {
        id: "3",
        invoiceNumber: "INV-2024-001",
        date: "15 Jan 2026",
        time: "10:30 AM",
        patientName: "Priya Sharma",
        patientId: "PD-2391",
        doctorName: "Dr. Rajesh Kumar",
        specialization: "General Physician",
        amount: 499,
        status: "Paid",
        paymentMethod: "UPI",
    },
    {
        id: "4",
        invoiceNumber: "INV-2024-001",
        date: "15 Jan 2026",
        time: "10:30 AM",
        patientName: "Priya Sharma",
        patientId: "PD-2391",
        doctorName: "Dr. Rajesh Kumar",
        specialization: "General Physician",
        amount: 499,
        status: "Refund",
        paymentMethod: "Direct",
    },
    {
        id: "5",
        invoiceNumber: "INV-2024-001",
        date: "15 Jan 2026",
        time: "10:30 AM",
        patientName: "Priya Sharma",
        patientId: "PD-2391",
        doctorName: "Dr. Rajesh Kumar",
        specialization: "General Physician",
        amount: 499,
        status: "Paid",
        paymentMethod: "UPI",
    },
    {
        id: "6",
        invoiceNumber: "INV-2024-001",
        date: "15 Jan 2026",
        time: "10:30 AM",
        patientName: "Priya Sharma",
        patientId: "PD-2391",
        doctorName: "Dr. Rajesh Kumar",
        specialization: "General Physician",
        amount: 499,
        status: "Refund",
        paymentMethod: "Direct",
    },
    {
        id: "7",
        invoiceNumber: "INV-2024-001",
        date: "15 Jan 2026",
        time: "10:30 AM",
        patientName: "Priya Sharma",
        patientId: "PD-2391",
        doctorName: "Dr. Rajesh Kumar",
        specialization: "General Physician",
        amount: 499,
        status: "Paid",
        paymentMethod: "UPI",
    },
    {
        id: "8",
        invoiceNumber: "INV-2024-001",
        date: "15 Jan 2026",
        time: "10:30 AM",
        patientName: "Priya Sharma",
        patientId: "PD-2391",
        doctorName: "Dr. Rajesh Kumar",
        specialization: "General Physician",
        amount: 499,
        status: "Refund",
        paymentMethod: "Direct",
    },
    {
        id: "9",
        invoiceNumber: "INV-2024-001",
        date: "15 Jan 2026",
        time: "10:30 AM",
        patientName: "Priya Sharma",
        patientId: "PD-2391",
        doctorName: "Dr. Rajesh Kumar",
        specialization: "General Physician",
        amount: 499,
        status: "Paid",
        paymentMethod: "UPI",
    },
    {
        id: "10",
        invoiceNumber: "INV-2024-001",
        date: "15 Jan 2026",
        time: "10:30 AM",
        patientName: "Priya Sharma",
        patientId: "PD-2391",
        doctorName: "Dr. Rajesh Kumar",
        specialization: "General Physician",
        amount: 499,
        status: "Refund",
        paymentMethod: "Direct",
    },
];

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
};
