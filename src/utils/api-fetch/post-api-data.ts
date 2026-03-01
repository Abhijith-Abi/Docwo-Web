/* eslint-disable */

import { useAuthStore } from "@/store/auth-store";
import { refreshTokenIfNeeded } from "../token-refresh/refresh-token-if-needed";

export default async function postApiData(path: string, bodyData: any) {
    const { token: accessToken, refreshToken } = useAuthStore.getState();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    await refreshTokenIfNeeded(accessToken || "", refreshToken || "");

    let headers = new Headers();
    if (accessToken) {
        headers.append("Authorization", `Bearer ${accessToken}`);
    }
    headers.append("Content-Type", "application/json");

    try {
        const response = await fetch(`${baseUrl}${path}`, {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers: headers,
        });

        if (response.status === 401 && refreshToken) {
            try {
                await refreshTokenIfNeeded(accessToken || "", refreshToken, true);
                const newAccessToken = useAuthStore.getState().token;

                if (newAccessToken) {
                    headers.set("Authorization", `Bearer ${newAccessToken}`);
                    const retryResponse = await fetch(`${baseUrl}${path}`, {
                        method: "POST",
                        body: JSON.stringify(bodyData),
                        headers: headers,
                    });

                    const retryText = await retryResponse.text();
                    const retryData = retryText ? JSON.parse(retryText) : {};

                    if (!retryResponse.ok) {
                        throw retryData;
                    }
                    return retryData;
                }
            } catch (refreshError) {
                console.log(refreshError);
                throw { message: "401 Unauthorized" };
            }
        }

        const responseText = await response.text();
        const responseData = responseText ? JSON.parse(responseText) : {};

        if (!response.ok) {
            throw responseData;
        }
        return responseData;
    } catch (error) {
        throw error;
    }
}
