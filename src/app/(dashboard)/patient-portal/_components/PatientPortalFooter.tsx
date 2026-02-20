"use client";

import * as React from "react";
import { Shield, Smartphone, ArrowRight } from "lucide-react"; // Using fallback icons if needed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Placeholder components for Store Buttons
const GooglePlayButton = () => (
    <div className="flex items-center bg-black text-white px-3 py-1.5 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-900 transition-colors w-full sm:w-auto max-w-[160px]">
        <div className="mr-2">
            <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current text-white"
            >
                <path d="M5.0001,19.3333L18.6668,12L5.0001,4.6666v14.6667ZM18.6668,12L5.0001,4.6666l13.6667,7.3334z" />
            </svg>
            {/* Simple shape, using a generic play like shape or text for now if SVG is too complex inline without assets */}
            {/* A clearer "Get it on" text structure */}
        </div>
        <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] uppercase font-medium">Get it on</span>
            <span className="text-sm font-bold">Google Play</span>
        </div>
    </div>
);

const AppStoreButton = () => (
    <div className="flex items-center bg-black text-white px-3 py-1.5 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-900 transition-colors w-full sm:w-auto max-w-[160px]">
        <div className="mr-2">
            {/* Apple Icon placeholder */}
            <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current text-white"
            >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.61-0.91.61.03 2.32.25 3.4 1.84-2.88 1.34-2.4 5.25.56 6.46-.35 1.4-1.12 3.12-2.02 4.36zM15.42 4.25c.57-1.14 1.05-2.58.73-4.08-1.55.15-3.12 1.15-3.87 2.39-.54 1.13-.86 2.47-.56 4.05 1.49-.07 3.16-1.22 3.7-2.36z" />
            </svg>
        </div>
        <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] uppercase font-medium">
                Download on
            </span>
            <span className="text-sm font-bold">Apple Store</span>
        </div>
    </div>
);

export function PatientPortalFooter() {
    return (
        <div className="relative mt-20">
            {/* Curved Area with Absolute Positioned Content */}
            <div className="absolute top-0 left-0 w-full overflow-visible pointer-events-none z-10 -translate-y-px">
                {/* 
                  The generic curve shape.
                  We want a peak in the center.
                  We can do this with a simple SVG path. 
                */}
                <svg
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    className="w-full h-16 sm:h-24 md:h-32 text-[#021024] fill-current"
                    style={{ transform: "rotate(180deg) scaleX(-1)" }} // Flip it so the "dip" becomes a "peak" if using a standard dip curve,
                    // Actually, let's draw a peak directly.
                >
                    {/* A path that starts at bottom left, goes up to a peak in center, down to bottom right. 
                        Wait, the footer *is* the dark part. So the SVG should be the dark part.
                        So it starts at y=MAX, goes to y=MIN (center), goes to y=MAX.
                        Let's try a cubic bezier.
                    */}
                    <path d="M0,120 C480,0 960,0 1440,120 L1440,120 L0,120 Z" />
                </svg>
            </div>

            {/* Actually, looking at the design, the curve is simpler: A convex shape sitting on top of the footer rect.
                 Let's just use a div with SVG background or clip-path or absolute SVG.
                 The SVG above `M0,120 C...` creates a "hill" if filled. 
                 Since the footer is below, we want this hill to be part of the footer, sitting *above* the main footer rect.
                 So `top: -height`.
            */}
            <div className="relative">
                <div className="absolute -top-12 sm:-top-16 md:-top-24 w-full h-12 sm:h-16 md:h-24 lg:h-32 overflow-hidden z-0">
                    <svg
                        viewBox="0 0 1440 320"
                        className="w-full h-full text-[#021024] fill-current"
                        preserveAspectRatio="none"
                    >
                        <path d="M0,320 C400,200 1040,200 1440,320 L1440,320 L0,320 Z" />
                        {/* 
                           Adjusted path: Start left bottom, curve up towards center top, curve down to right bottom.
                           Actually, standard "hill": M0,100 Q720,0 1440,100 V100 H0 Z (assuming viewbox 0 0 1440 100)
                        */}
                        <path d="M0,320 Q720,50 1440,320 L1440,320 L0,320 Z" />
                    </svg>
                </div>

                <div className="bg-[#021024] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Shield Logo - Absolute positioned at the peak */}
                    <div className="absolute -top-16 sm:-top-20 md:-top-24 left-1/2 -translate-x-1/2 z-20">
                        <div className="relative w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center">
                            {/* Shield Shape Background */}
                            <div className="absolute inset-0 bg-linear-to-b from-white to-emerald-50 opacity-10 rounded-[50%_50%_50%_50%/0%_0%_100%_100%] blur-xl"></div>
                            <div className="bg-linear-to-b from-emerald-50 to-white w-full h-full rounded-b-[4rem] rounded-t-lg shadow-lg flex items-center justify-center overflow-hidden border-4 border-white/20">
                                {/* Logo Icon */}
                                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-[#14532D] fill-emerald-100" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mt-8">
                        {/* Left Section: App Buttons */}
                        <div className="flex flex-col items-center lg:items-start space-y-4 md:space-y-6">
                            {/* <h3 className="text-xl font-bold">Download Our App</h3> */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <GooglePlayButton />
                                <AppStoreButton />
                            </div>
                        </div>

                        {/* Right Section: Subscription */}
                        <div className="flex flex-col text-center lg:text-right">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide">
                                Be Our Subscribers
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 lg:ml-auto max-w-md">
                                to get the latest news about health from our
                                experts
                            </p>

                            <div className="relative max-w-md w-full mx-auto lg:mr-0 lg:ml-auto">
                                <div className="p-1 rounded-full border border-gray-700 bg-[#0A1A2F]/50 flex items-center pl-4 pr-1 py-1">
                                    <input
                                        type="email"
                                        placeholder="example@gmail.com"
                                        className="bg-transparent border-none text-white placeholder:text-gray-500 text-sm flex-1 outline-none focus:ring-0 min-w-0" // min-w-0 fixes flex issues
                                    />
                                    <Button className="bg-[#198754] hover:bg-[#146c43] text-white rounded-full px-6 py-2 h-auto text-sm font-medium ml-2">
                                        Submit{" "}
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
