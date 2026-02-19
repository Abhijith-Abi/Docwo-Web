"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function Page() {
    const router = useRouter();
    const { user, clearAuth } = useAuthStore();

    const isAdmin = user?.roles?.includes("admin") ?? false;
    const isStaff = user?.roles?.includes("staff") ?? false;

    useEffect(() => {
        if (isAdmin) {
            router.replace("/dashboard/admin-portal");
        } else if (isStaff) {
            router.replace("/dashboard/staff-portal");
        }
    }, [isAdmin, isStaff, router]);

    const handleLogout = () => {
        clearAuth();
        router.push("/auth/login");
    };

    // Show nothing while redirecting to a role-specific portal
    if (isAdmin || isStaff) return null;

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
