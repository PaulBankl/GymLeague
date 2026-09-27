const API_BASE_URL = "http://localhost:8080";

function getCookie(name: string): string | null {
    const cookies = document.cookie.split("; ");

    const cookie = cookies.find((row) => row.startsWith(`${name}=`));

    if (!cookie) {
        return null;
    }

    return decodeURIComponent(cookie.split("=")[1]);
}

export async function refreshCsrfToken(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/users/csrf`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch CSRF token");
    }
}

async function getCsrfToken(): Promise<string> {
    let token = getCookie("XSRF-TOKEN");

    if (!token) {
        await refreshCsrfToken();
        token = getCookie("XSRF-TOKEN");
    }

    if (!token) {
        throw new Error("CSRF token cookie not found");
    }

    return token;
}

export async function apiFetch(
    path: string,
    options: RequestInit = {}
): Promise<Response> {
    const method = options.method?.toUpperCase() ?? "GET";
    const needsCsrf = !["GET", "HEAD", "OPTIONS"].includes(method);

    const headers = new Headers(options.headers);

    if (needsCsrf) {
        const token = await getCsrfToken();
        headers.set("X-XSRF-TOKEN", token);
    }

    return fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
        credentials: "include",
    });

    
}