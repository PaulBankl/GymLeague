
export async function getAllCommunitiesForUser(username: string) {
    const response = await fetch(`http://localhost:8080/api/community/all?username=${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if(!response.ok) {
        throw new Error("Failed to fetch communities");
    }
    return await response.json();
}

export async function createCommunity(name: string, description: string, isPrivate: boolean, username: string) {
    const response = await fetch("http://localhost:8080/api/community/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, isPrivate, username }),
    });
    if (!response.ok) {
        throw new Error("Failed to create community");
    }
    return await response.json();
}