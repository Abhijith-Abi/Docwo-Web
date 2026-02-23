import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Patient } from "./data";

export function PatientCard({ patient }: { patient: Patient }) {
    return (
        <Card className="rounded-[10px] shadow-sm border border-border/80">
            <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-5">
                    <Checkbox
                        className="mt-2.5 rounded-[4px] border-muted-foreground/40 h-4 w-4 shrink-0"
                        aria-label="Select patient"
                    />
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 font-bold bg-muted/60 rounded-[8px]">
                            <AvatarFallback className="rounded-[8px] bg-muted/70 text-foreground text-[15px]">
                                {patient.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                                {patient.name}
                            </h3>
                            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                                {patient.id}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mt-1 px-0.5">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground/90 font-medium text-[12px]">
                            Age/Gender
                        </span>
                        <span className="font-semibold text-foreground text-[12px]">
                            {patient.age}/{patient.gender}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground/90 font-medium text-[12px]">
                            Blood Group
                        </span>
                        <span className="font-semibold text-foreground text-[12px]">
                            {patient.bloodGroup}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground/90 font-medium text-[12px]">
                            Last Visit
                        </span>
                        <span className="font-semibold text-foreground text-[12px]">
                            {patient.lastVisit}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground/90 font-medium text-[12px]">
                            Doctor
                        </span>
                        <span className="font-semibold text-foreground text-[12px]">
                            {patient.doctor}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 mt-5">
                    <Button
                        variant="outline"
                        className="h-[36px] flex-1 min-w-0 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold rounded-md border-border/80 shadow-none px-1.5 sm:px-2 text-foreground/80 hover:text-foreground hover:bg-muted/40"
                    >
                        <Mail className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                        <span className="truncate">{patient.email}</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-[36px] shrink-0 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold rounded-md border-border/80 shadow-none px-2 sm:px-2.5 text-foreground/80 hover:text-foreground hover:bg-muted/40"
                    >
                        <Phone className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                        <span>{patient.phone}</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
