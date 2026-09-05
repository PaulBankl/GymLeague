
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

export async function getCommunityDetails(id: number) {
    const response = await fetch(`http://localhost:8080/api/community/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch community details");
    }
    return await response.json();
}

export async function leaveCommunity(id: number, username: string) {
    const response = await fetch(`http://localhost:8080/api/community/leave/${id}?username=${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to leave community");
    }
    return await response.json();
}


export async function getAllMembersOfCommunity(id: number) {
    const response = await fetch(`http://localhost:8080/api/community/members/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch community members");
    }
    return await response.json();
}

export async function get10RandomCommunities() {
    const response = await fetch(`http://localhost:8080/api/community/random`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return await response.json();
}

export async function editCommunity(id: number, description: string, isPrivate: boolean) {
    const response = await fetch(`http://localhost:8080/api/community/change`, {
        method: "POSt",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, description, isPrivate }),
    })
    if (!response.ok) {
        throw new Error("Failed to edit community");
    }
    return await response.json();
}