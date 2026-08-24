



export async function register(username: string, password: string, email: string): Promise<boolean> {
    const response = await fetch("http://localhost:8080/api/users/register", {
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
            body: JSON.stringify({
                username,
                password
            })
        }
    );
    if(!response.ok) {
        return false;
    }
    return await response.json();
}