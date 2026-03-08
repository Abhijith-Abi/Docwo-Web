import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function CalendarQuickView() {
    return (
        <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
            <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <h2 className="text-yellow-600 font-semibold text-lg">
                    Calendar Quick View
                </h2>
            </div>

            <div className="flex flex-col gap-3">
                {/* Today */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#E5E7EB] rounded-md">
                    <span className="text-gray-900 font-medium text-sm">
                        Today
                    </span>
                    <span className="text-gray-900 font-bold text-sm">
                        6 appointments
                    </span>
                </div>

                {/* Tomorrow */}
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm">
                    <span className="text-gray-900 text-sm">Tomorrow</span>
                    <span className="text-gray-900 font-bold text-sm">
                        6 appointments
                    </span>
                </div>

                {/* Sunday */}
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm">
                    <span className="text-gray-900 text-sm">Sunday</span>
                    <span className="text-gray-900 font-bold text-sm">
                        8 appointments
                    </span>
                </div>

                {/* Monday - No Appointments */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#FEF9C3] border border-[#FDE047] rounded-md">
                    <span className="text-[#CA8A04] font-medium text-sm">
                        Monday:{" "}
                        <span className="font-normal opacity-90">
                            No Appointments Scheduled
                        </span>
                    </span>
                </div>
            </div>
        </Card>
    );
}
