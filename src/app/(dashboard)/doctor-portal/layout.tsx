"use client";

import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import DoctorHeader from "@/app/(dashboard)/doctor-portal/_components/DoctorHeader";
import DoctorSidebar from "@/app/(dashboard)/doctor-portal/_components/DoctorSidebar";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

export default function DoctorPortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex flex-col md:flex-row h-screen w-full bg-[#0F5B46] font-sans overflow-hidden">
                <DoctorSidebar className="hidden md:flex" />

                <div className="md:hidden flex items-center justify-between p-4 bg-[#0F5B46]">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/images/docwo-logo2.svg"
                            alt="Docwo"
                            width={36}
                            height={36}
                            className="w-9 h-9 bg-white rounded-xl p-1.5 object-contain"
                        />
                        <div>
                            <h1 className="text-white font-bold text-[18px] tracking-wide uppercase leading-tight">
                                DOCWO
                            </h1>
                        </div>
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="p-2 -mr-2 text-white">
                                <Menu size={28} />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="p-0 border-none bg-transparent w-auto sm:max-w-none [&>button]:text-white"
                        >
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                            <SheetDescription className="sr-only">
                                Navigation menu
                            </SheetDescription>
                            <DoctorSidebar className="w-[300px]" />
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex-1 flex flex-col bg-[#F8F9FA] md:rounded-[2.5rem] md:my-4 md:mr-4 overflow-hidden relative shadow-md z-20 rounded-t-[2.5rem]">
                    <DoctorHeader />
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        <main className="w-full max-w-[1400px] mx-auto p-2 md:p-4 lg:p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
