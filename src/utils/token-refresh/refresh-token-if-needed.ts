import { useAuthStore } from "@/store/auth-store";
import { generateNewAccessToken } from "./generate-new-access-token";

let refreshPromise: Promise<void> | null = null;

export async function refreshTokenIfNeeded(
    accessToken: string,
    refreshToken: string
) {
    if (!accessToken || !isTokenExpired(accessToken)) return;

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

            if (!generateNewAccessTokenResponse?.access) {
                throw new Error("Failed to refresh access token");
            }

            // Update the store with the new access token
            const { refreshToken: storedRefreshToken, user } = useAuthStore.getState();
            useAuthStore.getState().setAuth(
                generateNewAccessTokenResponse.access,
                storedRefreshToken || refreshToken,
                user!
            );
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

function isTokenExpired(token: string) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;
    return payload.exp < now;
}
