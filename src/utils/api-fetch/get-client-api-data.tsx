/* eslint-disable */
import { refreshTokenIfNeeded } from "../token-refresh/refresh-token-if-needed";

export default async function getClientApiData(
    path: string,
    customBaseUrl?: string,
) {
    let accessToken = "";
    let refreshToken = "";
    if (typeof window !== "undefined") {
        accessToken = localStorage.getItem("token") || "";
        refreshToken = localStorage.getItem("refreshToken") || "";
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    await refreshTokenIfNeeded(accessToken, refreshToken);

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

        if (response.ok) {
            return response?.json();
        } else {
            throw new Error(response?.status?.toString());
        }
    } catch (error) {
        throw error;
    }
}
