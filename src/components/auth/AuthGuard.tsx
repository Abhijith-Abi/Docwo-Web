"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useGetProfile } from "@/hooks/api/useGetProfile";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const hasHydrated = useAuthStore((state) => state._hasHydrated);

    // Fetch and persist full user profile whenever the token is available
    useGetProfile();

    useEffect(() => {
        if (hasHydrated && !token) {
            router.replace("/auth/login");
        }
    }, [token, router, hasHydrated]);

    if (!hasHydrated) return null; // Wait for zustand to hydrate from localStorage
    if (!token) return null;

    return <>{children}</>;
}
