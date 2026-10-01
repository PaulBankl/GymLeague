import {apiFetch} from "./api";




export async function register(username: string, password: string, email: string): Promise<boolean> {
    const response = await apiFetch("/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            email
        })
    });

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }

    return true;
}

export async function login(username: string, password: string) {
    const response = await apiFetch("/api/users/login", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        }
    );
   if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }

    return true;
}

export async function getUser() {
    
    const response = await apiFetch(`/api/users/me`, {
        method: "GET",
    });

    if (!response.ok) {
        
        return null;
    
    }

    return await response.text();
}

export async function logout(): Promise<boolean> {
    const response = await apiFetch("/api/users/logout", {
        method: "POST",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }

    return true;
}

export async function checkHealth(): Promise<boolean> {
    const response = await apiFetch("/api/users/health", {
        method: "GET",
    });

   if(await response.json()){
        return true;
   }

    return false;
}

export async function changeDisplayName(displayName: string): Promise<boolean> {
    const response = await apiFetch("/api/users/updateDisplayName" , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            displayName
        })
    });
    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? response.statusText ?? "Request failed");
    }
    return response.ok;
}