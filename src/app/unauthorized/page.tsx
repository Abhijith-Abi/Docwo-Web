"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { ShieldAlert, LogOut, Home } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function UnauthorizedPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { clearAuth } = useAuthStore();

    const handleLogout = () => {
        clearAuth();
        queryClient.clear();
        if (typeof window !== "undefined") {
            window.localStorage.clear();
            window.sessionStorage.clear();
        }
        router.push("/auth/login");
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA] relative overflow-hidden">
            <main className="flex-1 flex flex-col items-center justify-center px-4 relative">
                {/* Modern Background Lines */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <svg
                        className="absolute w-full h-full opacity-[0.05]"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <motion.path
                            d="M0,20 Q50,50 100,20 T200,20"
                            stroke="#1F7A53"
                            strokeWidth="0.1"
                            fill="none"
                            animate={{
                                d: [
                                    "M0,20 Q50,50 100,20 T200,20",
                                    "M0,30 Q50,10 100,30 T200,30",
                                    "M0,20 Q50,50 100,20 T200,20",
                                ],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.path
                            d="M100,80 Q50,50 0,80 T-100,80"
                            stroke="#1F7A53"
                            strokeWidth="0.1"
                            fill="none"
                            animate={{
                                d: [
                                    "M100,80 Q50,50 0,80 T-100,80",
                                    "M100,70 Q50,90 0,70 T-100,70",
                                    "M100,80 Q50,50 0,80 T-100,80",
                                ],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </svg>
                </div>

                {/* Central Content Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full max-w-lg bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center text-center"
                >
                    {/* Visual Warning */}
                    <motion.div
                        initial={{ rotate: -10, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 100,
                        }}
                        className="mb-8"
                    >
                        <div className="w-24 h-24 rounded-3xl bg-red-50 flex items-center justify-center ring-1 ring-red-100 shadow-sm relative">
                            <ShieldAlert className="w-12 h-12 text-red-500" />
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.1, 0.3],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -inset-4 bg-red-100/50 rounded-full blur-2xl -z-10"
                            />
                        </div>
                    </motion.div>

                    {/* Text Header */}
                    <div className="space-y-4 mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">
                            Access Restricted
                        </h1>
                        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-sm">
                            You don't have permission to access the requested
                            page. Please switch to an authorized account.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col w-full gap-4">
                        <Button
                            size="lg"
                            className="h-14 rounded-2xl bg-[#1F7A53] hover:bg-[#186142] text-white font-bold text-lg shadow-xl shadow-[#1F7A53]/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 w-5 h-5" />
                            Logout & Switch Account
                        </Button>
                    </div>
                </motion.div>
            </main>

            {/* Website Footer */}
            <Footer />
        </div>
    );
}
