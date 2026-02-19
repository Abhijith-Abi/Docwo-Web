"use client";

import {
    ArrowRight,
    Stethoscope,
    CalendarCheck,
    HeartPulse,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const steps = [
    {
        icon: Stethoscope,
        title: "1. Search for a Doctor",
        description:
            "Filter by specialty, location, and insurance to find the perfect match for your needs.",
    },
    {
        icon: CalendarCheck,
        title: "2. Book an Appointment",
        description:
            "Select a convenient time slot and book your visit in just a few clicks.",
    },
    {
        icon: HeartPulse,
        title: "3. Get Well Soon",
        description:
            "Receive quality care from experienced professionals and get on the road to recovery.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Stagger effect
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

export default function HealthJourney() {
    return (
        <section className="w-full max-w-7xl px-4 md:px-8 lg:px-12 pb-24">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-center mb-16 font-headline"
            >
                Your Health Journey in 3 Simple Steps
            </motion.h2>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        className="h-full"
                    >
                        <Card className="border border-gray-100 bg-white shadow-sm hover:shadow-md h-full flex flex-col text-center p-4 rounded-2xl transition-shadow duration-300">
                            <CardHeader className="flex flex-col items-center">
                                <step.icon
                                    className="h-10 w-10 text-[#1F7A53] mb-2"
                                    strokeWidth={2}
                                />
                                <CardTitle className="text-lg font-bold text-center text-gray-900 ">
                                    {step.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <CardDescription className="text-center text-sm text-gray-500 leading-relaxed px-2">
                                    {step.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
