"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Grid, List, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SlotsClientProps {
    scheduleId: string;
}

const dummySlots = Array.from({ length: 20 }).map((_, i) => ({
    id: `slot-${i}`,
    timeRange: "09:00AM - 9:20 AM",
    totalBookings: 4,
    currentBooked: 2,
    status: "Active" as "Active" | "Inactive",
}));

export function SlotsClient({ scheduleId }: SlotsClientProps) {
    const router = useRouter();
    const [slots, setSlots] = useState(dummySlots);
    const [selectedSlotIds, setSelectedSlotIds] = useState<Set<string>>(
        new Set(),
    );
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const handleIncrement = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSlots((prev) =>
            prev.map((slot) =>
                slot.id === id
                    ? { ...slot, totalBookings: slot.totalBookings + 1 }
                    : slot,
            ),
        );
    };

    const handleDecrement = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSlots((prev) =>
            prev.map((slot) =>
                slot.id === id && slot.totalBookings > 0
                    ? { ...slot, totalBookings: slot.totalBookings - 1 }
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
                selectedSlotIds.has(slot.id)
                    ? { ...slot, status: "Active" }
                    : slot,
            ),
        );
        setSelectedSlotIds(new Set());
    };

    const handleMarkInactive = () => {
        if (selectedSlotIds.size === 0) return;
        setSlots((prev) =>
            prev.map((slot) =>
                selectedSlotIds.has(slot.id)
                    ? { ...slot, status: "Inactive" }
                    : slot,
            ),
        );
        setSelectedSlotIds(new Set());
    };

    return (
        <div className="flex-1 flex flex-col w-full h-full animate-in fade-in duration-300">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <Button
                    variant="outline"
                    className="h-10 px-4 w-fit text-foreground/80 hover:text-foreground gap-2 font-medium bg-background hover:bg-muted"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back</span>
                </Button>

                <Button className="w-full sm:w-auto h-8 gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-xl font-bold text-foreground tracking-tight">
                        Slots
                    </h1>
                    {/* Date Header matching the screenshot */}
                    <h2 className="text-[15px] font-semibold text-muted-foreground mt-1">
                        {scheduleId === "Today"
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
                    {slots.map((slot) => {
                        const isSelected = selectedSlotIds.has(slot.id);

                        return (
                            <div
                                key={slot.id}
                                onClick={() => toggleSlotSelection(slot.id)}
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
                                    {slot.timeRange}
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
                                                handleDecrement(e, slot.id)
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
                                            {slot.totalBookings}
                                        </span>
                                        <span
                                            onClick={(e) =>
                                                handleIncrement(e, slot.id)
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
                                        Booked{viewMode === "grid" ? " :" : ":"}{" "}
                                        {slot.currentBooked}/
                                        {slot.totalBookings}
                                    </div>

                                    <div
                                        className={cn(
                                            "font-bold",
                                            viewMode === "grid"
                                                ? "text-[12px] text-center"
                                                : "text-[13px] w-[70px] text-right",
                                            slot.status === "Active"
                                                ? "text-[#059669]"
                                                : "text-red-500",
                                        )}
                                    >
                                        {slot.status}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
