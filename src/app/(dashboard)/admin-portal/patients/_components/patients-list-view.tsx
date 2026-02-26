import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquarePlus, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
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
                        <TableHead className="font-bold text-foreground h-[52px] text-[13px] tracking-tight">
                            Patient
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-[13px] tracking-tight">
                            Age/Gender
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-[13px] tracking-tight">
                            Blood Group
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-[13px] tracking-tight">
                            Contact
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-[13px] tracking-tight">
                            Last Visit
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-[13px] tracking-tight">
                            No. of Visit
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-[13px] tracking-tight">
                            Doctor
                        </TableHead>
                        <TableHead className="font-bold text-foreground text-center h-[52px] text-[13px] tracking-tight">
                            Add Note
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
                                    <span className="text-[13px] text-muted-foreground max-w-[250px]">
                                        We couldn't find any patients matching
                                        your current filters.
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        patients.map((patient, index) => (
                            <TableRow
                                key={`list-${patient.id}-${index}`}
                                className="border-b-border/50 bg-background hover:bg-background even:bg-muted/30 even:hover:bg-muted/30"
                            >
                                <TableCell className="p-0 text-center align-middle">
                                    <div className="px-4 py-3 h-full flex items-center justify-center">
                                        <Checkbox
                                            aria-label={`Select patient ${patient.name}`}
                                            className="rounded-[4px] border-muted-foreground/40 data-[state=checked]:bg-primary h-4 w-4"
                                            checked={selectedPatients.includes(
                                                patient.id,
                                            )}
                                            onCheckedChange={(checked) =>
                                                onSelectPatient(
                                                    patient.id,
                                                    !!checked,
                                                )
                                            }
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div>
                                        <div className="font-medium text-[13px] text-foreground">
                                            {patient.name}
                                        </div>
                                        <div className="text-[12px] text-muted-foreground mt-1">
                                            {patient.id}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 text-[13px] font-medium text-muted-foreground/90">
                                    {patient.age}/{patient.gender}
                                </TableCell>
                                <TableCell className="py-4 text-[13px] font-medium text-muted-foreground/90">
                                    {patient.bloodGroup}
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="text-[13px] font-medium text-foreground">
                                        {patient.phone}
                                    </div>
                                    <div className="text-[12px] text-muted-foreground mt-1">
                                        {patient.email}
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 text-[13px] font-medium text-muted-foreground/90">
                                    {patient.lastVisit}
                                </TableCell>
                                <TableCell className="py-4 text-[13px] font-medium text-muted-foreground/90">
                                    {patient.noOfVisit}
                                </TableCell>
                                <TableCell className="py-4 text-[13px] font-medium text-muted-foreground/90">
                                    {patient.doctor}
                                </TableCell>
                                <TableCell className="py-3.5 text-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-foreground/70 hover:text-foreground"
                                    >
                                        <MessageSquarePlus
                                            className="h-[18px] w-[18px]"
                                            strokeWidth={2}
                                        />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
