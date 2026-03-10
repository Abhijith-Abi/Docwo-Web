import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Clock, Phone, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const appointments = [
    {
        id: 1,
        name: "Amal",
        age: 32,
        gender: "M",
        time: "9.00 AM - 9.20 AM",
        token: "02",
        status: "Completed",
    },
    {
        id: 2,
        name: "Amal",
        age: 32,
        gender: "M",
        time: "9.00 AM - 9.20 AM",
        token: "02",
        status: "Completed",
    },
    {
        id: 3,
        name: "Anu",
        age: 22,
        gender: "F",
        time: "9.00 AM - 9.20 AM",
        token: "04",
        phone: "+91 9977864548",
        status: "Consulting",
    },
    {
        id: 4,
        name: "Amal",
        age: 32,
        gender: "M",
        time: "9.00 AM - 9.20 AM",
        token: "02",
        status: "Upcoming",
    },
    {
        id: 5,
        name: "Amal",
        age: 32,
        gender: "M",
        time: "9.00 AM - 9.20 AM",
        token: "02",
        status: "Upcoming",
    },
];

export function ConsultingCard({ name, age, gender, time, phone, token }: any) {
    return (
        <Card className="bg-[#B6FFC4] border-none shadow-lg min-w-[320px] relative overflow-hidden group">
            <div className="absolute top-4 right-4">
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-none py-1 px-3">
                    Token No : {token}
                </Badge>
            </div>
            <CardContent className="p-8 space-y-6">
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
                        Now Consulting
                    </h3>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-emerald-800 font-semibold">
                        <User className="w-5 h-5 opacity-70" />
                        <span>
                            {name} . {age} . {gender}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-800 font-semibold">
                        <Clock className="w-5 h-5 opacity-70" />
                        <span>{time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-800 font-semibold">
                        <Phone className="w-5 h-5 opacity-70" />
                        <span>{phone}</span>
                    </div>
                </div>

                <Button className="w-full bg-[#F8F9FA] text-emerald-800 hover:bg-white border-2 border-emerald-100/50 shadow-sm font-bold py-6 text-lg rounded-xl">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Mark as Done
                </Button>
            </CardContent>
        </Card>
    );
}

export function UpcomingCard({ name, age, gender, time, token, status }: any) {
    const isCompleted = status === "Completed";

    return (
        <Card
            className={cn(
                "min-w-[280px] border-gray-100 shadow-sm group hover:scale-[1.02] transition-all",
                isCompleted ? "opacity-60 bg-gray-50/50" : "bg-white",
            )}
        >
            <CardContent className="p-6 relative">
                <div className="flex justify-between items-start mb-6">
                    <span
                        className={cn(
                            "text-sm font-bold uppercase tracking-wide",
                            isCompleted ? "text-gray-400" : "text-emerald-600",
                        )}
                    >
                        {status}
                    </span>
                    <Badge
                        variant="outline"
                        className={cn(
                            "border-emerald-100",
                            isCompleted
                                ? "bg-gray-100 text-gray-500"
                                : "bg-emerald-50 text-emerald-600",
                        )}
                    >
                        Token No : {token}
                    </Badge>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700 font-medium">
                        <User className="w-4 h-4 opacity-40" />
                        <span>
                            {name} . {age} . {gender}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <Clock className="w-4 h-4 opacity-40" />
                        <span>{time}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function AppointmentCarousel() {
    return (
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
            {appointments.map((apt) => (
                <div key={apt.id} className="snap-start shrink-0">
                    {apt.status === "Consulting" ? (
                        <ConsultingCard {...apt} />
                    ) : (
                        <UpcomingCard {...apt} />
                    )}
                </div>
            ))}
        </div>
    );
}
