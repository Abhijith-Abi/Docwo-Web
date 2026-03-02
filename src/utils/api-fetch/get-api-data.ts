import { useAuthStore } from "@/store/auth-store";
import { refreshTokenIfNeeded } from "../token-refresh/refresh-token-if-needed";

export default async function getApiData(endpoint: string) {
    let { token: accessToken } = useAuthStore.getState();
    const { refreshToken } = useAuthStore.getState();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        if (accessToken && refreshToken) {
            await refreshTokenIfNeeded(accessToken, refreshToken);
            // Re-read from store in case the token was refreshed
            accessToken = useAuthStore.getState().token;
        }

        const headersData: Record<string, string> = {};
        if (accessToken) {
            headersData["Authorization"] = `Bearer ${accessToken}`;
        }

        const response = await fetch(`${baseUrl}${endpoint}`, {
            cache: "no-store",
            headers: headersData,
        });

        if (response.status === 401 && refreshToken) {
            try {
                await refreshTokenIfNeeded(accessToken || "", refreshToken, true);
                const newAccessToken = useAuthStore.getState().token;

                if (newAccessToken) {
                    const retryResponse = await fetch(`${baseUrl}${endpoint}`, {
                        cache: "no-store",
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                    });

                    if (retryResponse.ok) {
                        const retryText = await retryResponse.text();
                        return retryText ? JSON.parse(retryText) : {};
                    } else {
                        throw new Error(retryResponse.status.toString());
                    }
                }
            } catch (refreshError) {
                throw new Error("401");
            }
        }

        if (response.ok) {
            const text = await response.text();
            return text ? JSON.parse(text) : {};
        } else {
            throw new Error(response.status.toString());
        }
    } catch (error) {
        throw error;
    }
}
