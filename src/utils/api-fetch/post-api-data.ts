/* eslint-disable */

import { useAuthStore } from "@/store/auth-store";
import { refreshTokenIfNeeded } from "../token-refresh/refresh-token-if-needed";

export default async function postApiData(path: string, bodyData: any) {
    const { token: accessToken, refreshToken } = useAuthStore.getState();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    await refreshTokenIfNeeded(accessToken || "", refreshToken || "");

    const formData = new FormData();

    const appendFormData = (data: any, parentKey = "") => {
        if (Array.isArray(data)) {
            data.forEach((val, index) => {
                appendFormData(val, `${parentKey}[${index}]`);
            });
        } else if (
            data &&
            typeof data === "object" &&
            !(data instanceof File)
        ) {
            Object.keys(data).forEach((key) => {
                const value = data[key];
                if (value === "" || value === null || value === undefined)
                    return;

                const fullKey = parentKey ? `${parentKey}${key}` : key;
                if (typeof value === "object" && !(value instanceof File)) {
                    appendFormData(value, fullKey);
                } else {
                    formData.append(fullKey, value);
                }
            });
        } else {
            formData.append(parentKey, data);
        }
    };

    appendFormData(bodyData);

    let headers = new Headers();
    if (accessToken) {
        headers.append("Authorization", `Bearer ${accessToken}`);
    }

    try {
        const response = await fetch(`${baseUrl}${path}`, {
            method: "POST",
            body: formData,
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
