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
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (token) {
            router.replace("/dashboard");
        }
    }, [token, router]);

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Header />
            <main className="grow flex flex-col items-center">
                <Hero />
                <HealthJourney />
            </main>
            <Footer />
        </div>
    );
}
