"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/dashboard/patient-portal" },
    { name: "Clinic", href: "/dashboard/patient-portal/clinic" },
    { name: "Departments", href: "/dashboard/patient-portal/departments" },
    { name: "My Bookings", href: "/dashboard/patient-portal/my-bookings" },
    { name: "About", href: "/dashboard/patient-portal/about" },
    { name: "Contact", href: "/dashboard/patient-portal/contact" },
];

export default function PatientNavBar() {
    const pathname = usePathname();

    return (
        <nav className="w-full bg-white overflow-x-auto">
            <div className="flex items-center px-4 md:px-8 py-0 min-w-max">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-bold px-2 py-1 transition-colors duration-200",
                                item.name === "Home"
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
