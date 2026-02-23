"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Loader() {
    return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative flex flex-col items-center gap-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: [0.8, 1.1, 1],
                        opacity: 1,
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative"
                >
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="h-24 w-24 rounded-full border-4 border-transparent border-t-emerald-600"
                        />
                        <div className="absolute flex items-center justify-center bg-white rounded-2xl p-2 shadow-lg ring-1 ring-black/5">
                            <Image
                                src="/images/docwo-logo2.svg"
                                alt="Docwo"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col items-center gap-1">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold tracking-tight text-emerald-900"
                    >
                        DOCWO
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xs font-medium text-emerald-600/60 uppercase tracking-[0.2em]"
                    >
                        Loading your experience
                    </motion.p>
                </div>
            </div>
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="relative mb-6"
            >
                <div className="h-16 w-16 rounded-full border-4 border-emerald-500/10" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-emerald-500"
                />
            </motion.div>
            <p className="text-sm font-medium text-slate-500 animate-pulse">
                Fetching data...
            </p>
        </div>
    );
}
