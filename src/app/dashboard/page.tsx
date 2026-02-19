"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function Page() {
    const router = useRouter();
    const { user, clearAuth } = useAuthStore();

    const isAdmin = user?.roles?.includes("admin") ?? false;
    const isStaff = user?.roles?.includes("staff") ?? false;
    const isPatient = user?.roles?.includes("patient") ?? false;

    useEffect(() => {
        if (isAdmin) {
            router.replace("/dashboard/admin-portal");
        } else if (isStaff) {
            router.replace("/dashboard/staff-portal");
        } else if (isPatient) {
            router.replace("/dashboard/patient-portal");
        }
    }, [isAdmin, isStaff, isPatient, router]);

    const handleLogout = () => {
        clearAuth();
        router.push("/auth/login");
    };

    if (isAdmin || isStaff || isPatient) return null;

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
