"use client";

import * as React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DOCTORS = [
    {
        id: "1",
        name: "Dr Nitha Menon",
        specialization: "Physician",
        image: "/images/test.png", // Placeholder
    },
    {
        id: "2",
        name: "Dr Meera M",
        specialization: "Cardiology",
        image: "/images/test.png",
    },
    {
        id: "3",
        name: "Dr Sneha Nair",
        specialization: "Pediatrics",
        image: "/images/test.png",
    },
    {
        id: "4",
        name: "Dr Varun Menon",
        specialization: "Pulmonology",
        image: "/images/test.png",
    },
    {
        id: "5",
        name: "Dr Fathima S",
        specialization: "Orthopedics",
        image: "/images/test.png",
    },
    {
        id: "6",
        name: "Dr Arun Prakash",
        specialization: "General Surgery",
        image: "/images/test.png",
    },
    {
        id: "7",
        name: "Dr Farhan Ali",
        specialization: "Dermatology",
        image: "/images/test.png",
    },
    {
        id: "8",
        name: "Dr Anitha Raj",
        specialization: "ENT",
        image: "/images/test.png",
    },
];

export function DoctorScroll() {
    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-6 px-1">
                <h2 className="text-2xl font-bold text-[#14532D]">
                    Our Doctors Team
                </h2>
                {/* Optional 'See all' link if needed, usually present in such sections */}
            </div>

            <Carousel
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="w-full relative group"
            >
                <CarouselContent className="-ml-4 pb-4">
                    {DOCTORS.map((doc) => (
                        <CarouselItem
                            key={doc.id}
                            className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 text-center"
                        >
                            <Link href={`/patient-portal/doctors/${doc.id}`}>
                                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                                        <Image
                                            src={doc.image}
                                            alt={doc.name}
                                            fill
                                            className="object-cover"
                                        />
                                        {/* Overlay for 'View Profile' - mimicking the green pill at bottom of image */}
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#14532D] text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            View Profile
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm font-bold text-[#14532D] group-hover:text-[#14532D] transition-colors">
                                            {doc.name}
                                        </span>
                                        <span className="text-xs font-semibold text-black">
                                            {doc.specialization}
                                        </span>
                                    </div>
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
