"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Grid,
    List,
    Calendar,
    Save,
    Plus,
    Minus,
    Search,
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

export function MonthsClient({ scheduleId }: SlotsClientProps) {
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
            <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        className="h-10 px-4 w-fit text-foreground/80 hover:text-foreground gap-2 font-medium bg-background hover:bg-muted"
                        onClick={() => router.push("/doctor-portal/schedule")}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>

                    <Button className="h-9 px-6 bg-[#0E8A63] hover:bg-[#0E8A63]/90 text-white gap-2 font-medium">
                        Save Changes
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-muted/50 p-2 rounded-lg">
                            <Calendar className="h-6 w-6 text-foreground/70" />
                        </div>
                        <h1 className="text-xl font-bold text-foreground tracking-tight">
                            {scheduleId === "Today"
                                ? "Wednesday, Aug 11, 2025"
                                : scheduleId}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-2 text-sm ml-12">
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground font-semibold">
                                Start time :
                            </span>
                            <span className="font-bold text-foreground">
                                09:00 AM
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground font-semibold">
                                End time :
                            </span>
                            <span className="font-bold text-foreground">
                                05:00 PM
                            </span>
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground font-semibold">
                                    Total Booking: Count /
                                </span>
                                <span className="font-bold text-foreground">
                                    80
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
                        <Select defaultValue="15">
                            <SelectTrigger className="w-full h-11 bg-muted/20 border-border/40">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10 minutes</SelectItem>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="20">20 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-[13px] font-bold text-foreground">
                            Tokens per slot
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                defaultValue={4}
                                className="h-11 bg-muted/20 border-border/40 pr-10 pl-3 font-medium"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center -gap-1">
                                <ChevronLeft className="h-3 w-3 rotate-90 text-muted-foreground cursor-pointer hover:text-foreground" />
                                <ChevronLeft className="h-3 w-3 -rotate-90 text-muted-foreground cursor-pointer hover:text-foreground" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Slots Grid Container */}
            <div className="bg-background border border-border/60 rounded-[12px] w-full flex-1 flex flex-col shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-end mb-6 gap-3">
                        <Button
                            variant={
                                viewMode === "grid" ? "secondary" : "ghost"
                            }
                            size="icon"
                            className={cn(
                                "h-8 w-8 p-0 text-muted-foreground hover:text-foreground",
                                viewMode === "grid" &&
                                    "bg-muted/60 text-foreground",
                            )}
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={
                                viewMode === "list" ? "secondary" : "ghost"
                            }
                            size="icon"
                            className={cn(
                                "h-8 w-8 p-0 text-muted-foreground hover:text-foreground",
                                viewMode === "list" &&
                                    "bg-muted/60 text-foreground",
                            )}
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>

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
                                                "flex items-center justify-between border border-border/40 rounded-full py-0.5 bg-background shadow-xs",
                                                viewMode === "grid"
                                                    ? "w-[80px] mb-3 mx-auto px-2"
                                                    : "w-[86px] px-3",
                                            )}
                                        >
                                            <div
                                                onClick={(e) =>
                                                    handleDecrement(e, slot.id)
                                                }
                                                className="h-5 w-5 flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors"
                                            >
                                                <Minus
                                                    className="h-2.5 w-2.5 text-muted-foreground"
                                                    strokeWidth={3}
                                                />
                                            </div>
                                            <span className="text-[13px] font-bold text-foreground select-none">
                                                {slot.totalBookings}
                                            </span>
                                            <div
                                                onClick={(e) =>
                                                    handleIncrement(e, slot.id)
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
                </div>

                {/* Footer Buttons */}
                <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-border/40 bg-card/10">
                    <Button
                        variant="outline"
                        className="border-orange-400 text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-[4px] px-8 h-9 font-medium"
                        onClick={handleMarkActive}
                        disabled={selectedSlotIds.size === 0}
                    >
                        Mark Active
                    </Button>
                    <Button
                        variant="outline"
                        className="border-[#0E8A63] text-[#0E8A63] hover:bg-emerald-50 hover:text-[#0E8A63] rounded-[4px] px-8 h-9 font-medium"
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
