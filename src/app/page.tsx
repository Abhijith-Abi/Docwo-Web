import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HealthJourney from "@/components/HealthJourney";

export default function Home() {
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
