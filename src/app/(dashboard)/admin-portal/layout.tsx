import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/admin-portal/AdminSidebar";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

export default function AdminPortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row h-screen w-full bg-[#0F5B46] overflow-hidden">
            <AdminSidebar className="hidden md:flex" />

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
                        <AdminSidebar className="w-[300px]" />
                    </SheetContent>
                </Sheet>
            </div>

            <main className="flex-1 bg-[#F8F9FA] md:rounded-[2.5rem] md:my-4 md:mr-4 overflow-hidden relative shadow-md flex flex-col z-20 rounded-t-[2.5rem]">
                <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}
