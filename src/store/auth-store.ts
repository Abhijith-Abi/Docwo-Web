import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ClinicAssignment {
    assignment_id: string;
    clinic_id: string;
    clinic_name: string;
    is_admin: boolean;
    role: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface User {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    roles: string[];
    clinic_assignments: ClinicAssignment[];
    patient_id?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    user: User | null;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
    setAuth: (token: string, refreshToken: string, user: User) => void;
    setUser: (user: User) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            refreshToken: null,
            user: null,
            _hasHydrated: false,

            setHasHydrated: (state) => set({ _hasHydrated: state }),

            setAuth: (token, refreshToken, user) =>
                set({ token, refreshToken, user }),

            setUser: (user) => set({ user }),

            clearAuth: () =>
                set({ token: null, refreshToken: null, user: null }),
        }),
        {
            name: "auth-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
