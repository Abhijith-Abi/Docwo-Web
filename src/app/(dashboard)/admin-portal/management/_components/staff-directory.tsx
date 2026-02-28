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
import { useAuthStore } from "@/store/auth-store";
import { useGetClinicStaff } from "@/hooks/api/useGetClinicStaff";

export function StaffDirectory({ view }: { view: "list" | "grid" }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const user = useAuthStore((state) => state.user);
    const clinicId = user?.clinic_assignments?.[0]?.clinic_id;

    const { data: { data: staffs = [], pagination = null } = {}, isLoading } =
        useGetClinicStaff(clinicId, {
            page: currentPage,
            limit: itemsPerPage,
        });

    const totalPages =
        pagination?.totalPages ||
        Math.max(1, Math.ceil(staffs.length / itemsPerPage));
    const hasNextPage = pagination?.hasNextPage ?? currentPage < totalPages;
    const hasPrevPage = pagination?.hasPrevPage ?? currentPage > 1;

    if (isLoading) {
        return (
            <div className="p-8 text-center text-muted-foreground animate-pulse">
                Loading staff directory...
            </div>
        );
    }

    if (view === "grid") {
        return (
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
                    {staffs.map((staff: any, i: number) => (
                        <div
                            key={staff.id || i}
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
                                    {staff.availability &&
                                    staff.availability.length > 0 ? (
                                        staff.availability.map(
                                            (a: any, idx: number) => (
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
                                            ),
                                        )
                                    ) : (
                                        <div className="text-[12px] text-muted-foreground">
                                            No availability set
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
                Staff Directory ({pagination?.totalResults || staffs.length}{" "}
                results)
            </div>

            <div className="overflow-x-auto w-full">
                <Table className="min-w-[1000px] xl:min-w-full">
                    <TableHeader className="bg-blue-50/50 hover:bg-blue-50/50">
                        <TableRow className="border-b-border/60">
                            <TableHead className="font-bold text-foreground h-[52px] text-sm pl-6 w-[25%]">
                                Staff
                            </TableHead>
                            <TableHead className="font-bold text-foreground h-[52px] text-sm w-[20%]">
                                Available Date
                            </TableHead>
                            <TableHead className="font-bold text-foreground h-[52px] text-sm w-[20%]">
                                Available Time
                            </TableHead>
                            <TableHead className="font-bold text-foreground h-[52px] text-sm w-[20%]">
                                Contact
                            </TableHead>
                            <TableHead className="font-bold text-foreground h-[52px] text-sm text-center pr-6 w-[15%]">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {staffs.length > 0 ? (
                            staffs.map((staff: any, i: number) => (
                                <TableRow
                                    key={staff.id || i}
                                    className="border-b-border/50 bg-background hover:bg-background even:bg-muted/30 even:hover:bg-muted/30 h-[88px]"
                                >
                                    <TableCell className="py-4 pl-6 align-top">
                                        <div>
                                            <div className="font-medium text-[14px] text-foreground/90">
                                                {staff.name}
                                            </div>
                                            <div className="text-[13px] text-muted-foreground mt-0.5">
                                                {staff.id}
                                            </div>
                                            <div className="text-[13px] text-muted-foreground mt-0.5 capitalize">
                                                {staff.role}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 align-top">
                                        {staff.availability &&
                                        staff.availability.length > 0 ? (
                                            <div className="flex flex-col gap-3 text-[14px] font-medium text-foreground/90">
                                                {staff.availability.map(
                                                    (a: any, idx: number) => (
                                                        <div key={idx}>
                                                            {a.days}
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-[14px] font-medium text-foreground/90">
                                                -
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="py-4 align-top">
                                        {staff.availability &&
                                        staff.availability.length > 0 ? (
                                            <div className="flex flex-col gap-3 text-[14px] font-medium text-foreground/90">
                                                {staff.availability.map(
                                                    (a: any, idx: number) => (
                                                        <div key={idx}>
                                                            {a.hours}
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-[14px] font-medium text-foreground/90">
                                                -
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="py-4 align-top">
                                        <div className="text-[14px] font-medium text-foreground/90">
                                            {staff.phone}
                                        </div>
                                        <div
                                            className="text-[13px] text-muted-foreground mt-0.5 max-w-[150px] truncate"
                                            title={staff.email}
                                        >
                                            {staff.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 pr-6 text-center align-top">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-foreground mx-auto"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
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
                                            No staff members found
                                        </span>
                                        <span className="text-[13px] text-muted-foreground max-w-[250px]">
                                            We couldn't find any staff members
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
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
