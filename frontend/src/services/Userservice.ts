



export async function register(username: string, password: string, email: string) {
    return fetch("http://localhost:8080/api/users/register", {
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

}