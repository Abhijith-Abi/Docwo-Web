"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
    href: string;
    icon: string;
    label: string;
}

export default function SidebarItem({ href, icon, label }: SidebarItemProps) {
    const pathname = usePathname();
    const isDashboard = href === "/admin-portal";
    const isActiveLink = isDashboard
        ? pathname === href
        : pathname.startsWith(href);

    return (
        <li className="relative">
            <Link
                href={href}
                className={cn(
                    "flex items-center gap-4 py-3.5 px-6 ml-4 transition-colors font-medium text-[15px]",
                    isActiveLink
                        ? "bg-[#F8F9FA] text-[#0F5B46] rounded-l-full z-10 relative font-semibold"
                        : "text-white hover:bg-white/10 rounded-l-full",
                )}
            >
                <div className="w-6 flex justify-center items-center">
                    <div
                        className={cn("w-[22px] h-[22px] bg-current")}
                        style={{
                            maskImage: `url('${icon}')`,
                            maskSize: "contain",
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskImage: `url('${icon}')`,
                            WebkitMaskSize: "contain",
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskPosition: "center",
                        }}
                    />
                </div>
                <span className="whitespace-pre-line tracking-wide leading-tight">
                    {label}
                </span>
            </Link>
            {/* Seamless corner fill magic for the active link -> connecting to the white background */}
            {isActiveLink && (
                <div className="absolute top-0 right-0 h-full w-4 bg-[#F8F9FA] z-0 pointer-events-none translate-x-2" />
            )}
        </li>
    );
}
