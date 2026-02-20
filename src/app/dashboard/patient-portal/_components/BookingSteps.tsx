"use client";

import * as React from "react";
import Image from "next/image"; // In case we want to use an image inside the phone screen, or we can use div structure.

export function BookingSteps() {
    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#14532D] mb-10 text-left">
                Book Your Slot in Just 3 Easy Steps
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 justify-items-center">
                {/* Step 1 */}
                <PhoneMockup>
                    <div className="flex flex-col h-full bg-white relative overflow-hidden">
                        {/* Status Bar Placeholder */}
                        <div className="h-6 w-full bg-transparent absolute top-0 left-0 z-20"></div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col items-center justify-center p-4 pt-12 text-center">
                            {/* Illustration Placeholder */}
                            <div className="w-32 h-32 bg-emerald-100 rounded-full mb-6 flex items-center justify-center">
                                {/* SVG/Icon would go here */}
                                <div className="text-4xl">📅</div>
                            </div>

                            <h3 className="text-sm font-bold text-[#14532D] mb-2">
                                Schedule Your Appointments
                            </h3>
                            <p className="text-[10px] text-gray-600 mb-6 px-2 leading-tight">
                                With Docwo, your appointment is ready in 3
                                smooth steps! Find your doctor, set your time,
                                and you're done.
                            </p>

                            {/* Carousel Dots */}
                            <div className="flex gap-1 mb-4">
                                <div className="w-4 h-1 bg-[#14532D] rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            </div>

                            {/* Button */}
                            <button className="w-full bg-[#14532D] text-white text-xs font-semibold py-2 rounded-md mt-auto">
                                Next
                            </button>
                        </div>
                    </div>
                </PhoneMockup>

                {/* Step 2 */}
                <PhoneMockup>
                    <div className="flex flex-col h-full bg-white relative overflow-hidden">
                        {/* Content Area */}
                        <div className="flex-1 flex flex-col items-center justify-center p-4 pt-12 text-center">
                            {/* Illustration Placeholder */}
                            <div className="w-32 h-32 bg-blue-100 rounded-full mb-6 flex items-center justify-center">
                                {/* SVG/Icon would go here */}
                                <div className="text-4xl">🧑‍⚕️</div>
                            </div>

                            <h3 className="text-sm font-bold text-[#14532D] mb-2">
                                Connect with Doctors
                            </h3>
                            <p className="text-[10px] text-gray-600 mb-6 px-2 leading-tight">
                                Consult with top specialists via video or
                                in-person. Quality healthcare at your
                                convenience.
                            </p>

                            {/* Carousel Dots */}
                            <div className="flex gap-1 mb-4">
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <div className="w-4 h-1 bg-[#14532D] rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            </div>

                            {/* Button */}
                            <button className="w-full bg-[#14532D] text-white text-xs font-semibold py-2 rounded-md mt-auto">
                                Next
                            </button>
                        </div>
                    </div>
                </PhoneMockup>

                {/* Step 3 */}
                <PhoneMockup>
                    <div className="flex flex-col h-full bg-white relative overflow-hidden">
                        {/* Content Area */}
                        <div className="flex-1 flex flex-col items-center justify-center p-4 pt-12 text-center">
                            {/* Illustration Placeholder */}
                            <div className="w-32 h-32 bg-amber-100 rounded-full mb-6 flex items-center justify-center">
                                {/* SVG/Icon would go here */}
                                <div className="text-4xl">📋</div>
                            </div>

                            <h3 className="text-sm font-bold text-[#14532D] mb-2">
                                Check Your Medical History
                            </h3>
                            <p className="text-[10px] text-gray-600 mb-6 px-2 leading-tight">
                                Get quick access to your appointment details
                                with a simple tap—everything you need is at your
                                fingertips.
                            </p>

                            {/* Carousel Dots */}
                            <div className="flex gap-1 mb-4">
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <div className="w-4 h-1 bg-[#14532D] rounded-full"></div>
                            </div>

                            {/* Button */}
                            <button className="w-full bg-[#14532D] text-white text-xs font-semibold py-2 rounded-md mt-auto">
                                Get Started
                            </button>
                        </div>
                    </div>
                </PhoneMockup>
            </div>
        </div>
    );
}

function PhoneMockup({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-[240px] h-[480px] bg-black rounded-[2.5rem] border-8 border-black overflow-hidden shadow-xl ring-1 ring-gray-900/5">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-white rounded-4xl overflow-hidden">
                {children}
            </div>
        </div>
    );
}
