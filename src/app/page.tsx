"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HealthJourney from "@/components/HealthJourney";
import { Loader } from "@/components/Loader";

export default function Home() {
    const router = useRouter();
    const { user, token } = useAuthStore();
    const hasHydrated = useAuthStore((state) => state._hasHydrated);

    const isAdmin =
        (user?.roles?.includes("admin") ||
            user?.roles?.includes("clinic_staff")) ??
        false;
    const isStaff = user?.roles?.includes("staff") ?? false;
    const isPatient = user?.roles?.includes("patient") ?? false;
    const isDoctor = user?.roles?.includes("doctor") ?? false;

    useEffect(() => {
        if (hasHydrated && token) {
            const path = isAdmin
                ? "/admin-portal"
                : isStaff
                  ? "/staff-portal"
                  : isDoctor
                    ? "/doctor-portal"
                    : "/patient-portal";
            router.replace(path);
        }
    }, [token, isAdmin, isStaff, isPatient, isDoctor, router, hasHydrated]);

    if (!hasHydrated || token) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <div className="sticky top-0 z-50 bg-white shadow-sm">
                <Header />
            </div>
            <main className="grow flex flex-col items-center">
                <Hero />
                <HealthJourney />
            </main>
            <Footer />
        </div>
    );
}
