"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

export default function Hero() {
    return (
        <motion.div
            className="w-full max-w-5xl px-4 md:px-6 py-16 md:py-20 flex flex-col items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-4xl md:text-6xl font-bold font-headline mb-10 text-foreground"
                variants={itemVariants}
            >
                Find Your Doctor, Book with Ease
            </motion.h2>
            <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
                variants={itemVariants}
            >
                Connect with top specialists near you, check their availability,
                and book appointments instantly. Your health is our priority.
            </motion.p>
            <motion.div variants={itemVariants}>
                <Button
                    size="lg"
                    className="h-12 px-8 text-lg font-semibold bg-[#1F7A53] hover:bg-[#186142] text-white cursor-pointer"
                >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </motion.div>
        </motion.div>
    );
}
