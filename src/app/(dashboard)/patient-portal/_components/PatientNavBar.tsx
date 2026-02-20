"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/patient-portal" },
    { name: "Clinic", href: "/patient-portal/clinic" },
    { name: "Departments", href: "/patient-portal/departments" },
    { name: "My Bookings", href: "/patient-portal/my-bookings" },
    { name: "About", href: "/patient-portal/about" },
    { name: "Contact", href: "/patient-portal/contact" },
];

export default function PatientNavBar() {
    const pathname = usePathname();

    return (
        <nav className="w-full bg-white overflow-x-auto">
            <div className="flex items-center px-4 sm:px-6 lg:px-8 py-4 min-w-max">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-bold px-2 py-1 transition-colors duration-200",
                                isActive
                                    ? "bg-green-700 text-white rounded-sm"
                                    : "text-gray-700 hover:text-green-700",
                            )}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
