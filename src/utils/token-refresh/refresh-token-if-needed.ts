import { useAuthStore } from "@/store/auth-store";
import { generateNewAccessToken } from "./generate-new-access-token";

let refreshPromise: Promise<void> | null = null;

export async function refreshTokenIfNeeded(
    accessToken: string,
    refreshToken: string,
    forceRefresh: boolean = false
) {
    if (!forceRefresh && (!accessToken || !isTokenExpired(accessToken))) return;

    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const generateNewAccessTokenResponse = await generateNewAccessToken(
                refreshToken
            );

            if (!generateNewAccessTokenResponse?.access && !generateNewAccessTokenResponse?.accessToken) {
                throw new Error("Failed to refresh access token");
            }

            // Update the store with the new access token
            const { user } = useAuthStore.getState();
            useAuthStore.getState().setAuth(
                generateNewAccessTokenResponse.accessToken || generateNewAccessTokenResponse.access,
                generateNewAccessTokenResponse.refreshToken || generateNewAccessTokenResponse.refresh || refreshToken,
                user!
            );
        } catch (error) {
            useAuthStore.getState().clearAuth();
            if (typeof window !== "undefined") {
                window.location.href = "/auth/login";
            }
            throw error;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

function isTokenExpired(token: string) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Date.now() / 1000;
        return payload.exp < now;
    } catch {
        return true;
    }
}
