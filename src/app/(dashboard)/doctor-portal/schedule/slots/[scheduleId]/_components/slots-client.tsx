"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useGetDoctorSlots } from "@/hooks/api/useGetDoctorSlots";
import { useEffect } from "react";
import { format } from "date-fns";
import { ChevronLeft, Grid, List, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

import { DoctorSlot } from "@/hooks/api/useGetDoctorSlots";
import { useUpdateDoctorSlot } from "@/hooks/api/useUpdateDoctorSlot";

interface SlotsClientProps {
    scheduleId: string;
}

const initialSlots: DoctorSlot[] = [];

export function SlotsClient({ scheduleId }: SlotsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dateParam = searchParams.get("date");
    const { user } = useAuthStore();

    const doctorId = user?.doctor_profile?.doctor_id;
    const clinicId = user?.doctor_clinics?.[0]?.clinic_id;

    let resolvedDate = dateParam || scheduleId;
    if (resolvedDate && resolvedDate.toLowerCase() === "today") {
        resolvedDate = format(new Date(), "yyyy-MM-dd");
    }

    console.log("SlotsClient render params:", {
        doctorId,
        clinicId,
        resolvedDate,
    });

    const { data: slotsData, isLoading } = useGetDoctorSlots(
        doctorId,
        clinicId,
        resolvedDate,
    );

    const [slots, setSlots] = useState<DoctorSlot[]>(initialSlots);
    const [selectedSlotIds, setSelectedSlotIds] = useState<Set<string>>(
        new Set(),
    );
    const [isSaving, setIsSaving] = useState(false);

    const updateSlotMutation = useUpdateDoctorSlot();

    useEffect(() => {
        if (slotsData?.data && Array.isArray(slotsData.data)) {
            // eslint-disable-next-line
            setSlots(slotsData.data);
        }
    }, [slotsData]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const handleIncrement = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSlots((prev) =>
            prev.map((slot) =>
                slot.slot_id === id
                    ? { ...slot, total_tokens: slot.total_tokens + 1 }
                    : slot,
            ),
        );
    };

    const handleDecrement = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSlots((prev) =>
            prev.map((slot) =>
                slot.slot_id === id && slot.total_tokens > 0
                    ? { ...slot, total_tokens: slot.total_tokens - 1 }
                    : slot,
            ),
        );
    };

    const toggleSlotSelection = (id: string) => {
        setSelectedSlotIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleMarkActive = () => {
        if (selectedSlotIds.size === 0) return;
        setSlots((prev) =>
            prev.map((slot) =>
                selectedSlotIds.has(slot.slot_id)
                    ? { ...slot, status_label: "Active" }
                    : slot,
            ),
        );
        setSelectedSlotIds(new Set());
    };

    const handleMarkInactive = () => {
        if (selectedSlotIds.size === 0) return;
        setSlots((prev) =>
            prev.map((slot) =>
                selectedSlotIds.has(slot.slot_id)
                    ? { ...slot, status_label: "Inactive" }
                    : slot,
            ),
        );
        setSelectedSlotIds(new Set());
    };

    const handleSaveChanges = async () => {
        if (!slotsData?.data) return;
        setIsSaving(true);

        try {
            const changedSlots = slots.filter((currentSlot) => {
                const originalSlot = slotsData.data.find(
                    (s: DoctorSlot) => s.slot_id === currentSlot.slot_id,
                );
                if (!originalSlot) return false;

                return (
                    currentSlot.total_tokens !== originalSlot.total_tokens ||
                    currentSlot.status_label !== originalSlot.status_label
                );
            });

            if (changedSlots.length === 0) {
                toast.info("No changes to save.");
                setIsSaving(false);
                return;
            }

            const updatePromises = changedSlots.map((slot) => {
                return updateSlotMutation.mutateAsync({
                    slotId: slot.slot_id?.toString() || "",
                    data: {
                        is_available: slot.status_label === "Active",
                        total_tokens: slot.total_tokens,
                    },
                });
            });

            const results = await Promise.allSettled(updatePromises);

            const rejected = results.filter(
                (r): r is PromiseRejectedResult => r.status === "rejected",
            );

            if (rejected.length > 0) {
                const firstError = rejected[0].reason;
                const errorMessage =
                    firstError?.message ||
                    firstError?.data?.message ||
                    "Failed to update slots. Please try again.";

                if (rejected.length === results.length) {
                    toast.error(errorMessage);
                } else {
                    toast.error(`Partial success. ${errorMessage}`);
                }
            } else {
                toast.success("Slots updated successfully.");
            }
        } catch (error: unknown) {
            console.error("Error updating slots:", error);
            const err = error as Record<string, unknown>;
            const errorMessage =
                (err?.message as string) ||
                ((err?.data as Record<string, unknown>)?.message as string) ||
                "Failed to update slots. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col w-full h-full animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <Button
                    variant="outline"
                    className="h-10 px-4 w-fit text-foreground/80 hover:text-foreground gap-2 font-medium bg-background hover:bg-muted"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back</span>
                </Button>

                <Button
                    className="w-full sm:w-auto h-8 gap-2"
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-xl font-bold text-foreground tracking-tight">
                        Slots
                    </h1>
                    <h2 className="text-[15px] font-semibold text-muted-foreground mt-1">
                        {dateParam
                            ? format(new Date(dateParam), "EEEE, MMM dd, yyyy")
                            : scheduleId === "Today"
                              ? "Monday, Aug 06, 2025"
                              : scheduleId}
                    </h2>
                </div>

                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
                    <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                            "h-8 px-3 gap-2",
                            viewMode === "grid" && "shadow-sm bg-background",
                        )}
                        onClick={() => setViewMode("grid")}
                    >
                        <Grid className="h-4 w-4" />
                        <span className="hidden sm:inline-block text-xs font-medium">
                            Grid
                        </span>
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                            "h-8 px-3 gap-2",
                            viewMode === "list" && "shadow-sm bg-background",
                        )}
                        onClick={() => setViewMode("list")}
                    >
                        <List className="h-4 w-4" />
                        <span className="hidden sm:inline-block text-xs font-medium">
                            List
                        </span>
                    </Button>
                </div>
            </div>

            {/* Slots Grid Container */}
            <div className="bg-background border border-border/60 rounded-xl p-4 sm:p-6 w-full flex-1 flex flex-col shadow-sm">
                <div
                    className={cn(
                        "grid gap-4",
                        viewMode === "grid"
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                            : "grid-cols-1",
                    )}
                >
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex border rounded-xl p-4 gap-4 border-border/60",
                                    viewMode === "grid"
                                        ? "flex-col items-center justify-center py-5 h-[160px]"
                                        : "flex-col sm:flex-row sm:items-center justify-between h-[80px]",
                                )}
                            >
                                <Skeleton className="h-5 w-32" />
                                <div
                                    className={cn(
                                        "flex",
                                        viewMode === "list"
                                            ? "items-center flex-1 justify-between sm:justify-end gap-6 sm:gap-12"
                                            : "flex-col items-center w-full gap-3 mt-4",
                                    )}
                                >
                                    <Skeleton className="h-8 w-[76px] rounded-full" />
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </div>
                        ))
                    ) : slots.length === 0 ? (
                        <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                            <div className="bg-muted/50 rounded-full p-4 mb-4">
                                <List className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">
                                No slots available
                            </h3>
                            <p className="text-muted-foreground max-w-sm mt-1">
                                There are no slots scheduled for this date. You
                                might need to generate time slots first.
                            </p>
                        </div>
                    ) : (
                        slots.map((slot) => {
                            const isSelected = selectedSlotIds.has(
                                slot.slot_id,
                            );

                            // Format the time range
                            const startTime = slot.slot_timestamp
                                ? format(
                                      new Date(slot.slot_timestamp),
                                      "hh:mm a",
                                  )
                                : "";
                            const endTime = slot.slot_end_timestamp
                                ? format(
                                      new Date(slot.slot_end_timestamp),
                                      "hh:mm a",
                                  )
                                : "";
                            const timeRange = `${startTime} - ${endTime}`;

                            return (
                                <div
                                    key={slot.slot_id}
                                    onClick={() =>
                                        toggleSlotSelection(slot.slot_id)
                                    }
                                    className={cn(
                                        "flex border rounded-xl cursor-pointer transition-all duration-200 select-none",
                                        viewMode === "grid"
                                            ? "flex-col items-center justify-center p-4 py-5"
                                            : "flex-col sm:flex-row sm:items-center justify-between p-4 gap-4",
                                        isSelected
                                            ? "border-primary bg-primary/5 shadow-sm"
                                            : "border-border/80 bg-card hover:border-border hover:bg-muted/30",
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "font-bold text-foreground tracking-tight",
                                            viewMode === "grid"
                                                ? "text-[14px] mb-4 text-center"
                                                : "text-[15px]",
                                        )}
                                    >
                                        {timeRange}
                                    </div>

                                    <div
                                        className={cn(
                                            "flex",
                                            viewMode === "list"
                                                ? "items-center flex-1 justify-between sm:justify-end gap-6 sm:gap-12"
                                                : "flex-col items-center w-full",
                                        )}
                                    >
                                        {/* Custom increment/decrement style pill */}
                                        <div
                                            className={cn(
                                                "flex items-center justify-between border border-border/60 rounded-full px-2 py-0.5 bg-background shadow-xs",
                                                viewMode === "grid"
                                                    ? "w-[68px] mb-3 mx-auto"
                                                    : "w-[76px]",
                                            )}
                                        >
                                            <span
                                                onClick={(e) =>
                                                    handleDecrement(
                                                        e,
                                                        slot.slot_id,
                                                    )
                                                }
                                                className={cn(
                                                    "font-medium text-muted-foreground/80 hover:text-foreground cursor-pointer select-none leading-none -mt-0.5",
                                                    viewMode === "grid"
                                                        ? "text-[14px]"
                                                        : "text-[16px] px-1 pb-0.5",
                                                )}
                                            >
                                                -
                                            </span>
                                            <span className="text-[13px] font-bold text-foreground select-none">
                                                {slot.total_tokens}
                                            </span>
                                            <span
                                                onClick={(e) =>
                                                    handleIncrement(
                                                        e,
                                                        slot.slot_id,
                                                    )
                                                }
                                                className={cn(
                                                    "font-medium text-muted-foreground/80 hover:text-foreground cursor-pointer select-none leading-none -mt-0.5",
                                                    viewMode === "grid"
                                                        ? "text-[14px]"
                                                        : "text-[16px] px-1 pb-0.5",
                                                )}
                                            >
                                                +
                                            </span>
                                        </div>

                                        <div
                                            className={cn(
                                                "text-muted-foreground font-medium flex items-center",
                                                viewMode === "grid"
                                                    ? "text-[11px] mb-1.5 justify-center w-full text-center gap-1"
                                                    : "text-[12px] w-[120px] justify-start",
                                            )}
                                        >
                                            Booked
                                            {viewMode === "grid"
                                                ? " :"
                                                : ":"}{" "}
                                            {slot.booked_tokens}/
                                            {slot.total_tokens}
                                        </div>

                                        <div
                                            className={cn(
                                                "font-bold",
                                                viewMode === "grid"
                                                    ? "text-[12px] text-center"
                                                    : "text-[13px] w-[70px] text-right",
                                                slot.status_label === "Active"
                                                    ? "text-[#059669]"
                                                    : slot.status_label ===
                                                        "Ongoing"
                                                      ? "text-blue-500"
                                                      : "text-red-500",
                                            )}
                                        >
                                            {slot.status_label}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 flex items-center justify-end gap-3 pt-6">
                    <Button
                        variant="outline"
                        className="border-green-600 text-foreground hover:bg-green-50 hover:text-green-700 rounded-[4px] px-6 h-9 font-medium"
                        onClick={handleMarkActive}
                        disabled={selectedSlotIds.size === 0}
                    >
                        Mark Active
                    </Button>
                    <Button
                        variant="outline"
                        className="border-orange-500 text-foreground hover:bg-orange-50 hover:text-orange-600 rounded-[4px] px-6 h-9 font-medium"
                        onClick={handleMarkInactive}
                        disabled={selectedSlotIds.size === 0}
                    >
                        Mark Inactive
                    </Button>
                </div>
            </div>
        </div>
    );
}
