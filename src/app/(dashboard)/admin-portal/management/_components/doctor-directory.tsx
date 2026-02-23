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

const doctors = [
    {
        id: 1,
        name: "Ajmal Ashrudheen",
        phones: ["+91 90251 74269", "+91 90251 74269"],
        email: "loremipsum82681@gmail.com",
        schedules: [
            {
                date: "08-02-2026",
                day: "Tuesday",
                hours: ["09:30 AM - 01:00 AM", "07:30 PM - 09:00 PM"],
            },
            {
                date: "09-02-2026",
                day: "Wednesday",
                hours: ["10:30 AM - 01:00 AM", "07:00 PM - 09:30 PM"],
            },
            {
                date: "10-02-2026",
                day: "Thursday",
                hours: ["10:30 AM - 01:00 AM", "07:00 PM - 09:30 PM"],
            },
            {
                date: "10-02-2026",
                day: "Friday",
                hours: ["10:30 AM - 01:00 AM", "07:00 PM - 09:30 PM"],
            },
        ],
    },
    {
        id: 2,
        name: "Ajmal Ashrudheen",
        phones: ["+91 90251 74269", "+91 90251 74269"],
        email: "loremipsum82681@gmail.com",
        schedules: [
            {
                date: "08-02-2026",
                day: "Tuesday",
                hours: ["09:30 AM - 01:00 AM", "07:30 PM - 09:00 PM"],
            },
            {
                date: "09-02-2026",
                day: "Wednesday",
                hours: ["10:30 AM - 01:00 AM", "07:00 PM - 09:30 PM"],
            },
            {
                date: "10-02-2026",
                day: "Thursday",
                hours: ["10:30 AM - 01:00 AM", "07:00 PM - 09:30 PM"],
            },
            {
                date: "10-02-2026",
                day: "Friday",
                hours: ["10:30 AM - 01:00 AM", "07:00 PM - 09:30 PM"],
            },
        ],
    },
];

export function DoctorDirectory({ view }: { view: "list" | "grid" }) {
    if (view === "grid") {
        return (
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
                    {doctors.map((doc, docIndex) => (
                        <div
                            key={doc.id}
                            className="bg-white border rounded-[12px] p-5 shadow-sm flex flex-col relative group"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-3 top-3 h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-[15px]">
                                        {doc.name}
                                    </h3>
                                    <div className="text-[12px] text-muted-foreground">
                                        {doc.email}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1 mb-4">
                                {doc.phones.map((p, i) => (
                                    <div
                                        key={i}
                                        className="text-[13px] font-medium text-black"
                                    >
                                        {p}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto space-y-3 pt-4 border-t">
                                <div className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">
                                    Upcoming Schedules
                                </div>
                                <div className="space-y-3">
                                    {doc.schedules
                                        .slice(0, 2)
                                        .map((schedule, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between items-start"
                                            >
                                                <div>
                                                    <div className="text-[13px] font-medium">
                                                        {schedule.date}
                                                    </div>
                                                    <div className="text-[11px] text-muted-foreground">
                                                        {schedule.day}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {schedule.hours.map(
                                                        (h, i) => (
                                                            <div
                                                                key={i}
                                                                className="text-[12px] text-muted-foreground"
                                                            >
                                                                {h}
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    {doc.schedules.length > 2 && (
                                        <div className="text-[12px] text-primary font-medium text-center mt-2 cursor-pointer pt-2 border-t border-dashed">
                                            + {doc.schedules.length - 2} more
                                            schedules
                                        </div>
                                    )}
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
                Doctor Directory (6 results)
            </div>

            <div className="overflow-x-auto w-full">
                <Table className="w-full min-w-[800px]">
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="font-semibold text-black pl-5 pb-3">
                                Doctor
                            </TableHead>
                            <TableHead className="font-semibold text-black text-center pb-3">
                                contact details
                            </TableHead>
                            <TableHead className="font-semibold text-black pb-3">
                                Next Scheduled Dates
                            </TableHead>
                            <TableHead className="font-semibold text-black pb-3">
                                Scheduled hours
                            </TableHead>
                            <TableHead className="font-semibold text-black text-right pr-10 pb-3">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctors.map((doc, docIndex) => {
                            return doc.schedules.map(
                                (schedule, scheduleIndex) => (
                                    <TableRow
                                        key={`${doc.id}-${scheduleIndex}`}
                                        className="hover:bg-transparent"
                                    >
                                        {scheduleIndex === 0 && (
                                            <>
                                                <TableCell
                                                    rowSpan={
                                                        doc.schedules.length
                                                    }
                                                    className="pl-5 align-middle w-[250px] border-b"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
                                                        <span className="font-medium text-[14px]">
                                                            {doc.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    rowSpan={
                                                        doc.schedules.length
                                                    }
                                                    className="align-middle border-b"
                                                >
                                                    <div className="flex flex-col gap-1 text-[13px] text-muted-foreground w-max m-auto text-center">
                                                        {doc.phones.map(
                                                            (p, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="text-black font-medium"
                                                                >
                                                                    {p}
                                                                </span>
                                                            ),
                                                        )}
                                                        <span className="mt-1">
                                                            {doc.email}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                            </>
                                        )}
                                        <TableCell className="py-4">
                                            <div className="text-[14px] font-medium text-black">
                                                {schedule.date}
                                            </div>
                                            <div className="text-[13px] text-muted-foreground mt-0.5">
                                                {schedule.day}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            {schedule.hours.map((h, i) => (
                                                <div
                                                    key={i}
                                                    className="text-[14px] font-medium text-black"
                                                >
                                                    {h}
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell className="py-4 text-right pr-6">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ),
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <div className="p-4 border-t mt-auto">
                <ManagementPagination />
            </div>
        </div>
    );
}
