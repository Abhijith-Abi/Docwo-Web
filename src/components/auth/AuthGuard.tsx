"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useGetProfile } from "@/hooks/api/useGetProfile";
import PolicyConsentModal from "./PolicyConsentModal";

interface MissingPolicy {
    policy_id: string;
    policy_type: string;
    version: string;
    title: string;
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const hasHydrated = useAuthStore((state) => state._hasHydrated);
    const [missingPolicies, setMissingPolicies] = useState<
        MissingPolicy[] | null
    >(null);

    const { error, refetch } = useGetProfile();

    useEffect(() => {
        if (hasHydrated && !token) {
            router.replace("/auth/login");
        }
    }, [token, router, hasHydrated]);

    useEffect(() => {
        if (error) {
            const err = error as any;
            if (
                err?.status === 403 &&
                err?.data?.code === "LEGAL_11006" &&
                err?.data?.data?.missing_policies
            ) {
                setMissingPolicies(err.data.data.missing_policies);
            }
        }
    }, [error]);

    const handleAllConsented = () => {
        setMissingPolicies(null);
        refetch();
    };

    if (!hasHydrated) return null;
    if (!token) return null;

    if (missingPolicies && missingPolicies.length > 0) {
        return (
            <PolicyConsentModal
                missingPolicies={missingPolicies}
                onAllConsented={handleAllConsented}
            />
        );
    }

    return <>{children}</>;
}
