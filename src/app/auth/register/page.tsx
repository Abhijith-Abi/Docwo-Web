"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import Header from "@/components/Header";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (token) {
            router.replace("/dashboard");
        }
    }, [token, router]);

    if (token) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-50 bg-white shadow-sm">
                <Header />
            </div>
            <div
                className="flex flex-col flex-1 bg-background relative overflow-hidden "
                style={{
                    backgroundImage: "url('/images/background.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <main className="flex flex-col items-center justify-center flex-1 w-full px-4 relative z-10 py-2 sm:py-4 lg:py-8">
                    <RegisterForm />
                </main>
            </div>
        </div>
    );
}
