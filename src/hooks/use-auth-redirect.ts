"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export const useAuthRedirect = () => {
    const router = useRouter();
    const { user, token } = useAuthStore();
    const hasHydrated = useAuthStore((state) => state._hasHydrated);

    const isAdmin =
        (user?.roles?.includes("admin") ||
            user?.roles?.includes("clinic_staff")) ??
        false;
    const isStaff = user?.roles?.includes("staff") ?? false;
    const isDoctor = user?.roles?.includes("doctor") ?? false;

    useEffect(() => {
        if (hasHydrated && token) {
            const path = isAdmin
                ? "/admin-portal"
                : isStaff
                  ? "/staff-portal"
                  : isDoctor
                    ? "/doctor-portal"
                    : "/unauthorized";
            router.replace(path);
        }
    }, [token, isAdmin, isStaff, isDoctor, router, hasHydrated]);

    return { isAdmin, isStaff, isDoctor, user, token, hasHydrated };
};
