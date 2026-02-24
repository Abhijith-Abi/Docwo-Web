"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
            <div className="animate-fadeInUp space-y-8">
                {/* Visual Element */}
                <div className="relative flex justify-center">
                    <div className="absolute -top-12 h-32 w-32 animate-pulse rounded-full bg-primary/10 blur-3xl" />
                    <h1 className="relative text-9xl font-bold tracking-tighter text-primary/20 md:text-[12rem]">
                        404
                    </h1>
                    <div className="absolute inset-x-0 bottom-4 flex items-center justify-center">
                        <div className="rounded-full bg-background px-6 py-2 shadow-warm-lg ring-1 ring-border">
                            <Search className="mr-2 inline-block h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">
                                Page not found
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-foreground">
                        Oops! You've gone off-track.
                    </h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                        The page you're looking for doesn't exist or has been
                        moved. Let's get you back to Docwo.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        asChild
                        size="lg"
                        className="h-12 px-8 font-semibold shadow-warm-lg transition-warm hover:scale-105"
                    >
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        className="h-12 px-8 font-semibold transition-warm hover:bg-muted"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                </div>

                {/* Decorative dots grid */}
                <div className="absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-50 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[40px_40px]" />
            </div>
        </div>
    );
}
