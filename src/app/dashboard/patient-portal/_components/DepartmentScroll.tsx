"use client";

import * as React from "react";
import {
    Activity,
    Baby,
    Brain,
    Eye,
    Heart,
    Microscope,
    Bone,
    Stethoscope,
    Syringe,
} from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
    {
        id: "1",
        name: "General Medicine",
        icon: Stethoscope,
        color: "text-emerald-700",
    },
    {
        id: "2",
        name: "Pediatrics",
        icon: Baby,
        color: "text-emerald-700",
    },
    {
        id: "3",
        name: "Neurology",
        icon: Brain,
        color: "text-emerald-700",
    },
    {
        id: "4",
        name: "Dermatology",
        icon: Syringe, // Using Syringe as placeholder for Dermatology/Cosmetology procedure
        color: "text-emerald-700",
    },
    {
        id: "5",
        name: "Ophthalmology",
        icon: Eye,
        color: "text-emerald-700",
    },
    {
        id: "6",
        name: "Cardiology",
        icon: Heart,
        color: "text-emerald-700",
    },
    {
        id: "7",
        name: "Orthopedics",
        icon: Bone,
        color: "text-emerald-700",
    },
    {
        id: "8",
        name: "Psychiatry",
        icon: Brain, // Reusing Brain or could use another icon if available
        color: "text-emerald-700",
    },
    {
        id: "9",
        name: "Pathology",
        icon: Microscope,
        color: "text-emerald-700",
    },
];

export function DepartmentScroll() {
    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-6 px-1">
                <h2 className="text-2xl font-bold text-[#14532D]">
                    Choose your department
                </h2>
                <Link
                    href="/dashboard/patient-portal/departments"
                    className="text-sm font-medium text-gray-600 hover:text-[#14532D] transition-colors"
                >
                    See all
                </Link>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="w-full relative group"
            >
                <CarouselContent className="-ml-4 pb-4">
                    {DEPARTMENTS.map((dept) => (
                        <CarouselItem
                            key={dept.id}
                            className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8 text-center"
                        >
                            <Link
                                href={`/dashboard/patient-portal/departments/${dept.id}`}
                            >
                                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-emerald-100 flex items-center justify-center bg-white shadow-sm transition-all duration-300 group-hover:border-[#14532D] group-hover:shadow-md">
                                        <dept.icon
                                            className={cn(
                                                "w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 text-gray-700",
                                            )}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <span className="text-sm font-bold text-[#14532D] group-hover:text-[#14532D] transition-colors line-clamp-2 px-1">
                                        {dept.name}
                                    </span>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
                    <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
                </div>
            </Carousel>
        </div>
    );
}
