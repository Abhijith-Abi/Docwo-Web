import React from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function NextAppointment() {
    return (
        <Card className="w-full bg-white flex flex-col p-6 shadow-sm border-gray-200">
            <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-blue-500" />
                <h2 className="text-blue-500 font-semibold text-lg">
                    Next Appointment
                </h2>
            </div>

            <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-blue-100"
                        />
                        {/* Progress Circle (Arch) */}
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray="351.86" /* 2 * PI * r */
                            strokeDashoffset="100" /* Adjust for progress, e.g. 70% */
                            className="text-[#3b82f6] drop-shadow-sm"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="flex flex-col items-center justify-center z-10 bg-white rounded-full w-[88px] h-[88px] shadow-sm">
                        <span className="text-3xl font-bold text-gray-900 border-none outline-none">
                            19
                        </span>
                    </div>
                </div>
            </div>

            <div className="text-center space-y-1">
                <h3 className="font-bold text-gray-900 text-lg">
                    Ajmal Ashrudheen
                </h3>
                <p className="text-gray-500 text-sm">35 / M</p>
                <p className="text-gray-400 text-xs mt-2">
                    Time Schedule : 09:00 to 09:15
                </p>
            </div>
        </Card>
    );
}
