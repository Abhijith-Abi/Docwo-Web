"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { HeroCard } from "./HeroCard";
import Autoplay from "embla-carousel-autoplay";

interface HeroData {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    imageAlt: string;
}

const MOCK_DATA: HeroData[] = [
    {
        id: "1",
        title: "Consult Top Doctors Anytime",
        description:
            "Book virtual appointments with specialists. 24/7 access to general physicians.",
        buttonText: "Book Now",
        imageSrc: "/images/test.png",
        imageAlt: "Consulting a doctor",
    },
    {
        id: "2",
        title: "Save More with Health Plans",
        description:
            "Get affordable, personalized care options right from your phone..",
        buttonText: "Get Started",
        imageSrc: "/images/test.png",
        imageAlt: "Health plan illustration",
    },
    {
        id: "3",
        title: "Save More with Health Plans",
        description:
            "Get affordable, personalized care options right from your phone..",
        buttonText: "Get Started",
        imageSrc: "/images/test.png",
        imageAlt: "Health plan illustration",
    },
];

export function PatientHeroCarousel() {
    const [data, setData] = React.useState<HeroData[]>(MOCK_DATA);

    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-visible">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
                className="w-full relative group overflow-visible"
            >
                <CarouselContent className="-ml-6">
                    {data.map((item) => (
                        <CarouselItem
                            key={item.id}
                            className="pl-6 basis-full lg:basis-1/2"
                        >
                            <HeroCard
                                title={item.title}
                                description={item.description}
                                buttonText={item.buttonText}
                                imageSrc={item.imageSrc}
                                imageAlt={item.imageAlt}
                                className="border-[#E5E7EB] hover:border-[#14532D]/10 transition-all duration-300 shadow-sm"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden lg:block">
                    <CarouselPrevious className="absolute -left-5 top-1/2 -translate-y-1/2 h-14 w-14 bg-gray-200/80 hover:bg-gray-300 border-none text-gray-600 rounded-full cursor-pointer shadow-none transition-all duration-200" />
                    <CarouselNext className="absolute -right-5 top-1/2 -translate-y-1/2 h-14 w-14 bg-gray-200/80 hover:bg-gray-300 border-none text-gray-600 rounded-full cursor-pointer shadow-none transition-all duration-200" />
                </div>
            </Carousel>
        </div>
    );
}
