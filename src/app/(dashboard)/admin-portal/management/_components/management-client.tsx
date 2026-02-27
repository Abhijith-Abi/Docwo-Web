"use client";

import { useState } from "react";
import { ManagementHeader } from "./management-header";
import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DoctorDirectory } from "./doctor-directory";
import { StaffDirectory } from "./staff-directory";

export function ManagementClient() {
    const [view, setView] = useState<"list" | "grid">("list");
    const [tab, setTab] = useState<"doctors" | "staffs">("doctors");

    return (
        <div className="flex-1 space-y-7 animate-in fade-in duration-500">
            <ManagementHeader activeTab={tab as "doctors" | "staffs"} />

            {/* Search and View Toggle Box */}
            <div className="bg-background border border-border/80 rounded-[12px] p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, ID, or phone ..."
                            className="pl-9 bg-muted/30 border-none h-10 w-full rounded-md shadow-sm"
                        />
                    </div>
                    <div className="flex items-center justify-end w-full sm:w-auto">
                        <ToggleGroup
                            type="single"
                            value={view}
                            onValueChange={(v) =>
                                v && setView(v as "list" | "grid")
                            }
                            className="bg-background border rounded-md h-10 p-1 flex shadow-sm shrink-0"
                        >
                            <ToggleGroupItem
                                value="list"
                                aria-label="List view"
                                className="h-full px-2.5 data-[state=on]:bg-black data-[state=on]:text-white rounded-sm"
                            >
                                <List className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="grid"
                                aria-label="Grid view"
                                className="h-full px-2.5 data-[state=on]:bg-black data-[state=on]:text-white rounded-sm"
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs
                defaultValue="doctors"
                className="w-full"
                onValueChange={(v) => setTab(v as any)}
            >
                <div className="bg-muted/40 p-1.5 rounded-[12px] w-full border shadow-sm overflow-x-auto no-scrollbar">
                    <TabsList className="w-full min-w-[340px] h-10 bg-transparent p-0 justify-start gap-2 flex">
                        <TabsTrigger
                            value="doctors"
                            className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm text-[13px] font-semibold h-full rounded-md text-muted-foreground data-[state=active]:text-foreground transition-all"
                        >
                            Doctors
                        </TabsTrigger>
                        <TabsTrigger
                            value="staffs"
                            className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm text-[13px] font-semibold h-full rounded-md text-muted-foreground data-[state=active]:text-foreground transition-all"
                        >
                            Other Staffs
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent
                    value="doctors"
                    className="mt-8 border-none p-0 outline-none"
                >
                    <DoctorDirectory view={view} />
                </TabsContent>

                <TabsContent
                    value="staffs"
                    className="mt-8 border-none p-0 outline-none"
                >
                    <StaffDirectory view={view} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
