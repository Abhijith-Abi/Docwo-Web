"use client";

import Link from "next/link";

export function BrowseOptions() {
    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link href="/patient-portal/clinics" className="flex-1">
                    <div className="w-full py-4 px-6 border border-[#2E7D32] rounded-md text-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                        <span className="text-base font-bold text-black">
                            Browse by Clinic
                        </span>
                    </div>
                </Link>
                <Link href="/patient-portal/doctors" className="flex-1">
                    <div className="w-full py-4 px-6 border border-[#2E7D32] rounded-md text-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                        <span className="text-base font-bold text-black">
                            Browse by Doctor
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
