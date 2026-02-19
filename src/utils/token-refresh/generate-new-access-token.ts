export async function generateNewAccessToken(refreshToken: string) {
    const baseUrl = process.env.NEXT_PUBLIC_REFRESH_URL;

    const controller = new AbortController();
    const signal = controller.signal;

    const timeout = 5000;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`${baseUrl}api/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
            signal: signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        return data;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}
