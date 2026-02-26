"use client";

import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const navItems = [
    {
        href: "/admin-portal",
        icon: "/images/dashboard.svg",
        label: "Dashboard",
    },
    {
        href: "/admin-portal/patients",
        icon: "/images/patients.svg",
        label: "Patients",
    },
    {
        href: "/admin-portal/appointments",
        icon: "/images/appointment.svg",
        label: "Appointment\nAnalytics",
    },
    {
        href: "/admin-portal/management",
        icon: "/images/doctor_and_staff.svg",
        label: "Doctor & Staff\nManagement",
    },
    {
        href: "/admin-portal/billing",
        icon: "/images/currency-revenue.svg",
        label: "Billings & Payments",
    },
];

const bottomItems = [
    {
        href: "/admin-portal/profile",
        icon: "/images/profile.svg",
        label: "Profile",
    },
    {
        href: "/admin-portal/settings",
        icon: "/images/settings.svg",
        label: "Settings",
    },
];

export default function AdminSidebar({ className }: { className?: string }) {
    const { clearAuth } = useAuthStore();
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        clearAuth();
        queryClient.clear();
        router.push("/auth/login");
    };

    return (
        <aside
            className={`w-[300px] bg-[#0F5B46] h-screen flex flex-col py-8 shrink-0 relative overflow-hidden ${className || ""}`}
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
                        Admin portal
                    </p>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto w-full no-scrollbar">
                <ul className="flex flex-col gap-2 w-full">
                    {navItems.map((item) => (
                        <SidebarItem key={item.href} {...item} />
                    ))}
                </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto pt-6 border-t border-white/10 mx-6 w-[calc(100%-3rem)]">
                <ul className="flex flex-col gap-2 w-full -ml-2">
                    {bottomItems.map((item) => (
                        <SidebarItem key={item.href} {...item} />
                    ))}
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
