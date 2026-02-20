"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HealthJourney from "@/components/HealthJourney";

export default function Home() {
    const router = useRouter();
    const { user, token } = useAuthStore();

    const isAdmin = user?.roles?.includes("admin") ?? false;
    const isStaff = user?.roles?.includes("staff") ?? false;
    const isPatient = user?.roles?.includes("patient") ?? false;

    useEffect(() => {
        if (token) {
            if (isAdmin) {
                router.replace("/admin-portal");
            } else if (isStaff) {
                router.replace("/staff-portal");
            } else if (isPatient) {
                router.replace("/patient-portal");
            } else {
                router.replace("/patient-portal");
            }
        }
    }, [token, isAdmin, isStaff, isPatient, router]);

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
