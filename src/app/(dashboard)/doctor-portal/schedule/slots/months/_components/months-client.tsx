"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
    ChevronLeft,
    Grid,
    List,
    Calendar,
    Save,
    Plus,
    Minus,
    Search,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useSearchParams } from "next/navigation";
import { format, addMinutes, parseISO } from "date-fns";
import { DoctorSlot, useGetDoctorSlots } from "@/hooks/api/useGetDoctorSlots";
import { useUpdateDoctorSlotsBulk } from "@/hooks/api/useUpdateDoctorSlotsBulk";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxTrigger,
} from "@/components/ui/combobox";

interface SlotsClientProps {
    scheduleId: string;
}

const initialSlots: DoctorSlot[] = [];

export function MonthsClient({ scheduleId }: SlotsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const dateParam = searchParams.get("date");
    const { user } = useAuthStore();

    const doctorId = user?.doctor_profile?.doctor_id;
    const clinicId = user?.doctor_clinics?.[0]?.clinic_id;

    let resolvedDate = dateParam || scheduleId;
    if (resolvedDate && resolvedDate.toLowerCase() === "today") {
        resolvedDate = format(new Date(), "yyyy-MM-dd");
    }

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
    const [saveProgress, setSaveProgress] = useState({ current: 0, total: 0 });
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [slotDuration, setSlotDuration] = useState("15");

    const updateSlotsMutation = useUpdateDoctorSlotsBulk();

    useEffect(() => {
        if (slotsData?.data && Array.isArray(slotsData.data)) {
            // eslint-disable-next-line
            setSlots(slotsData.data);
        }
    }, [slotsData]);

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

    const handleBulkTokenChange = (value: number) => {
        if (value < 0) return;
        setSlots((prev) =>
            prev.map((slot) => ({
                ...slot,
                total_tokens: value,
            })),
        );
    };

    const recalculateSlotTimes = (durationMinutes: number) => {
        if (slots.length === 0) return;

        setSlots((prev) => {
            const newSlots = [...prev];
            // Use the first slot's start time as the anchor
            const firstSlotStartTime = new Date(newSlots[0].slot_timestamp);
            let currentStartTime = firstSlotStartTime;

            return newSlots.map((slot) => {
                const startTime = currentStartTime;
                const endTime = addMinutes(startTime, durationMinutes);
                
                // Update currentStartTime for the next slot
                currentStartTime = endTime;

                return {
                    ...slot,
                    slot_timestamp: startTime.toISOString(),
                    slot_end_timestamp: endTime.toISOString(),
                };
            });
        });
    };

    const handleDurationChange = (value: string | string[] | null) => {
        const newValue = Array.isArray(value) ? value[0] : (value || "");
        if (newValue === slotDuration) return;
        
        setSlotDuration(newValue);
        const duration = parseInt(newValue, 10);
        if (!isNaN(duration) && duration > 0) {
            recalculateSlotTimes(duration);
        }
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
                    currentSlot.status_label !== originalSlot.status_label ||
                    currentSlot.slot_timestamp !== originalSlot.slot_timestamp ||
                    currentSlot.slot_end_timestamp !== originalSlot.slot_end_timestamp
                );
            });

            const totalChanges = changedSlots.length;
            if (totalChanges === 0) {
                toast.info("No changes to save.");
                setIsSaving(false);
                return;
            }

            const updates = changedSlots.map((slot) => {
                const originalSlot = slotsData.data.find(
                    (s: DoctorSlot) => s.slot_id === slot.slot_id,
                );
                
                return {
                    slot_id: slot.slot_id,
                    is_available: slot.status_label === "Active",
                    total_tokens: slot.total_tokens,
                    slot_timestamp: slot.slot_timestamp !== originalSlot?.slot_timestamp ? slot.slot_timestamp : undefined,
                    slot_end_timestamp: slot.slot_end_timestamp !== originalSlot?.slot_end_timestamp ? slot.slot_end_timestamp : undefined,
                };
            });

            await updateSlotsMutation.mutateAsync({ updates });
            toast.success("Slots updated successfully.");
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

    const earliestSlot =
        slots.length > 0
            ? slots.reduce((prev, curr) =>
                  new Date(prev.slot_timestamp) < new Date(curr.slot_timestamp)
                      ? prev
                      : curr,
              )
            : null;
    const latestSlot =
        slots.length > 0
            ? slots.reduce((prev, curr) =>
                  new Date(prev.slot_end_timestamp) >
                  new Date(curr.slot_end_timestamp)
                      ? prev
                      : curr,
              )
            : null;

    const overallStartTime = earliestSlot?.slot_timestamp
        ? format(new Date(earliestSlot.slot_timestamp), "hh:mm a")
        : "—";
    const overallEndTime = latestSlot?.slot_end_timestamp
        ? format(new Date(latestSlot.slot_end_timestamp), "hh:mm a")
        : "—";

    const totalBooked = slots.reduce(
        (acc, curr) => acc + (curr.booked_tokens || 0),
        0,
    );
    const totalTokens = slots.reduce(
        (acc, curr) => acc + (curr.total_tokens || 0),
        0,
    );

    return (
        <div className="flex-1 flex flex-col w-full h-full animate-in fade-in duration-300 relative">
            {/* Progress Overlay */}
            {isSaving && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
                    <Card className="w-[320px] p-6 shadow-2xl border-primary/20 animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="relative flex items-center justify-center">
                                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                                <span className="absolute text-[10px] font-bold text-primary">
                                    {Math.round(
                                        (saveProgress.current /
                                            saveProgress.total) *
                                            100,
                                    )}
                                    %
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold text-foreground">
                                    Updating Slots
                                </h3>
                                <p className="text-xs text-muted-foreground font-medium">
                                    Processed {saveProgress.current} of{" "}
                                    {saveProgress.total} slots...
                                </p>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden mt-2">
                                <div
                                    className="bg-primary h-full transition-all duration-300 ease-out"
                                    style={{
                                        width: `${(saveProgress.current / saveProgress.total) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            <div className="flex flex-col gap-6 mb-2">
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        className="h-10 px-4 w-fit text-foreground/80 hover:text-foreground gap-2 font-medium bg-background hover:bg-muted"
                        onClick={() => router.push("/doctor-portal/schedule")}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>

                    <Button
                        className="h-9 px-6 bg-[#0E8A63] hover:bg-[#0E8A63]/90 text-white gap-2 font-medium"
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

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-muted/50 p-2 rounded-lg">
                            <Calendar className="h-6 w-6 text-foreground/70" />
                        </div>
                        <h1 className="text-xl font-bold text-foreground tracking-tight">
                            {resolvedDate
                                ? format(
                                      new Date(resolvedDate),
                                      "EEEE, MMM dd, yyyy",
                                  )
                                : scheduleId}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-2 text-sm ml-12">
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground font-semibold">
                                Start time :
                            </span>
                            <span className="font-bold text-foreground">
                                {overallStartTime}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground font-semibold">
                                End time :
                            </span>
                            <span className="font-bold text-foreground">
                                {overallEndTime}
                            </span>
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground font-semibold">
                                    Total Bookings :
                                </span>
                                <span className="font-bold text-foreground">
                                    {totalBooked} / {totalTokens}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="mb-8 bg-border/40" />

            {/* Configuration Section */}
            <Card className="p-6 mb-8 border-border/60 shadow-sm bg-card/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <Label className="text-[13px] font-bold text-foreground">
                            Slot duration
                        </Label>
                        <Combobox 
                            value={slotDuration} 
                            onValueChange={handleDurationChange}
                        >
                            <ComboboxInput 
                                placeholder="Select duration" 
                                className="w-full h-10 bg-muted/20 border-border/40"
                            />
                            <ComboboxContent sideOffset={4}>
                                <ComboboxList>
                                    <ComboboxItem value="10">10 minutes</ComboboxItem>
                                    <ComboboxItem value="15">15 minutes</ComboboxItem>
                                    <ComboboxItem value="20">20 minutes</ComboboxItem>
                                    <ComboboxItem value="30">30 minutes</ComboboxItem>
                                    <ComboboxItem value="45">45 minutes</ComboboxItem>
                                    <ComboboxItem value="60">60 minutes</ComboboxItem>
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-[13px] font-bold text-foreground">
                            Tokens per slot
                        </Label>
                        <div className="relative">
                            <Input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={slots[0]?.total_tokens || ""}
                                onChange={(e) => {
                                    const val = e.target.value.replace(
                                        /[^0-9]/g,
                                        "",
                                    );
                                    handleBulkTokenChange(
                                        val === "" ? 0 : parseInt(val, 10),
                                    );
                                }}
                                className="h-10 bg-muted/20 border-border/40 pr-10 pl-3 font-medium"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center -space-y-1.5 pt-0.5 pointer-events-none">
                                <div
                                    className="pointer-events-auto"
                                    onClick={() =>
                                        handleBulkTokenChange(
                                            (slots[0]?.total_tokens || 0) + 1,
                                        )
                                    }
                                >
                                    <ChevronLeft className="h-3 w-3 rotate-90 text-muted-foreground cursor-pointer hover:text-foreground" />
                                </div>
                                <div
                                    className="pointer-events-auto"
                                    onClick={() =>
                                        handleBulkTokenChange(
                                            Math.max(
                                                0,
                                                (slots[0]?.total_tokens || 0) -
                                                    1,
                                            ),
                                        )
                                    }
                                >
                                    <ChevronLeft className="h-3 w-3 -rotate-90 text-muted-foreground cursor-pointer hover:text-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Slots Grid Container */}
            <div className="bg-background border border-border/60 rounded-[12px] w-full flex-1 flex flex-col shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-end mb-6">
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
                                        "flex border rounded-xl p-4 gap-4 border-border/50",
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
                                        <Skeleton className="h-8 w-[86px] rounded-full" />
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
                                    There are no slots scheduled for this date.
                                    You might need to generate time slots first.
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
                                                ? "flex-col items-center justify-center p-5 pt-7"
                                                : "flex-col sm:flex-row sm:items-center justify-between p-4 gap-4",
                                            isSelected
                                                ? "border-primary bg-primary/5 shadow-sm"
                                                : "border-border/50 bg-card hover:border-border/80 hover:bg-muted/10",
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "font-bold text-foreground tracking-tight",
                                                viewMode === "grid"
                                                    ? "text-[15px] mb-5 text-center"
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
                                                    "flex items-center justify-between border border-border/40 rounded-full py-0.5 bg-background shadow-xs",
                                                    viewMode === "grid"
                                                        ? "w-[80px] mb-3 mx-auto px-2"
                                                        : "w-[86px] px-3",
                                                )}
                                            >
                                                <div
                                                    onClick={(e) =>
                                                        handleDecrement(
                                                            e,
                                                            slot.slot_id,
                                                        )
                                                    }
                                                    className="h-5 w-5 flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors"
                                                >
                                                    <Minus
                                                        className="h-2.5 w-2.5 text-muted-foreground"
                                                        strokeWidth={3}
                                                    />
                                                </div>
                                                <span className="text-[13px] font-bold text-foreground select-none">
                                                    {slot.total_tokens}
                                                </span>
                                                <div
                                                    onClick={(e) =>
                                                        handleIncrement(
                                                            e,
                                                            slot.slot_id,
                                                        )
                                                    }
                                                    className="h-5 w-5 flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors"
                                                >
                                                    <Plus
                                                        className="h-2.5 w-2.5 text-muted-foreground"
                                                        strokeWidth={3}
                                                    />
                                                </div>
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
                                                    slot.status_label ===
                                                        "Active"
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
                </div>

                <div className="flex items-center justify-end gap-3 p-2">
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
