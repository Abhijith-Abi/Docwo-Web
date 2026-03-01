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
import { MoreHorizontal, Users, SearchX } from "lucide-react";
import { ManagementPagination } from "./management-pagination";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useGetClinicStaff } from "@/hooks/api/useGetClinicStaff";
import { Skeleton } from "@/components/ui/skeleton";
import { DataErrorState } from "@/components/ui/data-state-view";

function formatTime12h(time24: string): string {
    if (!time24) return "";
    const [hoursStr, minutesStr] = time24.split(":");
    let hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours.toString().padStart(2, "0")}:${minutesStr} ${ampm}`;
}

export function DoctorDirectory({
    view,
    search,
}: {
    view: "list" | "grid";
    search?: string;
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const user = useAuthStore((state) => state.user);
    const clinicId = user?.clinic_assignments?.[0]?.clinic_id;

    const {
        data: { data = [], pagination = null } = {},
        isLoading,
        isError,
    } = useGetClinicStaff(clinicId, {
        page: currentPage,
        limit: itemsPerPage,
        role: "doctor",
        search,
    });

    if (isError) {
        return (
            <DataErrorState title="Failed to load doctors" className="mt-3" />
        );
    }

    const totalPages =
        pagination?.totalPages ||
        Math.max(1, Math.ceil(data.length / itemsPerPage));
    const hasNextPage = pagination?.hasNextPage ?? currentPage < totalPages;
    const hasPrevPage = pagination?.hasPrevPage ?? currentPage > 1;

    const paginatedDoctors = data.map((staff: any) => ({
        id: staff.id,
        name: staff.name,
        phones: staff.phone && staff.phone !== "-" ? [staff.phone] : [],
        email: staff.email,
        schedules:
            staff.availability?.length > 0
                ? staff.availability.map((a: any) => ({
                      date: "-",
                      day: a.day || a.days || "-",
                      hours:
                          a.start && a.end
                              ? [
                                    `${formatTime12h(a.start)} - ${formatTime12h(a.end)}`,
                                ]
                              : a.hours
                                ? [a.hours]
                                : ["-"],
                  }))
                : [{ date: "-", day: "-", hours: ["-"] }],
    }));

    if (isLoading) {
        if (view === "grid") {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-[12px] p-5 shadow-sm flex flex-col h-[320px]"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                            <div className="space-y-2 mb-4">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-2/3" />
                            </div>
                            <div className="mt-auto space-y-3 pt-4 border-t">
                                <Skeleton className="h-3 w-1/3 mb-2" />
                                <div className="space-y-2">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden animate-in fade-in duration-300 shadow-sm mt-3 flex flex-col">
                <div className="p-5 border-b border-border/60 flex items-center">
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="p-0">
                    <Table className="min-w-[1000px] xl:min-w-full">
                        <TableHeader className="bg-blue-50/50">
                            <TableRow>
                                <TableHead className="w-[25%]">
                                    <Skeleton className="h-4 w-16" />
                                </TableHead>
                                <TableHead className="w-[20%]">
                                    <Skeleton className="h-4 w-24" />
                                </TableHead>
                                <TableHead className="w-[20%]">
                                    <Skeleton className="h-4 w-32" />
                                </TableHead>
                                <TableHead className="w-[20%]">
                                    <Skeleton className="h-4 w-24" />
                                </TableHead>
                                <TableHead className="w-[15%]">
                                    <Skeleton className="h-4 w-12" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <TableRow key={i} className="h-[88px]">
                                    <TableCell className="pl-6 pt-4">
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-24" />
                                            <Skeleton className="h-3 w-32" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-20" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-24" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center pr-6">
                                        <Skeleton className="h-8 w-8 rounded-md mx-auto" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }

    if (view === "grid") {
        if (paginatedDoctors.length === 0) {
            return (
                <div className="border border-border/60 bg-white rounded-[12px] h-[400px] flex items-center justify-center animate-in fade-in duration-300 shadow-sm mt-3">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                            <SearchX className="h-6 w-6 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                            No doctors found
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            We couldn't find any doctors matching your current
                            filters. Try changing your search query.
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
                    {paginatedDoctors.map((doc: any, docIndex: number) => (
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
                                <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 flex items-center justify-center text-slate-500 font-semibold text-lg">
                                    {doc.name
                                        ? doc.name.charAt(0).toUpperCase()
                                        : "?"}
                                </div>
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
                                {doc.phones.map((p: string, i: number) => (
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
                                        .map((schedule: any, idx: number) => (
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
                                                        (
                                                            h: string,
                                                            i: number,
                                                        ) => (
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
                        hasNextPage={hasNextPage}
                        hasPrevPage={hasPrevPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-[10px] border border-border/60 bg-card overflow-hidden animate-in fade-in duration-300 shadow-sm mt-3 flex flex-col">
            <div className="p-5 font-semibold text-[15px] border-b border-border/60 text-foreground">
                Doctor Directory ({pagination?.totalResults || data.length}{" "}
                results)
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
                            <TableHead className="font-bold text-foreground h-[52px] text-sm text-center w-[20%]">
                                Next Scheduled Dates
                            </TableHead>
                            <TableHead className="font-bold text-foreground h-[52px] text-sm text-center w-[20%]">
                                Scheduled Hours
                            </TableHead>
                            <TableHead className="font-bold text-foreground h-[52px] text-sm text-center pr-6 w-[15%]">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedDoctors.length > 0 ? (
                            paginatedDoctors.map(
                                (doc: any, docIndex: number) => {
                                    const rowBg =
                                        docIndex % 2 === 0
                                            ? "bg-background hover:bg-background"
                                            : "bg-muted/30 hover:bg-muted/30";

                                    return doc.schedules.map(
                                        (
                                            schedule: any,
                                            scheduleIndex: number,
                                        ) => {
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
                                                                    doc
                                                                        .schedules
                                                                        .length
                                                                }
                                                                className="pl-6 align-top py-4 border-r border-transparent"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 flex items-center justify-center text-slate-500 font-semibold">
                                                                        {doc.name
                                                                            ? doc.name
                                                                                  .charAt(
                                                                                      0,
                                                                                  )
                                                                                  .toUpperCase()
                                                                            : "?"}
                                                                    </div>
                                                                    <span className="font-medium text-[14px] text-foreground/90">
                                                                        {
                                                                            doc.name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                rowSpan={
                                                                    doc
                                                                        .schedules
                                                                        .length
                                                                }
                                                                className="align-top py-4 border-r border-transparent"
                                                            >
                                                                <div className="flex flex-col gap-1 text-[13px] text-muted-foreground w-max m-auto text-center">
                                                                    {doc.phones.map(
                                                                        (
                                                                            p: string,
                                                                            i: number,
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="text-[14px] text-foreground/90 font-medium"
                                                                            >
                                                                                {
                                                                                    p
                                                                                }
                                                                            </span>
                                                                        ),
                                                                    )}
                                                                    <span className="mt-1">
                                                                        {
                                                                            doc.email
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                        </>
                                                    )}
                                                    <TableCell
                                                        className={`py-4 align-top text-center ${
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
                                                        className={`py-4 align-top text-center ${
                                                            !isLastSchedule
                                                                ? "pb-2"
                                                                : ""
                                                        } ${scheduleIndex !== 0 ? "pt-2" : ""}`}
                                                    >
                                                        {schedule.hours.map(
                                                            (
                                                                h: string,
                                                                i: number,
                                                            ) => (
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
                                                                doc.schedules
                                                                    .length
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
                                },
                            )
                        ) : (
                            <TableRow className="hover:bg-transparent border-none">
                                <TableCell
                                    colSpan={5}
                                    className="h-[350px] text-center align-middle"
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                            <SearchX className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <span className="text-lg font-semibold text-foreground mb-1">
                                            No doctors found
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            We couldn't find any doctors
                                            matching your current filters. Try
                                            changing your search query.
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
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
