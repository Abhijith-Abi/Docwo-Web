"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth-store";

const KERALA_DISTRICTS = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
];

export default function PatientHeader() {
    const [selectedLocation, setSelectedLocation] = useState("Ernakulam");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const { user, clearAuth } = useAuthStore();

    const filteredDistricts = KERALA_DISTRICTS.filter((district) =>
        district.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white md:px-8 h-16">
            <div className="flex items-center">
                <Link href="/dashboard/patient-portal">
                    <div className="flex items-center">
                        <div className="relative w-10 h-10 md:w-12 md:h-12">
                            <Image
                                src="/images/logo.svg"
                                alt="DOCWO Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-sm font-bold text-green-700 tracking-wide hidden sm:block">
                            DOCWO
                        </span>
                    </div>
                </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Search Department, Clinics, Doctors"
                        className="pl-10 h-10 w-full bg-white border-gray-300 rounded-lg focus-visible:ring-1 focus-visible:ring-green-600 focus-visible:border-green-600 shadow-sm text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
                <DropdownMenu onOpenChange={setIsLocationOpen}>
                    <DropdownMenuTrigger asChild>
                        <div className="hidden lg:flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded-md transition-colors outline-none">
                            <span className="text-sm font-semibold text-gray-800 mr-1">
                                {selectedLocation}
                            </span>
                            <ChevronDown
                                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""}`}
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-2" align="end">
                        <div className="relative mb-2">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-8 pl-8 text-xs"
                            />
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {filteredDistricts.length === 0 ? (
                                <div className="text-xs text-center py-2 text-muted-foreground">
                                    No location found
                                </div>
                            ) : (
                                filteredDistricts.map((district) => (
                                    <DropdownMenuItem
                                        key={district}
                                        onSelect={() => {
                                            setSelectedLocation(district);
                                            setSearchQuery("");
                                        }}
                                        className="text-sm cursor-pointer"
                                    >
                                        <MapPin className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                        <span>{district}</span>
                                        {selectedLocation === district && (
                                            <span className="ml-auto flex h-2 w-2 rounded-full bg-green-600" />
                                        )}
                                    </DropdownMenuItem>
                                ))
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu onOpenChange={setIsUserOpen}>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors outline-none">
                            <Avatar className="w-9 h-9 border border-gray-200">
                                <AvatarImage
                                    src="/images/avatar-placeholder.png"
                                    alt="User"
                                />
                                <AvatarFallback className="bg-gray-100 text-gray-600 font-medium text-sm">
                                    JO
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden sm:flex items-center gap-1">
                                <span className="text-sm font-semibold text-gray-800">
                                    {user?.name || "Joshy"}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-600  transition-transform duration-200 ${isUserOpen ? "rotate-180" : ""}`}
                                />
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32" align="end">
                        <DropdownMenuItem className="cursor-pointer justify-center font-medium">
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer justify-center font-medium text-red-600 focus:text-red-700 focus:bg-red-50"
                            onClick={() => clearAuth()}
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
