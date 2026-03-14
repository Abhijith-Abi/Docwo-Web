import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { UserX } from "lucide-react";
import { Patient } from "./data";

export function PatientsListView({
    patients,
    selectedPatients,
    onSelectAll,
    onSelectPatient,
}: {
    patients: Patient[];
    selectedPatients: string[];
    onSelectAll: (checked: boolean) => void;
    onSelectPatient: (patientId: string, checked: boolean) => void;
}) {
    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden animate-in fade-in duration-300 shadow-sm mt-3">
            <Table>
                <TableHeader className="bg-blue-50/50 hover:bg-blue-50/50">
                    <TableRow className="border-b-border/60">
                        <TableHead className="w-12 text-center p-0 align-middle">
                            {patients && patients.length > 0 && (
                                <div className="px-4 py-3 h-full flex items-center justify-center">
                                    <Checkbox
                                        aria-label="Select all"
                                        className="rounded-[4px] border-muted-foreground/40"
                                        checked={
                                            patients.length > 0 &&
                                            selectedPatients.length ===
                                                patients.length
                                        }
                                        onCheckedChange={(checked) =>
                                            onSelectAll(!!checked)
                                        }
                                    />
                                </div>
                            )}
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Patient
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Age/Gender
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Blood Group
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Contact
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            Last Visit
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
                            No. of Visit
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!patients || patients.length === 0 ? (
                        <TableRow className="hover:bg-transparent">
                            <TableCell
                                colSpan={9}
                                className="h-[300px] text-center align-middle"
                            >
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                        <UserX
                                            className="h-6 w-6 text-muted-foreground"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <span className="text-[15px] font-semibold text-foreground mb-1">
                                        No patients found
                                    </span>
                                    <span className="text-[13px] text-muted-foreground">
                                        We couldn't find any patients matching
                                        your current filters.
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        patients.map((patient, index) => {
                            const fullName = `${patient.first_name || ""} ${patient.last_name || ""}`.trim();
                            const age = patient.date_of_birth 
                                ? Math.floor((new Date().getTime() - new Date(patient.date_of_birth).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
                                : "N/A";
                            const formattedLastVisit = patient.last_visit_at
                                ? new Date(patient.last_visit_at).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                  })
                                : "No visit yet";

                            return (
                                <TableRow
                                    key={`list-${patient.patient_id}-${index}`}
                                    className="border-b-border/50 bg-background hover:bg-background even:bg-muted/30 even:hover:bg-muted/30"
                                >
                                    <TableCell className="p-0 text-center align-top">
                                        <div className="px-4 pt-5 pb-3 h-full flex justify-center">
                                            <Checkbox
                                                aria-label={`Select patient ${fullName}`}
                                                className="rounded-[4px] border-muted-foreground/40 data-[state=checked]:bg-primary h-4 w-4"
                                                checked={selectedPatients.includes(
                                                    patient.patient_id,
                                                )}
                                                onCheckedChange={(checked) =>
                                                    onSelectPatient(
                                                        patient.patient_id,
                                                        !!checked,
                                                    )
                                                }
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 align-top">
                                        <div>
                                            <div className="font-medium text-[14px] text-foreground/90">
                                                {fullName}
                                            </div>
                                            <div className="text-[13px] text-muted-foreground mt-0.5">
                                                {patient.patient_code}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-[14px] font-medium text-foreground/80 align-top capitalize">
                                        {age}/{patient.gender}
                                    </TableCell>
                                    <TableCell className="py-4 text-[14px] font-medium text-foreground/80 align-top">
                                        {patient.blood_group}
                                    </TableCell>
                                    <TableCell className="py-4 align-top">
                                        <div className="text-[14px] font-medium text-foreground/90">
                                            {patient.phone_number}
                                        </div>
                                        <div className="text-[13px] text-muted-foreground mt-0.5">
                                            {patient.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-[14px] font-medium text-foreground/80 align-top">
                                        {formattedLastVisit}
                                    </TableCell>
                                    <TableCell className="py-4 text-[14px] font-medium text-foreground/80 align-top">
                                        {patient.visit_count || 0}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
