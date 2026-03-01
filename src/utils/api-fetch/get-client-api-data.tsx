/* eslint-disable */
import { useAuthStore } from "@/store/auth-store";
import { refreshTokenIfNeeded } from "../token-refresh/refresh-token-if-needed";

export default async function getClientApiData(
    path: string,
    customBaseUrl?: string,
) {
    let { token: accessToken } = useAuthStore.getState();
    const { refreshToken } = useAuthStore.getState();

    accessToken = accessToken || "";
    const refreshTokenStr = refreshToken || "";

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (accessToken && refreshTokenStr) {
        await refreshTokenIfNeeded(accessToken, refreshTokenStr);
        accessToken = useAuthStore.getState().token || "";
    }

    try {
        let headersData = {};
        if (accessToken && !customBaseUrl) {
            headersData = {
                Authorization: `Bearer ${accessToken}`,
            };
        }
        const response = await fetch(`${customBaseUrl ?? baseUrl}${path}`, {
            cache: "no-store",
            headers: headersData,
        });

        if (response.status === 401 && refreshTokenStr) {
            try {
                await refreshTokenIfNeeded(accessToken, refreshTokenStr, true);
                const newAccessToken = useAuthStore.getState().token;

                if (newAccessToken) {
                    const retryResponse = await fetch(
                        `${customBaseUrl ?? baseUrl}${path}`,
                        {
                            cache: "no-store",
                            headers: {
                                Authorization: `Bearer ${newAccessToken}`,
                            },
                        },
                    );

                    if (retryResponse.ok) {
                        const retryText = await retryResponse.text();
                        return retryText ? JSON.parse(retryText) : {};
                    } else {
                        throw new Error(retryResponse.status.toString());
                    }
                }
            } catch (refreshError) {
                console.log(refreshError);
                throw new Error("401");
            }
        }

        if (response.ok) {
            const text = await response.text();
            return text ? JSON.parse(text) : {};
        } else {
            throw new Error(response?.status?.toString());
        }
    } catch (error) {
        throw error;
    }
}
