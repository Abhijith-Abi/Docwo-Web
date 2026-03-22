"use client";

import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HealthJourney from "@/components/HealthJourney";
import { Loader } from "@/components/Loader";

export default function Home() {
    const { token, hasHydrated } = useAuthRedirect();

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
