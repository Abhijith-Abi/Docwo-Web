"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
        case "completed":
            return {
                label: "Completed",
                className: "bg-[#a7f3d0] text-[#059669] hover:bg-[#a7f3d0]/80",
            };
        case "upcoming":
            return {
                label: "Upcoming",
                className: "bg-blue-100 text-blue-700 hover:bg-blue-100/80",
            };
        case "skip":
        case "no_show":
            return {
                label: "Skip",
                className: "bg-slate-100 text-slate-700 hover:bg-slate-100/80",
            };
        default:
            return {
                label: status || "Unknown",
                className:
                    "bg-gray-100 text-gray-700 hover:bg-gray-100/80 capitalize",
            };
    }
};

export function BookingCard({ booking }: { booking: any }) {
    const statusConfig = getStatusConfig(booking.status);

    return (
        <Card className="rounded-[10px] shadow-sm border border-border/80 hover:border-emerald-200 transition-all group overflow-hidden">
            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-[14px] font-medium text-foreground">
                            <Clock className="h-[14px] w-[14px] text-blue-500" />
                            {booking.time}
                        </div>
                        <div>
                            <Badge
                                variant="outline"
                                className="font-bold text-[12px] rounded-[4px] px-2 py-0.5 border-none shadow-sm gap-1 bg-background"
                            >
                                TKN{" "}
                                <span className="text-emerald-500 ml-1">
                                    {booking.token}
                                </span>
                            </Badge>
                        </div>
                    </div>
                    <Badge
                        variant="secondary"
                        className={cn(
                            "font-semibold text-[11px] px-2.5 py-0.5 rounded-[4px]",
                            statusConfig.className,
                        )}
                    >
                        {statusConfig.label}
                    </Badge>
                </div>

                <div className="mb-4">
                    <h3 className="text-[15px] font-bold text-foreground truncate">
                        {booking.name}
                    </h3>
                    <p className="text-[13px] font-medium text-muted-foreground mt-0.5 truncate">
                        {booking.patientId}
                    </p>
                </div>

                <div className="space-y-3 mt-1 px-0.5">
                    <div className="flex justify-between items-center text-[14px]">
                        <span className="text-muted-foreground">
                            Age / Gender
                        </span>
                        <span className="font-semibold text-foreground">
                            {booking.age} / {booking.gender}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-5 pt-4 border-t border-border/10">
                    <div className="flex items-center gap-2 text-[13px] text-foreground/80 font-medium">
                        <Phone className="h-3.5 w-3.5 text-blue-400" />
                        <span>{booking.phone}</span>
                    </div>
                    <div
                        className="flex items-center gap-2 text-[13px] text-foreground/80 font-medium truncate"
                        title={booking.email}
                    >
                        <Mail className="h-3.5 w-3.5 text-blue-400" />
                        <span className="truncate">{booking.email}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function TotalBookingsGridView({ bookings }: { bookings: any[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {bookings.map((booking, index) => (
                <BookingCard key={booking.id || index} booking={booking} />
            ))}
        </div>
    );
}
