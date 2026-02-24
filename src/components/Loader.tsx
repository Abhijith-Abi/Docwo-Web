"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Loader() {
    return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white overflow-hidden h-screen w-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative flex flex-col items-center justify-center gap-8"
            >
                <div className="relative flex items-center justify-center">
                    {/* Outer glow ring */}
                    <div className="absolute inset-[-20px] rounded-full bg-emerald-500/5 blur-2xl animate-pulse" />

                    <div className="relative flex items-center justify-center h-40 w-40">
                        {/* Static track */}
                        <div className="absolute inset-0 rounded-full border-[1.5px] border-emerald-500/5" />

                        {/* Animated gradient ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute inset-0 rounded-full border-[1.5px] border-transparent border-t-emerald-600 border-r-emerald-600/30"
                        />

                        {/* Logo Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative flex items-center justify-center bg-white rounded-4xl p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] ring-1 ring-black/2"
                        >
                            <Image
                                src="/images/docwo-logo2.svg"
                                alt="Docwo"
                                width={56}
                                height={56}
                                className="w-14 h-14 object-contain"
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-3xl font-extrabold tracking-[0.2em] text-emerald-950"
                        >
                            DOCWO
                        </motion.h2>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent mt-1"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <p className="text-[11px] font-bold text-emerald-900/40 uppercase tracking-[0.4em] text-center">
                            Refining your care
                        </p>
                        <div className="flex items-center gap-1.5">
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut",
                                    }}
                                    className="h-1.5 w-1.5 rounded-full bg-emerald-600/60"
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
