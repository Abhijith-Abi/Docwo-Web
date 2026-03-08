import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCcw, ChevronDown, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function TodaysAppointments() {
    // Mock data based on the design
    const scheduleGroups = [
        {
            time: "09:00 AM - 09:15 AM",
            appointments: [
                {
                    id: 1,
                    token: "1",
                    name: "Ajmal Ashrudehhen",
                    pid: "PD1224",
                    ageGender: "35/M",
                    phone: "+91 90001 00001",
                    email: "loremipsum23@gmail.com",
                },
                {
                    id: 2,
                    token: "2",
                    name: "Ajmal Ashrudehhen",
                    pid: "PD1224",
                    ageGender: "35/M",
                    phone: "+91 90001 00001",
                    email: "loremipsum23@gmail.com",
                },
                {
                    id: 3,
                    token: "2",
                    name: "Ajmal Ashrudehhen",
                    pid: "PD1224",
                    ageGender: "35/M",
                    phone: "+91 90001 00001",
                    email: "loremipsum23@gmail.com",
                },
            ],
        },
        {
            time: "09:16 AM - 09:30 AM",
            appointments: [
                {
                    id: 4,
                    token: "4",
                    name: "Ajmal Ashrudehhen",
                    pid: "PD1224",
                    ageGender: "35/M",
                    phone: "+91 90001 00001",
                    email: "loremipsum23@gmail.com",
                },
                {
                    id: 5,
                    token: "4",
                    name: "Ajmal Ashrudehhen",
                    pid: "PD1224",
                    ageGender: "35/M",
                    phone: "+91 90001 00001",
                    email: "loremipsum23@gmail.com",
                },
                {
                    id: 6,
                    token: "6",
                    name: "Ajmal Ashrudehhen",
                    pid: "PD1224",
                    ageGender: "35/M",
                    phone: "+91 90001 00001",
                    email: "loremipsum23@gmail.com",
                },
            ],
        },
        {
            time: "09:31 AM - 09:45 AM",
            appointments: [
                {
                    id: 7,
                    token: "7",
                    name: "Ajmal Ashrudehhen",
                    pid: "PD1224",
                    ageGender: "35/M",
                    phone: "+91 90001 00001",
                    email: "loremipsum23@gmail.com",
                },
                {
                    id: 8,
                    token: "8",
                    name: "Ajmal Ashrudehhen",
                    pid: "PD1224",
                    ageGender: "35/M",
                    phone: "+91 90001 00001",
                    email: "loremipsum23@gmail.com",
                },
                {
                    id: 9,
                    token: "10",
                    name: "Ajmal Ashrudehhen",
                    pid: "PD1224",
                    ageGender: "35/M",
                    phone: "+91 90001 00001",
                    email: "loremipsum23@gmail.com",
                },
            ],
        },
    ];

    return (
        <Card className="w-full h-fit bg-white flex flex-col pt-5 pb-6 shadow-sm overflow-hidden p-0 border-gray-200">
            {/* Header section outside default card padding to match design */}
            <div className="flex items-center justify-between p-4">
                <h2 className="text-[#0E8A63] font-semibold text-lg">
                    Todays Appointments
                </h2>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-md border-gray-200 text-gray-500 shadow-none"
                    >
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Select defaultValue="session1">
                        <SelectTrigger className="w-[120px] h-8 text-sm focus:ring-0 border-gray-200 shadow-none">
                            <SelectValue placeholder="Session" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="session1">Session 1</SelectItem>
                            <SelectItem value="session2">Session 2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table wrapper */}
            <div className="flex-1 w-full px-6 pb-6 overflow-x-auto">
                {/* Main Table */}
                <div className="w-full min-w-[800px] border border-border/60 rounded-[10px] flex flex-col bg-card shadow-sm">
                    {/* Header Row */}
                    <div className="flex border-b border-border/60 bg-blue-50/50 text-sm font-bold text-foreground h-[52px]">
                        <div className="w-[180px] px-6 flex items-center shrink-0">
                            Time Schedule
                        </div>
                        <div className="flex-1 grid grid-cols-[100px_2fr_1fr_1.5fr] gap-4 px-6 items-center">
                            <div>Token</div>
                            <div>Patient name</div>
                            <div>Age/ Gender</div>
                            <div>Contact</div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="flex flex-col text-sm bg-background">
                        {scheduleGroups.map((group, groupIndex) => (
                            <div
                                key={groupIndex}
                                className="flex border-b border-border/50 last:border-b-0 even:bg-muted/30 transition-colors"
                            >
                                {/* Time Column - Spans height of group */}
                                <div className="w-[180px] px-6 py-4 font-medium text-[14px] text-foreground/90 border-r border-border/50 flex flex-col shrink-0 gap-2">
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <Clock className="h-[14px] w-[14px] text-muted-foreground" />
                                        {group.time}
                                    </div>
                                </div>

                                {/* Appointment Rows */}
                                <div className="flex-1 flex flex-col">
                                    {group.appointments.map((apt, aptIndex) => (
                                        <div
                                            key={apt.id}
                                            className="grid grid-cols-[100px_2fr_1fr_1.5fr] gap-4 px-6 py-4 border-b border-border/50 last:border-b-0 items-start min-h-[88px]"
                                        >
                                            <div className="flex shrink-0 pt-0.5">
                                                <Badge
                                                    variant="outline"
                                                    className="font-bold text-[12px] rounded-[4px] px-2 py-0.5 border-none shadow-sm gap-1 bg-background"
                                                >
                                                    TKN{" "}
                                                    <span className="text-emerald-500">
                                                        {apt.token.padStart(
                                                            2,
                                                            "0",
                                                        )}
                                                    </span>
                                                </Badge>
                                            </div>
                                            <div className="flex flex-col pt-0.5">
                                                <div className="font-medium text-[14px] text-foreground/90">
                                                    {apt.name}
                                                </div>
                                                <div className="text-[13px] text-muted-foreground mt-0.5">
                                                    {apt.pid}
                                                </div>
                                            </div>
                                            <div className="text-[14px] font-medium text-foreground/80 flex pt-0.5 capitalize">
                                                {apt.ageGender}
                                            </div>
                                            <div className="flex flex-col pt-0.5">
                                                <div className="text-[14px] font-medium text-foreground/90">
                                                    {apt.phone}
                                                </div>
                                                <div
                                                    className="text-[13px] text-muted-foreground mt-0.5 max-w-[150px] truncate"
                                                    title={apt.email}
                                                >
                                                    {apt.email}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="mt-6 flex justify-center w-full">
                <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-8 h-10 text-xs font-semibold shadow-none border-none">
                    See full appointment list &gt;&gt;&gt;
                </Button>
            </div>
        </Card>
    );
}
