import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DoctorHeader() {
    return (
        <header className="sticky top-0 z-50 bg-[#F8F9FA] pt-4 md:rounded-tl-[2.5rem]">
            <div className="flex items-center justify-between px-4 md:px-8 h-16 max-w-7xl mx-auto pb-4">
                {/* Left Side: Clinic Name & Logo Placeholder */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center shrink-0"></div>
                    <span className="font-semibold text-sm md:text-base whitespace-nowrap hidden lg:inline-block">
                        Lorem Ipsum Clinic
                    </span>
                </div>

                {/* Center: Title & Date */}
                <div className="flex flex-col items-center justify-center text-center truncate absolute left-1/2 -translate-x-1/2">
                    <h1 className="font-bold text-lg md:text-xl text-gray-900 leading-tight">
                        Dashboard
                    </h1>
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                        31 July, Thursday, 2025
                    </span>
                </div>

                {/* Right Side: Doctor Profile */}
                <div className="flex items-center gap-3 text-right">
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900 leading-none">
                            Dr. Ajmal Ashur
                        </p>
                        <p className="text-xs text-gray-500 mt-1">General OP</p>
                    </div>
                    <Avatar className="h-10 w-10 border border-gray-200 bg-gray-100 flex items-center justify-center">
                        <AvatarImage src="/images/doctor-avatar.png" />
                        <AvatarFallback className="bg-gray-400 text-white pattern-dots h-full w-full opacity-60"></AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
