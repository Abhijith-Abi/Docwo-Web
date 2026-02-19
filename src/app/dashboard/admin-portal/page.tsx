"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export default function AdminPortalPage() {
    const router = useRouter();
    const { user, clearAuth } = useAuthStore();

    const handleLogout = () => {
        clearAuth();
        router.push("/auth/login");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1>AdminPortalPage</h1>
            <Button variant="secondary" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}
