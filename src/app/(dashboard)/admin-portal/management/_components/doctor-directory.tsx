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
import { useState } from "react";

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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(doctors.length / itemsPerPage);
    const paginatedDoctors = doctors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    if (view === "grid") {
        return (
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
                    {paginatedDoctors.map((doc, docIndex) => (
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
                    <ManagementPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        hasNextPage={currentPage < totalPages}
                        hasPrevPage={currentPage > 1}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden animate-in fade-in duration-300 shadow-sm mt-3 flex flex-col">
            <div className="p-5 font-semibold text-[15px] border-b border-border/60 text-foreground">
                Doctor Directory ({doctors.length} results)
            </div>

            <div className="overflow-x-auto w-full">
                <Table className="min-w-[1000px] xl:min-w-full">
                    <TableHeader className="bg-blue-50/50 hover:bg-blue-50/50">
                        <TableRow className="border-b-border/60">
                            <TableHead className="font-bold text-foreground h-[52px] text-sm pl-6 w-[25%]">
                                Doctor
                            </TableHead>
                            <TableHead className="font-bold text-foreground h-[52px] text-sm text-center w-[20%]">
                                Contact Details
                            </TableHead>
                            <TableHead className="font-bold text-foreground h-[52px] text-sm w-[20%]">
                                Next Scheduled Dates
                            </TableHead>
                            <TableHead className="font-bold text-foreground h-[52px] text-sm w-[20%]">
                                Scheduled Hours
                            </TableHead>
                            <TableHead className="font-bold text-foreground h-[52px] text-sm text-center pr-6 w-[15%]">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedDoctors.length > 0 ? (
                            paginatedDoctors.map((doc, docIndex) => {
                                const rowBg =
                                    docIndex % 2 === 0
                                        ? "bg-background hover:bg-background"
                                        : "bg-muted/30 hover:bg-muted/30";

                                return doc.schedules.map(
                                    (schedule, scheduleIndex) => {
                                        const isLastSchedule =
                                            scheduleIndex ===
                                            doc.schedules.length - 1;
                                        return (
                                            <TableRow
                                                key={`${doc.id}-${scheduleIndex}`}
                                                className={`border-none ${rowBg} ${
                                                    isLastSchedule
                                                        ? "border-b border-border/50"
                                                        : ""
                                                }`}
                                            >
                                                {scheduleIndex === 0 && (
                                                    <>
                                                        <TableCell
                                                            rowSpan={
                                                                doc.schedules
                                                                    .length
                                                            }
                                                            className="pl-6 align-top py-4 border-r border-transparent"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                                                                <span className="font-medium text-[14px] text-foreground/90">
                                                                    {doc.name}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            rowSpan={
                                                                doc.schedules
                                                                    .length
                                                            }
                                                            className="align-top py-4 border-r border-transparent"
                                                        >
                                                            <div className="flex flex-col gap-1 text-[13px] text-muted-foreground w-max m-auto text-center">
                                                                {doc.phones.map(
                                                                    (p, i) => (
                                                                        <span
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="text-[14px] text-foreground/90 font-medium"
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
                                                <TableCell
                                                    className={`py-4 align-top ${
                                                        !isLastSchedule
                                                            ? "pb-2"
                                                            : ""
                                                    } ${scheduleIndex !== 0 ? "pt-2" : ""}`}
                                                >
                                                    <div className="text-[14px] font-medium text-foreground/80">
                                                        {schedule.date}
                                                    </div>
                                                    <div className="text-[13px] text-muted-foreground mt-0.5 capitalize">
                                                        {schedule.day}
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={`py-4 align-top ${
                                                        !isLastSchedule
                                                            ? "pb-2"
                                                            : ""
                                                    } ${scheduleIndex !== 0 ? "pt-2" : ""}`}
                                                >
                                                    {schedule.hours.map(
                                                        (h, i) => (
                                                            <div
                                                                key={i}
                                                                className="text-[14px] font-medium text-foreground/80"
                                                            >
                                                                {h}
                                                            </div>
                                                        ),
                                                    )}
                                                </TableCell>
                                                {scheduleIndex === 0 && (
                                                    <TableCell
                                                        rowSpan={
                                                            doc.schedules.length
                                                        }
                                                        className="py-4 pr-6 text-center align-top"
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-foreground mx-auto"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        );
                                    },
                                );
                            })
                        ) : (
                            <TableRow className="hover:bg-transparent border-none">
                                <TableCell
                                    colSpan={5}
                                    className="h-[300px] text-center align-middle"
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                            <span className="text-muted-foreground font-medium text-lg">
                                                !
                                            </span>
                                        </div>
                                        <span className="text-[15px] font-semibold text-foreground mb-1">
                                            No doctors found
                                        </span>
                                        <span className="text-[13px] text-muted-foreground max-w-[250px]">
                                            We couldn't find any doctors
                                            matching your current filters.
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="pt-4 pb-4">
                <ManagementPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasNextPage={currentPage < totalPages}
                    hasPrevPage={currentPage > 1}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
