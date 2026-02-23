export interface Patient {
  id: string;
  name: string;
  initials: string;
  age: string;
  gender: string;
  bloodGroup: string;
  lastVisit: string;
  doctor: string;
  email: string;
  phone: string;
  noOfVisit: number;
}

export const patientsData: Patient[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i % 2 === 0 ? "DCW1234" : "PD1224",
  name: "Lorem Ipsum",
  initials: "SJ",
  age: i % 2 === 0 ? "39" : "12",
  gender: i % 2 === 0 ? "F" : "M",
  bloodGroup: "A+",
  lastVisit: i % 2 === 0 ? "12-12-2025" : "15-01-2026",
  doctor: "Dr. Ajmal",
  email: "loremipsum2025@gmail.com",
  phone: "+91 82812 00001", // Or "+91 12345 54321" as per the first image design
  noOfVisit: 3,
}));
