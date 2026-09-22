



export async function register(username: string, password: string, email: string): Promise<boolean> {
    const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
         credentials: "include",
        body: JSON.stringify({
            username,
            password,
            email
        })
    });
    
    if (!response.ok) {
        return false;
    }
    return await response.json();
}

export async function login(username: string, password: string) {
    const response = await fetch("http://localhost:8080/api/users/login", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
             credentials: "include",
            body: JSON.stringify({
                username,
                password
            })
        }
    );
   return response.ok;
}

export async function getUser() {
    
    const response = await fetch(`http://localhost:8080/api/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
         credentials: "include"
    });

    if (!response.ok) {
        console.error("Failed to fetch user data");
        return null;
    }

    return await response.json();
}

export async function logout(): Promise<boolean> {
    const response = await fetch("http://localhost:8080/api/users/logout", {
        method: "POST",
        credentials: "include",
    });

    return response.ok;
}