"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ManagementPagination } from "./management-pagination";

const staffs = [
    {
        id: "DD1427",
        name: "Lorem ipsum",
        role: "Receptionist",
        availability: [
            { days: "Mon, Wed, Fri", hours: "10:00 AM - 01:00 PM" },
            { days: "Thu, Sat", hours: "05:00 PM - 08:00 PM" },
        ],
        phone: "+91 9000 0 00001",
        email: "meera@clinic.com",
    },
    {
        id: "DD1428",
        name: "Lorem ipsum",
        role: "Attender",
        availability: [
            { days: "Mon, Wed, Fri", hours: "10:00 AM - 01:00 PM" },
            { days: "Thu, Sat", hours: "05:00 PM - 08:00 PM" },
        ],
        phone: "+91 9000 0 00001",
        email: "meera@clinic.com",
    },
    {
        id: "DD1429",
        name: "Lorem ipsum",
        role: "Attender",
        availability: [
            { days: "Mon, Wed, Fri", hours: "10:00 AM - 01:00 PM" },
            { days: "Thu, Sat", hours: "05:00 PM - 08:00 PM" },
        ],
        phone: "+91 9000 0 00001",
        email: "meera@clinic.com",
    },
    {
        id: "DD1430",
        name: "Lorem ipsum",
        role: "Receptionist",
        availability: [
            { days: "Mon, Wed, Fri", hours: "10:00 AM - 01:00 PM" },
            { days: "Thu, Sat", hours: "05:00 PM - 08:00 PM" },
        ],
        phone: "+91 9000 0 00001",
        email: "meera@clinic.com",
    },
];

export function StaffDirectory({ view }: { view: "list" | "grid" }) {
    if (view === "grid") {
        return (
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
                    {staffs.map((staff, i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-[12px] p-5 shadow-sm flex flex-col relative group"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-3 top-3 h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>

                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold text-[15px]">
                                        {staff.name}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="font-semibold text-[11px] text-black bg-muted/50 px-2 py-0.5 rounded">
                                        {staff.id}
                                    </span>
                                    <span className="text-[12px] text-muted-foreground">
                                        {staff.role}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1 mb-4">
                                <div className="text-[13px] font-medium text-black">
                                    {staff.phone}
                                </div>
                                <div className="text-[12px] text-muted-foreground">
                                    {staff.email}
                                </div>
                            </div>

                            <div className="mt-auto space-y-3 pt-4 border-t">
                                <div className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">
                                    Availability
                                </div>
                                <div className="space-y-2.5">
                                    {staff.availability.map((a, idx) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col gap-0.5"
                                        >
                                            <div className="text-[13px] font-medium">
                                                {a.days}
                                            </div>
                                            <div className="text-[12px] text-muted-foreground">
                                                {a.hours}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center w-full pt-4">
                    <ManagementPagination />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-[8px] shadow-sm flex flex-col">
            <div className="p-5 font-semibold text-[15px] border-b">
                Staff Directory (6 results)
            </div>

            <div className="overflow-x-auto w-full">
                <Table className="w-full min-w-[800px]">
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="font-semibold text-black pl-5 pb-3">
                                Staff
                            </TableHead>
                            <TableHead className="font-semibold text-black pb-3">
                                Available Date
                            </TableHead>
                            <TableHead className="font-semibold text-black pb-3">
                                Available Time
                            </TableHead>
                            <TableHead className="font-semibold text-black pb-3">
                                Contact
                            </TableHead>
                            <TableHead className="font-semibold text-black text-center pr-6 pb-3 w-[100px]">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {staffs.map((staff, i) => (
                            <TableRow key={i} className="hover:bg-transparent">
                                <TableCell className="pl-5 py-5 border-b w-[250px]">
                                    <div className="flex flex-col gap-1">
                                        <div className="font-bold text-[14px] text-black">
                                            {staff.name}
                                        </div>
                                        <div className="font-semibold text-[11px] text-black">
                                            {staff.id}
                                        </div>
                                        <div className="text-[13px] text-muted-foreground">
                                            {staff.role}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5 border-b align-top pt-[22px]">
                                    <div className="flex flex-col gap-3 text-[14px] font-medium text-black">
                                        {staff.availability.map((a, idx) => (
                                            <div key={idx}>{a.days}</div>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="py-5 border-b align-top pt-[22px]">
                                    <div className="flex flex-col gap-3 text-[14px] font-medium text-black">
                                        {staff.availability.map((a, idx) => (
                                            <div key={idx}>{a.hours}</div>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="py-5 border-b">
                                    <div className="flex flex-col gap-[10px] text-[13px]">
                                        <div className="text-black font-medium">
                                            {staff.phone}
                                        </div>
                                        <div className="text-muted-foreground">
                                            {staff.email}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5 border-b text-center align-middle">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground ml-auto mr-4"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="p-4 border-t mt-auto">
                <ManagementPagination />
            </div>
        </div>
    );
}
