"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (!token) {
            router.replace("/auth/login");
        }
    }, [token, router]);

    if (!token) return null;

    return <>{children}</>;
}
