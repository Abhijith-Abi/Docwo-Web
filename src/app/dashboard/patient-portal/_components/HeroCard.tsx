"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HeroCardProps {
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    imageAlt: string;
    className?: string;
    onButtonClick?: () => void;
}

export function HeroCard({
    title,
    description,
    buttonText,
    imageSrc,
    imageAlt,
    className,
    onButtonClick,
}: HeroCardProps) {
    return (
        <Card
            className={cn(
                "relative overflow-hidden border border-gray-100 bg-white flex flex-row items-center justify-between px-8 py-10 rounded-3xl shadow-sm h-full group",
                className,
            )}
        >
            {/* Background Blob */}
            <div className="absolute top-0 right-[-10%] w-[65%] h-full bg-gray-50 rounded-full scale-110 z-0 opacity-80 transition-transform group-hover:scale-115 duration-500" />

            {/* Text content */}
            <div className="relative z-10 flex flex-col gap-4 flex-1">
                <h2 className="text-3xl font-extrabold text-[#0D4724] leading-[1.15] tracking-tight max-w-[280px]">
                    {title}
                </h2>
                <p className="text-[#374151] text-lg leading-snug font-medium max-w-[320px] opacity-90">
                    {description}
                </p>
                <div className="pt-2">
                    <Button
                        onClick={onButtonClick}
                        className="bg-[#14532D] hover:bg-[#0f4022] text-white rounded-xl px-7 py-3 h-auto text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-md shadow-black/10"
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>

            {/* Image Container */}
            <div className="relative z-10 flex-shrink-0 w-[180px] h-[220px] ml-4">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-contain object-bottom"
                    priority
                />
            </div>
        </Card>
    );
}
