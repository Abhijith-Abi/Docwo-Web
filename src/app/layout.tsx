import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { ModalProvider } from "@/context/modal-store";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://docwo-web-rose.vercel.app"),
    title: "Docwo | Empowering Healthcare Connectivity",
    description:
        "Docwo connects patients with top doctors. Book appointments easily, track tokens in real-time, and manage your health journey with our modern medical platform.",
    openGraph: {
        title: "Docwo | Modern Appointment Booking",
        description:
            "Find top doctors and book appointments seamlessly. Real-time token tracking and professional healthcare management.",
        url: "https://docwo-web-rose.vercel.app/",
        siteName: "Docwo",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Docwo - Modern Healthcare Platform",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Docwo | Healthcare Made Simple",
        description:
            "Instantly book doctors and track your health journey. Modern, fast, and patient-centric.",
        images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} antialiased`}
                suppressHydrationWarning
            >
                <QueryProvider>
                    <ModalProvider>
                        {children}
                        <Toaster />
                    </ModalProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
