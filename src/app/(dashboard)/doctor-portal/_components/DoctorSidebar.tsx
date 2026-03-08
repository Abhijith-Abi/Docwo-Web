"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useQueryClient } from "@tanstack/react-query";

const mainNavItems = [
    {
        name: "Dashboard",
        href: "/doctor-portal",
        icon: "/images/dashboard.svg",
    },
    {
        name: "Patients",
        href: "/doctor-portal/patients",
        icon: "/images/patients.svg",
    },
    {
        name: "Appointment",
        href: "/doctor-portal/appointments",
        icon: "/images/appointment.svg",
    },
    {
        name: "Schedule Control",
        href: "/doctor-portal/schedule",
        icon: "/images/settings.svg",
    },
    {
        name: "Live Sessions",
        href: "/doctor-portal/sessions",
        icon: "/images/settings.svg",
    }, // fallback icon until we have a video one
];

const bottomNavItems = [
    {
        name: "Profile",
        href: "/doctor-portal/profile",
        icon: "/images/profile.svg",
    },
    {
        name: "Settings",
        href: "/doctor-portal/settings",
        icon: "/images/settings.svg",
    },
];

export default function DoctorSidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const { clearAuth } = useAuthStore();
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        clearAuth();
        queryClient.clear();
        if (typeof window !== "undefined") {
            window.localStorage.clear();
            window.sessionStorage.clear();
        }
        router.push("/auth/login");
    };

    return (
        <aside
            className={cn(
                "w-[300px] bg-[#0F5B46] h-full flex flex-col py-6 md:py-8 shrink-0 relative overflow-hidden",
                className,
            )}
        >
            {/* Logo area */}
            <div className="pl-10 mb-12 flex items-center gap-3">
                <Image
                    src="/images/docwo-logo2.svg"
                    alt="Docwo"
                    width={44}
                    height={44}
                    className="w-11 h-11 bg-white rounded-xl p-1.5 object-contain"
                />
                <div>
                    <h1 className="text-white font-bold text-[22px] tracking-wide uppercase leading-tight">
                        DOCWO
                    </h1>
                    <p className="text-white/80 text-[11px] tracking-widest uppercase mt-0.5">
                        Doctor portal
                    </p>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto w-full no-scrollbar min-h-0">
                <ul className="flex flex-col gap-2 w-full">
                    {mainNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name} className="relative">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-4 py-3.5 px-6 ml-4 transition-colors font-medium text-[15px]",
                                        isActive
                                            ? "bg-[#F8F9FA] text-[#0F5B46] rounded-l-full z-10 relative font-semibold"
                                            : "text-white hover:bg-white/10 rounded-l-full",
                                    )}
                                >
                                    <div className="w-6 flex justify-center items-center">
                                        <div
                                            className="w-[22px] h-[22px] bg-current"
                                            style={{
                                                maskImage: `url('${item.icon}')`,
                                                maskSize: "contain",
                                                maskRepeat: "no-repeat",
                                                maskPosition: "center",
                                                WebkitMaskImage: `url('${item.icon}')`,
                                                WebkitMaskSize: "contain",
                                                WebkitMaskRepeat: "no-repeat",
                                                WebkitMaskPosition: "center",
                                            }}
                                        />
                                    </div>
                                    <span className="whitespace-pre-line tracking-wide leading-tight">
                                        {item.name}
                                    </span>
                                </Link>
                                {/* Seamless corner fill magic for the active link -> connecting to the white background */}
                                {isActive && (
                                    <div className="absolute top-0 right-0 h-full w-4 bg-[#F8F9FA] z-0 pointer-events-none translate-x-2" />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto pt-6 border-t border-white/10 mx-6 w-[calc(100%-3rem)]">
                <ul className="flex flex-col gap-2 w-full -ml-2">
                    {bottomNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name} className="relative">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-4 py-3.5 px-6 ml-4 transition-colors font-medium text-[15px]",
                                        isActive
                                            ? "bg-[#F8F9FA] text-[#0F5B46] rounded-l-full z-10 relative font-semibold"
                                            : "text-white hover:bg-white/10 rounded-l-full",
                                    )}
                                >
                                    <div className="w-6 flex justify-center items-center">
                                        <div
                                            className="w-[22px] h-[22px] bg-current"
                                            style={{
                                                maskImage: `url('${item.icon}')`,
                                                maskSize: "contain",
                                                maskRepeat: "no-repeat",
                                                maskPosition: "center",
                                                WebkitMaskImage: `url('${item.icon}')`,
                                                WebkitMaskSize: "contain",
                                                WebkitMaskRepeat: "no-repeat",
                                                WebkitMaskPosition: "center",
                                            }}
                                        />
                                    </div>
                                    <span className="whitespace-pre-line tracking-wide leading-tight">
                                        {item.name}
                                    </span>
                                </Link>
                                {/* Seamless corner fill magic for the active link -> connecting to the white background */}
                                {isActive && (
                                    <div className="absolute top-0 right-0 h-full w-4 bg-[#F8F9FA] z-0 pointer-events-none translate-x-2" />
                                )}
                            </li>
                        );
                    })}
                    <li className="relative">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-4 py-3.5 px-6 ml-4 text-white hover:bg-white/10 rounded-l-full transition-colors font-medium text-[15px] text-left"
                        >
                            <div className="w-6 flex justify-center items-center">
                                <div
                                    className="w-[22px] h-[22px] bg-current"
                                    style={{
                                        maskImage: `url('/images/sign-out.svg')`,
                                        maskSize: "contain",
                                        maskRepeat: "no-repeat",
                                        maskPosition: "center",
                                        WebkitMaskImage: `url('/images/sign-out.svg')`,
                                        WebkitMaskSize: "contain",
                                        WebkitMaskRepeat: "no-repeat",
                                        WebkitMaskPosition: "center",
                                    }}
                                />
                            </div>
                            <span className="whitespace-pre-line tracking-wide leading-tight">
                                Logout
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
