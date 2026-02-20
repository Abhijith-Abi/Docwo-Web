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
import { Quote } from "lucide-react";

const TESTIMONIALS = [
    {
        id: "1",
        name: "Mr. Jobin Jose",
        title: "CEO, Health Care Clinic",
        image: "/images/test.png", // Placeholder
        text: "Docwo Is A Great Platform For Booking Medical Appointments. I've Already Completed Nearly 30 Bookings, And The Process Has Been Smooth And Reliable Every Time. I Highly Recommend Docwo To Anyone Looking For A Convenient Way To Manage Their Healthcare Appointments.",
    },
    {
        id: "2",
        name: "Mr. Jobin Jose",
        title: "CEO, Health Care Clinic",
        image: "/images/test.png",
        text: "Docwo Is A Great Platform For Booking Medical Appointments. I've Already Completed Nearly 30 Bookings, And The Process Has Been Smooth And Reliable Every Time. I Highly Recommend Docwo To Anyone Looking For A Convenient Way To Manage Their Healthcare Appointments.",
    },
    {
        id: "3",
        name: "Mr. Jobin Jose",
        title: "CEO, Health Care Clinic",
        image: "/images/test.png",
        text: "Docwo Is A Great Platform For Booking Medical Appointments. I've Already Completed Nearly 30 Bookings, And The Process Has Been Smooth And Reliable Every Time. I Highly Recommend Docwo To Anyone Looking For A Convenient Way To Manage Their Healthcare Appointments.",
    },
];

export function Testimonials() {
    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-[#14532D] mb-8">
                Testimonials
            </h2>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full relative group" // Removed overflow-visible to keep arrows cleaner if needed, or add it back if they should be outside
            >
                <CarouselContent className="-ml-6 py-4">
                    {TESTIMONIALS.map((item) => (
                        <CarouselItem
                            key={item.id}
                            className="pl-6 md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col h-full relative overflow-hidden">
                                {/* Top Right Green Accent (Decorative) */}
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-50 rounded-full z-0"></div>

                                {/* Quote Icon */}
                                <div className="text-[#14532D] mb-4 z-10">
                                    <Quote
                                        size={40}
                                        fill="#14532D"
                                        className="rotate-180"
                                    />
                                </div>

                                {/* Text */}
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium mb-6 z-10">
                                    {item.text}
                                </p>

                                {/* Divider */}
                                <div className="h-px w-full bg-gray-200 mb-6 z-10"></div>

                                {/* User Info */}
                                <div className="flex items-center justify-between gap-4 z-10 mt-auto">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="text-right">
                                        <h4 className="text-sm font-bold text-[#14532D]">
                                            {item.name}
                                        </h4>
                                        <p className="text-[10px] font-semibold text-gray-800">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden lg:block">
                    <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
                    <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
                </div>
            </Carousel>
        </div>
    );
}
