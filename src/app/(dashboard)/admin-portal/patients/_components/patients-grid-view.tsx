import { PatientCard } from "./patient-card";
import { Patient } from "./data";

export function PatientsGridView({ patients }: { patients: Patient[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-x-6 gap-y-6 pt-2 animate-in fade-in duration-300">
            {patients.map((patient, index) => (
                <PatientCard
                    key={`grid-${patient.id}-${index}`}
                    patient={patient}
                />
            ))}
        </div>
    );
}
