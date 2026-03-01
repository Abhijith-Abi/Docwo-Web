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
                        <TableHead className="font-bold text-foreground h-[52px] text-sm">
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
                                    <span className="text-[13px] text-muted-foreground">
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
                                <TableCell className="p-0 text-center align-top">
                                    <div className="px-4 pt-5 pb-3 h-full flex justify-center">
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
                                <TableCell className="py-4 align-top">
                                    <div>
                                        <div className="font-medium text-[14px] text-foreground/90">
                                            {patient.name}
                                        </div>
                                        <div className="text-[13px] text-muted-foreground mt-0.5">
                                            {patient.id}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 text-[14px] font-medium text-foreground/80 align-top">
                                    {patient.age}/{patient.gender}
                                </TableCell>
                                <TableCell className="py-4 text-[14px] font-medium text-foreground/80 align-top">
                                    {patient.bloodGroup}
                                </TableCell>
                                <TableCell className="py-4 align-top">
                                    <div className="text-[14px] font-medium text-foreground/90">
                                        {patient.phone}
                                    </div>
                                    <div className="text-[13px] text-muted-foreground mt-0.5">
                                        {patient.email}
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 text-[14px] font-medium text-foreground/80 align-top">
                                    {patient.lastVisit}
                                </TableCell>
                                <TableCell className="py-4 text-[14px] font-medium text-foreground/80 align-top">
                                    {patient.noOfVisit}
                                </TableCell>
                                <TableCell className="py-4 text-[14px] font-medium text-foreground/80 align-top">
                                    {patient.doctor}
                                </TableCell>
                                <TableCell className="py-3.5 text-center align-top">
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
