import { PatientCard } from "./patient-card";
import { Patient } from "./data";
import { UserX } from "lucide-react";

export function PatientsGridView({
    patients,
    selectedPatients,
    onSelectPatient,
}: {
    patients: Patient[];
    selectedPatients: string[];
    onSelectPatient: (patientId: string, checked: boolean) => void;
}) {
    if (!patients || patients.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-border/60 rounded-[10px] bg-card/50 mt-3 animate-in fade-in duration-300">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <UserX
                        className="h-6 w-6 text-muted-foreground"
                        strokeWidth={1.5}
                    />
                </div>
                <h3 className="text-[15px] font-semibold text-foreground mb-1">
                    No patients found
                </h3>
                <p className="text-[13px] text-muted-foreground text-center ">
                    We couldn't find any patients matching your current filters.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6 pt-2 animate-in fade-in duration-300">
            {patients.map((patient, index) => (
                <PatientCard
                    key={`grid-${patient.patient_id}-${index}`}
                    patient={patient}
                    isSelected={selectedPatients.includes(patient.patient_id)}
                    onSelect={(checked) => onSelectPatient(patient.patient_id, checked)}
                />
            ))}
        </div>
    );
}
