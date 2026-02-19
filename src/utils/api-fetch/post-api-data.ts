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

        const responseData = await response.json();

        if (!response.ok) {
            throw responseData;
        }
        return responseData;
    } catch (error) {
        throw error;
    }
}
