import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Patient } from "./data";

export function PatientsListView({ patients }: { patients: Patient[] }) {
    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden animate-in fade-in duration-300 shadow-sm mt-3">
            <Table>
                <TableHeader className="bg-muted/30 hover:bg-muted/30">
                    <TableRow className="border-b-border/60">
                        <TableHead className="w-12 text-center p-0 align-middle">
                            <div className="px-4 py-3 h-full flex items-center justify-center">
                                <Checkbox
                                    aria-label="Select all"
                                    className="rounded-[4px] border-muted-foreground/40"
                                />
                            </div>
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-xs">
                            Patient
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-xs">
                            Age/Gender
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-xs">
                            Blood Group
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-xs">
                            Contact
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-xs">
                            Last Visit
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-xs">
                            No. of Visit
                        </TableHead>
                        <TableHead className="font-bold text-foreground h-[52px] text-xs">
                            Doctor
                        </TableHead>
                        <TableHead className="font-bold text-foreground text-center h-[52px] text-xs">
                            Add Note
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.map((patient, index) => (
                        <TableRow
                            key={`list-${patient.id}-${index}`}
                            className="border-b-border/50 hover:bg-muted/10"
                        >
                            <TableCell className="p-0 text-center align-middle">
                                <div className="px-4 py-3 h-full flex items-center justify-center">
                                    <Checkbox
                                        aria-label={`Select patient ${patient.name}`}
                                        className="rounded-[4px] border-muted-foreground/40 data-[state=checked]:bg-primary h-4 w-4"
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="py-3.5">
                                <div>
                                    <div className="font-semibold text-[13px] text-foreground/90">
                                        {patient.name}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
                                        {patient.id}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="py-3.5 text-[12px] font-semibold text-muted-foreground/80">
                                {patient.age}/{patient.gender}
                            </TableCell>
                            <TableCell className="py-3.5 text-[12px] font-semibold text-foreground/80">
                                {patient.bloodGroup}
                            </TableCell>
                            <TableCell className="py-3.5">
                                <div className="text-[12px] font-semibold text-foreground/80">
                                    {patient.phone}
                                </div>
                                <div className="text-[11px] text-foreground/60 mt-0.5">
                                    {patient.email}
                                </div>
                            </TableCell>
                            <TableCell className="py-3.5 text-[12px] font-semibold text-foreground/80">
                                {patient.lastVisit}
                            </TableCell>
                            <TableCell className="py-3.5 text-[12px] font-semibold text-foreground/80">
                                {patient.noOfVisit}
                            </TableCell>
                            <TableCell className="py-3.5 text-[12px] font-semibold text-foreground/80">
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
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
