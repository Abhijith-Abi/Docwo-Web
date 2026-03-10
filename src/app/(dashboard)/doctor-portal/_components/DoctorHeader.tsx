"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth-store";
import { format } from "date-fns";
import Image from "next/image";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
    "doctor-portal": "Dashboard",
    appointments: "Appointments",
    patients: "Patients",
    schedule: "Schedule",
    settings: "Settings",
};

function getPageTitle(pathname: string): string {
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    return PAGE_TITLES[last] ?? "Dashboard";
}

export default function DoctorHeader() {
    const pathname = usePathname();
    const date = format(new Date(), "dd MMMM, EEEE, yyyy");
    const title = getPageTitle(pathname);
    const user = useAuthStore((state) => state.user);
    const doctorName = user
        ? `Dr. ${user.first_name || ""} ${user.last_name || ""}`.trim()
        : "";
    const primaryClinic = user?.doctor_clinics?.[0];
    const clinicName = primaryClinic?.name;
     
    const clinicLogo =
        primaryClinic?.images?.find((img: any) => img.image_type === "logo")
            ?.url || primaryClinic?.images?.[0]?.url;
    const doctorSpecialization = user?.doctor_profile?.qualification;

    return (
        <header className="sticky top-0 z-50 bg-[#F8F9FA] pt-4 md:rounded-tl-[2.5rem]">
            <div className="flex items-center justify-between px-2 md:px-8 h-16 max-w-7xl mx-auto pb-4 gap-2 md:gap-4 truncate">
                <div className="flex flex-1 items-center w-full min-w-0 pr-2 md:pr-4">
                    <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center shrink-0">
                        {clinicLogo ? (
                            <Image
                                src={clinicLogo}
                                alt="Clinic Logo"
                                width={36}
                                height={36}
                                className="w-9 h-9 bg-white rounded-xl p-1.5 object-contain"
                            />
                        ) : (
                            <span className="font-bold text-gray-500 text-xs">
                                {clinicName?.charAt(0) || "C"}
                            </span>
                        )}
                    </div>
                    <span className="font-semibold text-sm md:text-base whitespace-nowrap hidden lg:inline-block">
                        {clinicName || "Clinic Name"}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center flex-shrink-0 max-w-[50%] md:max-w-[40%]">
                    <h1 className="font-bold text-lg md:text-xl text-gray-900 leading-tight truncate w-full">
                        {title}
                    </h1>
                    <span className="text-[10px] md:text-xs text-gray-500 font-medium whitespace-nowrap hidden sm:block truncate w-full">
                        {date}
                    </span>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2 md:gap-3 text-right w-full min-w-0 pl-2 md:pl-4">
                    <div className="hidden sm:block min-w-0">
                        <p className="text-sm font-semibold text-gray-900 leading-none truncate">
                            {doctorName}
                        </p>
                        {doctorSpecialization && (
                            <p className="text-xs text-gray-500 mt-1 truncate">
                                {doctorSpecialization}
                            </p>
                        )}
                    </div>
                    <Avatar className="h-10 w-10 border border-gray-200 bg-gray-100 flex items-center justify-center shrink-0">
                        <AvatarImage src="/images/doctor-avatar.png" />
                        <AvatarFallback className="bg-gray-400 text-white pattern-dots h-full w-full opacity-60"></AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
